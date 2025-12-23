export interface CreateSubscriptionsDto {
  startDate: Date;
  endDate: Date;
  status: string;
  customerUuid: string;
  planUuid: string;
  paymentOrderUuid?: string;
}

export interface UpdateSubscriptionsDto {
  startDate?: Date;
  endDate?: Date;
  status?: string;
}

export interface ReadSubscriptionsDto {
  uuid: string;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  customerUuid: string;
  planUuid: string;
  paymentOrderUuid: string;
}

export interface ListSubscriptionsDto {
  data: ReadSubscriptionsDto[];
  total: number;
}
