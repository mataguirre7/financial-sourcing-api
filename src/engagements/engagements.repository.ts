import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";
import { Prisma } from "@prisma/client";

@Injectable()
export class EngagementsRepository {
    constructor(private database: DatabaseService) { }

    private get model() {
        return this.database.engagement;
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
                startDate: "asc"
            }
        });
    }

    create(data: Prisma.EngagementUncheckedCreateInput) {
        return this.model.create({ data });
    }

    update(id: string, data: Prisma.EngagementUncheckedUpdateInput) {
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