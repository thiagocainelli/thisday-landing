export interface CreateCustomersDto {
  name?: string;
  email?: string;
  phoneNumber?: string;
  document?: string;
  subscriptionStatus?: string;
  userUuid?: string;
}

export interface UpdateCustomersDto {
  name?: string;
  email?: string;
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
  userName: string;
  userEmail: string;
}

export interface ListCustomersDto {
  data: ReadCustomersDto[];
  total: number;
}
