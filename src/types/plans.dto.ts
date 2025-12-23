export interface CreatePlansDto {
  name: string;
  description?: string;
  price: number;
  capacityGB: number;
  allowedEvents?: number;
  durationDays: number;
  active: boolean;
}

export interface UpdatePlansDto {
  name?: string;
  description?: string;
  price?: number;
  capacityGB?: number;
  allowedEvents?: number;
  durationDays?: number;
  active?: boolean;
}

export interface ReadPlansDto {
  uuid: string;
  name: string;
  description: string;
  price: number;
  capacityGB: number;
  allowedEvents: number;
  durationDays: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface ListPlansDto {
  data: ReadPlansDto[];
  total: number;
}
