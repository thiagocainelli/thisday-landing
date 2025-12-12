export interface CreatePlanDto {
  name: string;
  photos: number;
  duration: number; // em dias
  price: number;
  description?: string;
  features: string[];
  isActive: boolean;
}

export interface UpdatePlanDto {
  id: string;
  name?: string;
  photos?: number;
  duration?: number;
  price?: number;
  description?: string;
  features?: string[];
  isActive?: boolean;
}

export interface ListPlanDto {
  id: string;
  name: string;
  photos: number;
  duration: number;
  price: number;
  description?: string;
  isActive: boolean;
  totalSubscriptions: number;
  totalRevenue: number;
  createdAt: string;
}

export interface ReadPlanDto extends ListPlanDto {
  features: string[];
  updatedAt: string;
}

