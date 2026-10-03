import { Body, Controller, Post, Get, Patch, Delete, Param } from "@nestjs/common";
import { InvoicesService } from "./invoices.service.js";
import { CreateInvoiceDto } from "./model/create-invoice.dto.js";
import { UpdateInvoiceDto } from "./model/update-invoice.dto.js";

@Controller('invoices')
export class InvoicesController {
    constructor(private invoicesService: InvoicesService) { }

    @Post()
    create(@Body() dto: CreateInvoiceDto) {
        return this.invoicesService.create(dto);
    }

    @Get()
    findAll() {
        return this.invoicesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.invoicesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateInvoiceDto) {
        return this.invoicesService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.invoicesService.remove(id);
    }
}