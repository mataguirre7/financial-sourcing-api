import { Module } from "@nestjs/common";
import { InvoicesService } from "./invoices.service.js";
import { InvoicesController } from "./invoices.controller.js";
import { InvoicesRepository } from "./invoices.repository.js";
import { EngagementsRepository } from "../engagements/engagements.repository.js";

@Module({
    controllers: [InvoicesController],
    providers: [InvoicesService, InvoicesRepository, EngagementsRepository]
})
export class InvoicesModule { }