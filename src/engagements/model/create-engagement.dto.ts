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

    @Type(() => Date)
    @IsNotEmpty()
    @IsDate()
    startDate!: Date;

    @Type(() => Date)
    @IsOptional()
    @IsDate()
    endDate?: Date
}