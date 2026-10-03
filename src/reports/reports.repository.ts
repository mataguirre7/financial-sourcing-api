import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";

@Injectable()
export class ReportsRepository {
    constructor(private database: DatabaseService) { }

    get model() {
        return this.database.invoice;
    }

    findInvoicesInPeriod(from?: Date, to?: Date) {
        return this.model.findMany({
            where: {
                periodStart: from ? { gte: from } : undefined,
                periodEnd: to ? { lte: to } : undefined
            },
            include: {
                engagement: {
                    select: {
                        clientId: true,
                        contractorId: true
                    }
                }
            }
        })
    }
}