import { Type } from "class-transformer";
import { IsDecimal, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateInvoiceDto {
    @IsUUID()
    @IsNotEmpty()
    engagementId!: string

    @IsNotEmpty()
    @Type(() => Date)
    periodStart!: unknown

    @IsNotEmpty()
    @Type(() => Date)
    periodEnd!: unknown

    @IsNotEmpty()
    hoursWorked!: string

    @IsOptional()
    @Type(() => Date)
    updatedAt?: unknown
}