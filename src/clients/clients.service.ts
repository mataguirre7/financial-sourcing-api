import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateClientDto } from "./model/create-client.dto.js";
import { UpdateClientDto } from "./model/update-client.dto.js";
import { ClientsRepository } from "./clients.repository.js";

@Injectable()
export class ClientsService {
    constructor(private readonly clientsRepository: ClientsRepository) { }

    async create(dto: CreateClientDto) {
        const existing = await this.clientsRepository.findByEmail(dto.email);

        if (existing)
            throw new ConflictException("A client with this email already exists");

        return this.clientsRepository.create({ name: dto.name, email: dto.email });
    }

    findAll() {
        return this.clientsRepository.findAll();
    }

    async findOne(id: string) {
        const client = await this.clientsRepository.findById(id);

        if (!client)
            throw new NotFoundException(`Cliente ${id} not found.`)

        return client;
    }

    async update(id: string, dto: UpdateClientDto) {
        await this.findOne(id);

        if (dto.email) {
            const existing = await this.clientsRepository.findByEmail(dto.email);

            if (existing && existing.id !== id)
                throw new ConflictException("A client with this email already exists");
        }

        return this.clientsRepository.update(id, dto);
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.clientsRepository.delete(id);
    }
}