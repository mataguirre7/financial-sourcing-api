import { Prisma } from "@prisma/client";

export interface ReportsTotals {
    invoices: number;
    gross: Prisma.Decimal;
    commission: Prisma.Decimal;
    net: Prisma.Decimal;
}