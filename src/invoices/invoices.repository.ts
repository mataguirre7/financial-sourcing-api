import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";
import { CreateInvoiceDto } from "./model/create-invoice.dto.js";
import { UpdateInvoiceDto } from "./model/update-invoice.dto.js";
import { Prisma } from "@prisma/client";

@Injectable()
export class InvoicesRepository {
    constructor(private database: DatabaseService) {
    }

    get model() {
        return this.database.invoice;
    }

    findAll() {
        return this.model.findMany({
            orderBy:
            {
                createdAt: "desc"
            }
        });
    }

    findById(id: string) {
        return this.model.findUnique({
            where:
            {
                id
            }
        });
    }

    create(data: Prisma.InvoiceUncheckedCreateInput) {
        return this.model.create({ data });
    }

    update(id: string, data: Prisma.InvoiceUncheckedUpdateInput) {
        return this.model.update({
            where:
            {
                id
            },
            data
        });
    }

    delete(id: string) {
        return this.model.delete({
            where:
            {
                id
            }
        });
    }
}