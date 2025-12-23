export interface CreateCustomersDto {
  phoneNumber?: string;
  document?: string;
  subscriptionStatus?: string;
  userUuid: string;
}

export interface UpdateCustomersDto {
  phoneNumber?: string;
  document?: string;
  subscriptionStatus?: string;
}

export interface ReadCustomersDto {
  uuid: string;
  phoneNumber?: string;
  document?: string;
  subscriptionStatus?: string;
  createdAt: Date;
  updatedAt: Date;
  userUuid: string;
}

export interface ListCustomersDto {
  data: ReadCustomersDto[];
  total: number;
}
