import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";
import { Prisma } from "@prisma/client";

@Injectable()
export class ContractorsRepository {
    constructor(private database: DatabaseService) { }

    private get model() {
        return this.database.contractor;
    }

    findByEmail(email: string) {
        return this.model.findUnique({
            where:
            {
                email
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

    findAll() {
        return this.model.findMany({
            orderBy:
            {
                name: "asc"
            }
        });
    }

    create(data: Prisma.ContractorCreateInput) {
        return this.model.create({ data });
    }

    update(id: string, data: Prisma.ContractorUpdateInput) {
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