import { IsDecimal, IsOptional } from "class-validator";

export class CreateInvoiceDto {
    engagementId!: string
    periodStart!: unknown
    periodEnd!: unknown
    hoursWeekend!: string
    @IsOptional()
    updatedAt?: unknown
}