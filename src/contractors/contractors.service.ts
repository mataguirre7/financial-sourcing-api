import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";
import { CreateContractorDto } from "./model/create-contractor.dto.js";
import { UpdateContractorDto } from "./model/update-contractor.dto.js";


@Injectable()
export class ContractorsService {
    constructor(private readonly database: DatabaseService) { }

    async create(dto: CreateContractorDto) {
        const existing = await this.database.client.orm.public.Contractor
            .where({ email: dto.email })
            .first();

        if (existing) {
            throw new ConflictException("A contractor with this email already exists");
        }

        return this.database.client.orm.public.Contractor.create({ name: dto.name, email: dto.email });
    }

    findAll() {
        return this.database.client.orm.public.Contractor.orderBy((c) => c.name.asc()).all();
    }

    async findOne(id: string) {
        const contractor = await this.database.client.orm.public.Contractor.first({ id });

        if (!contractor) {
            throw new NotFoundException(`Contractor ${id} not found.`)
        }

        return contractor;
    }

    async update(id: string, dto: UpdateContractorDto) {
        await this.findOne(id);

        if (dto.email) {
            const existing = await this.database.client.orm.public.Contractor
                .where((c) => c.email.eq(dto.email!))
                .where((c) => c.id.neq(id))
                .first();

            if (existing) {
                throw new ConflictException('A contractor with this email already exists.');
            }
        }

        return this.database.client.orm.public.Contractor
            .where({ id })
            .update({ ...dto, updatedAt: new Date() });
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.database.client.orm.public.Contractor.where({ id }).delete();
    }
}