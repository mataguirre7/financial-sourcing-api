import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateContractorDto } from "./model/create-contractor.dto.js";
import { UpdateContractorDto } from "./model/update-contractor.dto.js";
import { ContractorsRepository } from "./contractors.repository.js";

@Injectable()
export class ContractorsService {
    constructor(private readonly contractorsRepository: ContractorsRepository) { }

    async create(dto: CreateContractorDto) {
        const existing = await this.contractorsRepository.findByEmail(dto.email);

        if (existing) {
            throw new ConflictException("A contractor with this email already exists");
        }

        return this.contractorsRepository.create({ name: dto.name, email: dto.email });
    }

    findAll() {
        return this.contractorsRepository.findAll();
    }

    async findOne(id: string) {
        const contractor = await this.contractorsRepository.findById(id);

        if (!contractor) {
            throw new NotFoundException(`Contractor ${id} not found.`)
        }

        return contractor;
    }

    async update(id: string, dto: UpdateContractorDto) {
        await this.findOne(id);

        if (dto.email) {
            const existing = await this.contractorsRepository.findByEmail(dto.email);

            if (existing && existing.id !== id)
                throw new ConflictException("A contractor with this email already exists");
        }

        return this.contractorsRepository.update(id, dto);
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.contractorsRepository.delete(id);
    }
}