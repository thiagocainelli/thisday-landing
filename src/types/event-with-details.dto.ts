export interface PlanInfoDto {
  uuid: string;
  name: string;
  capacityGB: number;
  durationDays: number;
}

export interface EventWithDetailsDto {
  uuid: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  type?: string;
  shareCode: string;
  qrCodeUrl: string;
  storageFolder: string;
  customerUuid: string;
  plan?: PlanInfoDto;
  storageUsedGB: number;
  storageLimitGB?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
