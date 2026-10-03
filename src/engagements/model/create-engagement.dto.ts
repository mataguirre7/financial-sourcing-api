import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsUUID, Max, Min } from "class-validator";

export class CreateEngagementDto {
    @IsNotEmpty()
    @IsUUID()
    clientId!: string;

    @IsNotEmpty()
    @IsUUID()
    contractorId!: string;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    hourlyRate!: number;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 4 })
    @Min(0)
    @Max(1)
    commissionRate!: number;

    @Type(() => Date)
    @IsNotEmpty()
    @IsDate()
    startDate!: Date;

    @Type(() => Date)
    @IsOptional()
    @IsDate()
    endDate?: Date | null;
}
