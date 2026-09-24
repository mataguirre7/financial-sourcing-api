import { CreateEngagementDto } from './dto/create-engagement.dto.js';
import { UpdateEngagementDto } from './dto/update-engagement.dto.js';
import { EngagementsService } from './engagements.service.js';
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

@Controller('engagements')
export class EngagementsController {
    constructor(private readonly engagementsService: EngagementsService) { }

    @Post()
    create(@Body() dto: CreateEngagementDto) {
        return this.engagementsService.create(dto);
    }

    @Get()
    findAll() {
        return this.engagementsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.engagementsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateEngagementDto) {
        return this.engagementsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.engagementsService.remove(id);
    }
}