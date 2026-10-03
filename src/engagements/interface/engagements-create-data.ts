import { EngagementStatus } from "../shared/engagement-status";

export interface EngagementCreateData {
  clientId: string;
  contractorId: string;
  hourlyRate: string;
  commissionRate: string;
  startDate: Date;
  endDate: Date;
  status: EngagementStatus;
  updatedAt?: Date;
}