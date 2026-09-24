import { Module } from "@nestjs/common";
import { EngagementsController } from "./engagements.controller.js";
import { EngagementsService } from "./engagements.service.js";
import { EngagementsRepository } from "./engagements.repository.js";
import { ClientsRepository } from "../clients/clients.repository.js";
import { ContractorsRepository } from "../contractors/contractors.repository.js";

@Module({
    controllers: [EngagementsController],
    providers: [EngagementsService, EngagementsRepository, ClientsRepository, ContractorsRepository]
})
export class EngagementsModule { }