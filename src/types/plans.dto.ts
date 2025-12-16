export interface CreatePlanDto {
  name: string;
  storage: number; // em GB
  duration: number; // em dias
  price: number;
  description?: string;
  features: string[];
  isActive: boolean;
}

export interface UpdatePlanDto {
  id: string;
  name?: string;
  storage?: number; // em GB
  duration?: number;
  price?: number;
  description?: string;
  features?: string[];
  isActive?: boolean;
}

export interface ListPlanDto {
  id: string;
  name: string;
  storage: number; // em GB
  storageFormatted: string;
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
