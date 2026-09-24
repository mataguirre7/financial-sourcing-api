import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";
import { CreateClientDto } from "./dto/create-client.dto.js";
import { UpdateClientDto } from "./dto/update-client.dto.js";


@Injectable()
export class ClientsService {
    constructor(private readonly database: DatabaseService) { }

    async create(dto: CreateClientDto) {
        const existing = await this.database.client.orm.public.Client
            .where({ email: dto.email })
            .first();

        if (existing) {
            throw new ConflictException("A client with this email already exists");
        }

        return this.database.client.orm.public.Client.create({ name: dto.name, email: dto.email });
    }

    findAll() {
        return this.database.client.orm.public.Client.orderBy((c) => c.name.asc()).all();
    }

    async findOne(id: string) {
        const client = await this.database.client.orm.public.Client.first({ id });

        if (!client) {
            throw new NotFoundException(`Cliente ${id} not found.`)
        }

        return client;
    }

    async update(id: string, dto: UpdateClientDto) {
        await this.findOne(id);

        if (dto.email) {
            const existing = await this.database.client.orm.public.Client
                .where((c) => c.email.eq(dto.email!))
                .where((c) => c.id.neq(id))
                .first();

            if (existing) {
                throw new ConflictException('A client with this email already exists.');
            }
        }

        return this.database.client.orm.public.Client
            .where({ id })
            .update({ ...dto, updatedAt: new Date() });
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.database.client.orm.public.Client.where({ id }).delete();
    }
}