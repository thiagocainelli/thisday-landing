export interface ListPaymentDto {
  id: string;
  eventId: string;
  eventName: string;
  customerName: string;
  customerEmail: string;
  planName: string;
  amount: number;
  paymentMethod: "pix" | "credit";
  status: "pending" | "paid" | "failed" | "refunded";
  installments?: number;
  paidAt?: string;
  createdAt: string;
  transactionId?: string;
}

export interface ReadPaymentDto extends ListPaymentDto {
  pixCode?: string;
  cardLastDigits?: string;
  refundedAt?: string;
  refundReason?: string;
}

