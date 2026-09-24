import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { EngagementCreateData } from "./interface/engagements-create-data";

@Injectable()   
export class EngagementsRepository {
    constructor(private database: DatabaseService) { }

    private get model() {
        return this.database.client.orm.public.Engagement;
    }

    findById(id: string) {
        return this.model.first({ id });
    }

    findAll() {
        return this.model.orderBy((c) =>
            c.startDate.asc()).all();
    }

    create(data: EngagementCreateData) {
        return this.model.create(data);
    }

    update(id: string, data: Partial<EngagementCreateData>) {
        return this.model.where({ id }).update(data);
    }

    delete(id: string) {
        return this.model.where({ id }).delete();
    }
}