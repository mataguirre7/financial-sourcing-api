import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/database.module.js';
import { ClientsModule } from './clients/clients.module.js';
import { ContractorsModule } from './contractors/contractors.module.js';
import { EngagementsModule } from './engagements/engagements.module.js';
import { InvoicesModule } from './invoices/invoices.module.js';
import { ReportsModule } from './reports/reports.module.js';

@Module({
  imports: [DatabaseModule, ClientsModule, ContractorsModule, EngagementsModule, InvoicesModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
