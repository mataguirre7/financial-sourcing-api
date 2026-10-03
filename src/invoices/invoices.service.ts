import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { InvoicesRepository } from "./invoices.repository.js";
import { CreateInvoiceDto } from "./model/create-invoice.dto.js";
import { UpdateInvoiceDto } from "./model/update-invoice.dto.js";
import { EngagementsRepository } from "../engagements/engagements.repository.js";

@Injectable()
export class InvoicesService {
    constructor(
        private readonly invoicesRepository: InvoicesRepository,
        private readonly engagementsRepository: EngagementsRepository) { }

    async create(dto: CreateInvoiceDto) {
        const engagement = await this.findEngagement(dto.engagementId);

        this.validatePeriod(dto.periodStart, dto.periodEnd);

        return this.invoicesRepository.create({
            engagementId: engagement.id,
            periodStart: dto.periodStart,
            periodEnd: dto.periodEnd,
            hoursWorked: dto.hoursWorked,
            ...this.calculateAmounts(dto.hoursWorked, engagement),
            invoicedCommissionRate: engagement.commissionRate,
            invoicedHourlyRate: engagement.hourlyRate
        });
    }

    findAll() {
        return this.invoicesRepository.findAll();
    }

    async findOne(id: string) {
        const invoice = await this.invoicesRepository.findById(id);

        if (!invoice) {
            throw new NotFoundException(`Invoice ${id} not found.`);
        }

        return invoice;
    }

    async update(id: string, dto: UpdateInvoiceDto) {
        const invoice = await this.findOne(id);

        const periodStart = dto.periodStart ?? invoice.periodStart;
        const periodEnd = dto.periodEnd ?? invoice.periodEnd;
        const hoursWorked = dto.hoursWorked ?? invoice.hoursWorked;

        this.validatePeriod(periodStart, periodEnd);

        return this.invoicesRepository.update(id, {
            periodStart,
            periodEnd,
            hoursWorked,
            ...this.calculateAmounts(hoursWorked, {
                hourlyRate: invoice.invoicedHourlyRate,
                commissionRate: invoice.invoicedCommissionRate
            }),
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.invoicesRepository.delete(id);
    }

    private async findEngagement(engagementId: string) {
        const engagement = await this.engagementsRepository.findById(engagementId);

        if (!engagement) {
            throw new NotFoundException(`Engagement ${engagementId} not found.`);
        }

        return engagement;
    }

    private validatePeriod(periodStart: Date, periodEnd: Date) {
        if (periodEnd < periodStart) {
            throw new BadRequestException("Period end cannot be before period start");
        }
    }

    private calculateAmounts(
        hoursWorked: number | Prisma.Decimal,
        invoiceEngagement: { hourlyRate: Prisma.Decimal; commissionRate: Prisma.Decimal }) {
        const grossAmount = new Prisma.Decimal(hoursWorked)
            .mul(invoiceEngagement.hourlyRate)
            .toDecimalPlaces(2);

        const commissionAmount = grossAmount
            .mul(invoiceEngagement.commissionRate)
            .toDecimalPlaces(2);

        const netAmount = grossAmount.sub(commissionAmount);

        return { grossAmount, commissionAmount, netAmount };
    }
}
