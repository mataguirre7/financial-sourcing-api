import { Prisma } from "@prisma/client";

export interface EngagementTerms {
    clientId: string;
    contractorId: string;
    hourlyRate: number | Prisma.Decimal;
    commissionRate: number | Prisma.Decimal;
    startDate: Date;
    endDate?: Date | null;
};
