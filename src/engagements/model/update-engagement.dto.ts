import { PartialType } from "@nestjs/mapped-types";
import { EngagementStatus } from "../shared/engagement-status.js";
import { IsOptional } from "class-validator";
import { CreateEngagementDto } from "./create-engagement.dto.js";

export class UpdateEngagementDto extends PartialType(CreateEngagementDto) {
    @IsOptional()
    status?: EngagementStatus;
}