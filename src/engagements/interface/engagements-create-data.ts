import { EngagementStatus } from "../shared/engagement-status";

export interface EngagementCreateData {
  clientId: string;
  contractorId: string;
  hourlyRate: string;
  commissionRate: string;
  startDate: unknown;
  endDate: unknown;
  status: EngagementStatus;
  updatedAt?: unknown;
}