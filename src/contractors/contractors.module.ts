import { Module } from "@nestjs/common";
import { ContractorsController } from "./contractors.controller.js";
import { ContractorsService } from "./contractors.service.js";
import { ContractorsRepository } from "./contractors.repository.js";

@Module({
    controllers: [ContractorsController],
    providers: [ContractorsService, ContractorsRepository]
})
export class ContractorsModule { }