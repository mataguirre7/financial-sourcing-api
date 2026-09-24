import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "../database/database.service.js";
import { EngagementStatus } from "./shared/engagement-status.js";
import { CreateEngagementDto } from "./dto/create-engagement.dto.js";
import { UpdateEngagementDto } from "./dto/update-engagement.dto.js";
import { toInstant } from "../shared/temporal.utils.js";


@Injectable()
export class EngagementsService {
    private clientRepository;
    private contractorRepository;

    constructor(private readonly database: DatabaseService) {
        this.clientRepository = this.database.client.orm.public.Client;
        this.contractorRepository = this.database.client.orm.public.Contractor;
    }

    findAll() {
        return this.database.client.orm.public.Engagement.orderBy((c) => c.startDate.asc()).all();
    }

    async findOne(id: string) {
        const engagement = await this.database.client.orm.public.Engagement.first({ id });

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

        return this.database.client.orm.public.Engagement
            .where({ id })
            .update({ ...dto, updatedAt: toInstant(new Date()) });
    }

    async create(dto: CreateEngagementDto) {
        const { client, contractor } = await this.validateEngagement(dto);

        return await this.database.client.orm.public.Engagement.create({
            clientId: client.id,
            contractorId: contractor.id,
            hourlyRate: dto.hourlyRate,
            commissionRate: dto.commissionRate,
            startDate: toInstant(dto.startDate),
            endDate: dto.endDate ? toInstant(dto.endDate) : null,
            status: EngagementStatus.active
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.database.client.orm.public.Engagement.where({ id }).delete();
    }

    private async validateEngagement(dto: CreateEngagementDto | UpdateEngagementDto) {
        const client = await this.clientRepository.first({ id: dto.clientId });
        const contractor = await this.contractorRepository.first({ id: dto.contractorId });

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