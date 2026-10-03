import { Injectable, NotFoundException } from "@nestjs/common";
import { InvoicesRepository } from "./invoices.repository.js";
import { CreateInvoiceDto } from "./model/create-invoice.dto.js";
import { UpdateInvoiceDto } from "./model/update-invoice.dto.js";
import { EngagementsRepository } from "../engagements/engagements.repository.js";
import { Prisma } from "@prisma/client";

@Injectable()
export class InvoicesService {
    constructor(private invoicesRepository: InvoicesRepository, private engagementsRepository: EngagementsRepository) { }

    async create(dto: CreateInvoiceDto) {
        const engagement = await this.engagementsRepository.findById(dto.engagementId);

        if (!engagement)
            throw new NotFoundException(`Engagement ${dto.engagementId} not found.`);

        // client total payment
        const grossAmount = Number(dto.hoursWorked) * Number(engagement.hourlyRate);

        // the amount the platform earns (commision rate must by between 0 and 1)
        const commissionAmount = Number(grossAmount) * Number(engagement.commissionRate);

        // net amount received by the contractor
        const netAmount = grossAmount - commissionAmount;

        const invoice: Prisma.InvoiceUncheckedCreateInput = {
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

        return this.invoicesRepository.update(id, dto);
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.invoicesRepository.delete(id);
    }
}