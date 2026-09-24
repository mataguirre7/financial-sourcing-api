import { Module } from "@nestjs/common";
import { EngagementsController } from "./engagements.controller.js";
import { EngagementsService } from "./engagements.service.js";
import { EngagementsRepository } from "./engagements.repository.js";

@Module({
    controllers: [EngagementsController],
    providers: [EngagementsService, EngagementsRepository]
})
export class EngagementsModule { }