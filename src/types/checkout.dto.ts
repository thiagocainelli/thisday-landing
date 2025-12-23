export interface CheckoutDto {
  name: string;
  email: string;
  phone?: string;
  document?: string;
  eventName: string;
  eventDescription?: string;
  eventType?: string;
  eventStartDate: Date;
  eventEndDate: Date;
  planUuid: string;
  paymentMethod: string;
  installments?: number;
  cardNumber?: string;
  cardHolderName?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export interface CheckoutResponseDto {
  user: {
    uuid: string;
    name: string;
    email: string;
  };
  customer: {
    uuid: string;
    phoneNumber?: string;
    document?: string;
  };
  event: {
    uuid: string;
    name: string;
    shareCode: string;
    qrCodeUrl?: string;
  };
  paymentOrder: {
    uuid: string;
    amount: number;
    status: string;
    gatewayPaymentUrl?: string;
  };
}

export interface CheckoutAdditionalStorageDto {
  eventUuid: string;
  storageGB: number;
  paymentMethod: string;
  installments?: number;
  cardNumber?: string;
  cardHolderName?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export interface CheckoutAdditionalStorageResponseDto {
  event: {
    uuid: string;
    name: string;
    shareCode: string;
  };
  paymentOrder: {
    uuid: string;
    amount: number;
    status: string;
    gatewayPaymentUrl?: string;
  };
  additionalStorageGB: number;
}
