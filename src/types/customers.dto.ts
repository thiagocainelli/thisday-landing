export interface CreateCustomerDto {
  fullName: string;
  email: string;
  phone: string;
  document?: string;
}

export interface UpdateCustomerDto {
  id: string;
  fullName?: string;
  email?: string;
  phone?: string;
  document?: string;
}

export interface ListCustomerDto {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  document?: string;
  totalEvents: number;
  totalSpent: number;
  createdAt: string;
  lastEventAt?: string;
}

export interface ReadCustomerDto extends ListCustomerDto {
  events: Array<{
    id: string;
    eventName: string;
    eventDate: string;
    planName: string;
    status: string;
    totalSpent: number;
  }>;
}

