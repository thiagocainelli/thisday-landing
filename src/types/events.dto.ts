export interface CreateCustomerEventDto {
  name: string;
  email: string;
  phoneNumber: string;
  document: string;
}

export interface CreateEventsDto {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  status: string;
  type?: string;
  shareCode: string;
  qrCodeUrl?: string;
  storageFolder?: string;
  customerUuid?: string;
  customer?: CreateCustomerEventDto;
  planUuid?: string;
  storageLimitGB?: number;
}

export interface UpdateEventsDto {
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  type?: string;
  shareCode?: string;
  qrCodeUrl?: string;
  storageFolder?: string;
  planUuid?: string;
  storageLimitGB?: number;
}

export interface ReadEventsDto {
  uuid: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  type: string;
  shareCode: string;
  qrCodeUrl: string;
  storageFolder: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  customerUuid: string;
  planUuid: string;
  storageLimitGB: number;
}

export interface ListEventsDto {
  data: ReadEventsDto[];
  total: number;
}
