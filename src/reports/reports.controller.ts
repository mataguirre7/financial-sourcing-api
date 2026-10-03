import { Controller, Get, Query } from "@nestjs/common";
import { ReportsService } from "./reports.service.js";
import { EarningsQueryDto } from "./model/earnings-query.dto.js";

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) { }

    @Get("earnings")
    async getEarnings(@Query() query: EarningsQueryDto) {
        return await this.reportsService.getEarnings(query);
    }
}