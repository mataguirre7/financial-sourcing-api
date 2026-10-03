import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsPositive, IsUUID } from "class-validator";

export class CreateInvoiceDto {
    @IsUUID()
    @IsNotEmpty()
    engagementId!: string;

    @Type(() => Date)
    @IsNotEmpty()
    @IsDate()
    periodStart!: Date;

    @Type(() => Date)
    @IsNotEmpty()
    @IsDate()
    periodEnd!: Date;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    hoursWorked!: number;
}
