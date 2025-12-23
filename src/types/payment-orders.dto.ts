export interface CreatePaymentOrdersDto {
  amount: number;
  description?: string;
  status: string;
  gateway: string;
  gatewayOrderId?: string;
  gatewayPaymentUrl?: string;
  customerUuid: string;
  eventUuid?: string;
}

export interface UpdatePaymentOrdersDto {
  amount?: number;
  description?: string;
  status?: string;
  gateway?: string;
  gatewayOrderId?: string;
  gatewayPaymentUrl?: string;
  eventUuid?: string;
}

export interface ReadPaymentOrdersDto {
  uuid: string;
  amount: number;
  description: string;
  status: string;
  gateway: string;
  gatewayOrderId: string;
  gatewayPaymentUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  customerUuid: string;
  eventUuid: string;
}

export interface ListPaymentOrdersDto {
  data: ReadPaymentOrdersDto[];
  total: number;
}
