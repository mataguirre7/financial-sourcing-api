import { Module } from "@nestjs/common";
import { EngagementsController } from "./engagements.controller.js";
import { EngagementsService } from "./engagements.service.js";

@Module({
    controllers: [EngagementsController],
    providers: [EngagementsService]
})
export class EngagementsModule { }