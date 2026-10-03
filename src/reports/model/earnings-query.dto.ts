import { Type } from "class-transformer";
import { IsDate, IsIn, IsOptional } from "class-validator";

export class EarningsQueryDto {
    @Type(() => Date)
    @IsOptional()
    @IsDate()
    from?: Date;

    @Type(() => Date)
    @IsOptional()
    @IsDate()
    to?: Date;

    @IsIn(["client", "contractor"])
    groupBy: string;
}