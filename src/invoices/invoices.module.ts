import { Module } from "@nestjs/common";
import { InvoicesService } from "./invoices.service.js";
import { InvoicesController } from "./invoices.controller.js";
import { InvoicesRepository } from "./invoices.repository.js";

@Module({
    controllers: [InvoicesController],
    providers: [InvoicesService, InvoicesRepository]
})
export class InvoicesModule { }