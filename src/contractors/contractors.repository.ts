import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";

@Injectable()
export class ContractorsRepository {
    constructor(private database: DatabaseService) { }

    private get model() {
        return this.database.client.orm.public.Contractor;
    }

    findByEmail(email: string) {
        return this.model.where({ email }).first();
    }

    findById(id: string) {
        return this.model.first({ id });
    }

    findAll() {
        return this.model.orderBy((c) =>
            c.name.asc()).all();
    }

    create(data: { name: string; email: string }) {
        return this.model.create(data);
    }

    update(id: string, data: Partial<{ name: string; email: string }>) {
        return this.model.where({ id }).update(data);
    }

    delete(id: string) {
        return this.model.where({ id }).delete();
    }
}