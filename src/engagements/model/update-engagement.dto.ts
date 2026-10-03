import { PartialType } from "@nestjs/mapped-types";
import { EngagementStatus } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";
import { CreateEngagementDto } from "./create-engagement.dto.js";

export class UpdateEngagementDto extends PartialType(CreateEngagementDto) {
    @IsOptional()
    @IsEnum(EngagementStatus)
    status?: EngagementStatus;
}
