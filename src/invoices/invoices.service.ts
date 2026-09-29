import { Injectable, NotFoundException } from "@nestjs/common";
import { InvoicesRepository } from "./invoices.repository";
import { CreateInvoiceDto } from "./model/create-invoice.dto";
import { UpdateInvoiceDto } from "./model/update-invoice.dto";
import { toInstant } from "../shared/temporal.utils";
import { EngagementsRepository } from "../engagements/engagements.repository";

@Injectable()
export class InvoicesService {
    constructor(private invoicesRepository: InvoicesRepository, private engagementsRepository: EngagementsRepository) { }

    async create(dto: CreateInvoiceDto) {
        const engagement = await this.engagementsRepository.findById(dto.engagementId);

        if (!engagement)
            throw new NotFoundException(`Invoice ${dto.engagementId} not found.`);

        const grossAmount = Number(dto.hoursWeekend) * Number(engagement.hourlyRate);
        const commissionAmount = Number(grossAmount) * Number(engagement.commissionRate);
        const netAmount = grossAmount - commissionAmount;

        const invoice = {
            ...dto,
            grossAmount,
            commissionAmount,
            netAmount
        }

        return this.invoicesRepository.create(invoice);
    }

    findAll() {
        return this.invoicesRepository.findAll();
    }

    async findOne(id: string) {
        const invoice = await this.invoicesRepository.findById(id);

        if (!invoice) {
            throw new NotFoundException(`Invoice ${id} not found.`)
        }

        return invoice;
    }

    async update(id: string, dto: UpdateInvoiceDto) {
        await this.findOne(id);

        return this.invoicesRepository.update(id,
            { ...dto, updatedAt: toInstant(new Date()) }
        );
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.invoicesRepository.delete(id);
    }
}