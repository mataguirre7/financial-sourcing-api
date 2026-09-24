import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ClientsService } from "./clients.service.js";
import { CreateClientDto } from "./model/create-client.dto.js";
import { UpdateClientDto } from "./model/update-client.dto.js";


@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @Post()
    create(@Body() dto: CreateClientDto) {
        return this.clientsService.create(dto);
    }

    @Get()
    findAll() {
        return this.clientsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clientsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
        return this.clientsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clientsService.remove(id);
    }
}