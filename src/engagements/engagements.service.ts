import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { EngagementStatus } from "./shared/engagement-status.js";
import { CreateEngagementDto } from "./model/create-engagement.dto.js";
import { UpdateEngagementDto } from "./model/update-engagement.dto.js";
import { toInstant } from "../shared/temporal.utils.js";
import { ClientsRepository } from "../clients/clients.repository.js";
import { ContractorsRepository } from "../contractors/contractors.repository.js";
import { EngagementsRepository } from "./engagements.repository.js";


@Injectable()
export class EngagementsService {
    constructor(
        private readonly engagementsRepository: EngagementsRepository,
        private readonly clientsRepository: ClientsRepository,
        private readonly contractorsRepository: ContractorsRepository)
    {}

    findAll() {
        return this.engagementsRepository.findAll();
    }

    async findOne(id: string) {
        const engagement = await this.engagementsRepository.findById(id);

        if (!engagement) {
            throw new NotFoundException(`Engagement ${id} not found.`)
        }

        return engagement;
    }

    async update(id: string, dto: UpdateEngagementDto) {
        const engagement = await this.findOne(id);

        const merged = {
            clientId: dto.clientId ?? engagement.clientId,
            contractorId: dto.contractorId ?? engagement.contractorId,
            hourlyRate: dto.hourlyRate ?? engagement.hourlyRate,
            commissionRate: dto.commissionRate ?? engagement.commissionRate,
            startDate: dto.startDate ?? engagement.startDate,
            endDate: dto.endDate !== undefined ? dto.endDate : engagement.endDate,
        };

        await this.validateEngagement(merged);

        return this.engagementsRepository.update(id, dto);
    }

    async create(dto: CreateEngagementDto) {
        const { client, contractor } = await this.validateEngagement(dto);

        const data = {
            clientId: client.id,
            contractorId: contractor.id,
            hourlyRate: dto.hourlyRate,
            commissionRate: dto.commissionRate,
            startDate: toInstant(dto.startDate),
            endDate: dto.endDate ? toInstant(dto.endDate) : null,
            status: EngagementStatus.active
        }

        return await this.engagementsRepository.create(data);
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.engagementsRepository.delete(id);
    }

    private async validateEngagement(dto: CreateEngagementDto | UpdateEngagementDto) {
        const client = await this.clientsRepository.findById(dto!.clientId!);
        const contractor = await this.contractorsRepository.findById(dto!.contractorId!);

        if (!client) {
            throw new NotFoundException(`Client ${dto.clientId} not found.`);
        }

        if (!contractor) {
            throw new NotFoundException(`Contractor ${dto.contractorId} not found.`);
        }

        if (Number(dto.hourlyRate) <= 0) {
            throw new BadRequestException('Hourly rate cannot be less or equals to zero');
        }

        if (Number(dto.commissionRate) < 0 || Number(dto.commissionRate) > 1) {
            throw new BadRequestException("Commission rate must be between 0 and 1");
        }

        if (dto.endDate && dto.startDate && dto.endDate < dto.startDate) {
            throw new BadRequestException("End date cannot be minor to start date");
        }

        return { client, contractor }
    }
}