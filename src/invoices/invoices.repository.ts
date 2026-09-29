import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";
import { CreateInvoiceDto } from "./model/create-invoice.dto.js";
import { UpdateInvoiceDto } from "./model/update-invoice.dto.js";

@Injectable()
export class InvoicesRepository {
    constructor(private database: DatabaseService) {
    }

    get model() {
        return this.database.client.orm.public.Invoice;
    }

    findAll() {
        return this.model.orderBy((c) => c.createdAt.desc()).all();
    }

    findById(id: string) {
        return this.model.first({ id });
    }

    create(data: CreateInvoiceDto) {
        return this.model.create(data);
    }

    update(id: string, data: Partial<UpdateInvoiceDto>) {
        return this.model.where({ id }).update(data);
    }

    delete(id: string) {
        return this.model.where({ id }).delete();
    }
}