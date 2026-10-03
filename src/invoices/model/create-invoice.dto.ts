import { Type } from "class-transformer";
import { IsDate, IsDecimal, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateInvoiceDto {
    @IsUUID()
    @IsNotEmpty()
    engagementId!: string

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    periodStart!: Date

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    periodEnd!: Date

    @IsNotEmpty()
    hoursWorked!: string

    @IsNotEmpty()
    @IsDecimal()
    grossAmount!: number

    @IsNotEmpty()
    @IsDecimal()
    netAmount!: number

    @IsNotEmpty()
    @IsDecimal()
    commissionAmount!: number
}