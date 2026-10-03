import { IsDate, IsDecimal, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { Type } from "class-transformer";

export class CreateEngagementDto {
    @IsNotEmpty()
    @IsUUID()
    clientId!: string;

    @IsNotEmpty()
    @IsUUID()
    contractorId!: string;

    @IsNotEmpty()
    @IsDecimal()
    hourlyRate!: string;

    @IsNotEmpty()
    @IsDecimal()
    commissionRate!: string;

    @IsNotEmpty()
    @IsDate()
    startDate!: Date;

    @IsOptional()
    @IsDate()
    endDate?: Date
}