export interface CreatePaymentTransactionsDto {
  gatewayTransactionId: string;
  status: string;
  amount: number;
  paymentOrderUuid: string;
}

export interface UpdatePaymentTransactionsDto {
  gatewayTransactionId?: string;
  status?: string;
  amount?: number;
}

export interface ReadPaymentTransactionsDto {
  uuid: string;
  gatewayTransactionId: string;
  status: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  paymentOrderUuid: string;
}

export interface ListPaymentTransactionsDto {
  data: ReadPaymentTransactionsDto[];
  total: number;
}
