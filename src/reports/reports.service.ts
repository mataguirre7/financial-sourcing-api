import { EarningsQueryDto } from './model/earnings-query.dto.js';
import { BadRequestException, Injectable } from "@nestjs/common";
import { ReportsRepository } from "./reports.repository.js";
import { Invoice, Prisma } from '@prisma/client';
import { ReportsTotals } from './interface/reports-totals.js';

@Injectable()
export class ReportsService {
    constructor(private reportsRepository: ReportsRepository) { }

    private emptyTotals(): ReportsTotals {
        return {
            invoices: 0,
            gross: new Prisma.Decimal(0),
            commission: new Prisma.Decimal(0),
            net: new Prisma.Decimal(0)
        }
    }

    private accumulate(target: ReportsTotals, invoice: Invoice) {
        target.invoices += 1;
        target.gross = target.gross.add(invoice.grossAmount);
        target.commission = target.commission.add(invoice.commissionAmount);
        target.net = target.net.add(invoice.netAmount);
    }

    async getEarnings(query: EarningsQueryDto) {
        this.validatePeriod(query);

        const invoices = await this.reportsRepository.findInvoicesInPeriod(query.from, query.to);

        const groups = new Map<string, ReportsTotals>();
        const totals = this.emptyTotals();

        for (const invoice of invoices) {
            const key = query.groupBy === "client"
                ? invoice.engagement.clientId
                : invoice.engagement.contractorId

            if (!groups.has(key)) {
                groups.set(key, this.emptyTotals());
            }

            this.accumulate(groups.get(key)!, invoice);
            this.accumulate(totals, invoice);
        }

        return {
            groups: [...groups].map(([id, t]) => ({ id, ...t })),
            totals
        };
    }

    private validatePeriod(dates: { from?: Date; to?: Date }) {
        if (!dates.from && !dates.to)
            throw new BadRequestException("Invalid period");

        if (dates.from && dates.to && dates.from > dates.to)
            throw new BadRequestException("To must be grater or equals to From");

        return dates.from || dates.to;
    }
}