import { Prisma } from "@prisma/client";

export interface InvoiceEngagement {
    hourlyRate?: Prisma.Decimal;
    commissionRate?: Prisma.Decimal;
    invoicedCommissionRate?: Prisma.Decimal;
    invoicedHourlyRate?: Prisma.Decimal;
}