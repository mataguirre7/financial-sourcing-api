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

// select
//     inv.*,
//     eng."clientId",
//     eng."contractorId"
// from "Invoice" inv
// join "Engagement" eng on inv."engagementId" = eng.id
// where
//     ($1::timestamp is null or inv."periodStart" >= $1::timestamp) and
//     ($2::timestamp is null or inv."periodEnd" <= $2::timestamp)