import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";
import { UpdateClientDto } from "./model/update-client.dto.js";
import { Prisma } from "@prisma/client";

@Injectable()
export class ClientsRepository {
    constructor(private database: DatabaseService) { }

    private get model() {
        return this.database.client;
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

    create(data: Prisma.ClientCreateInput) {
        return this.model.create({ data });
    }

    update(id: string, data: Prisma.ClientUpdateInput) {
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