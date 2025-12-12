export interface CreateEventDto {
  fullName: string;
  email: string;
  phone: string;
  eventName: string;
  eventDate: string;
  eventType: string;
  planId: string;
}

export interface UpdateEventDto {
  id: string;
  fullName?: string;
  email?: string;
  phone?: string;
  eventName?: string;
  eventDate?: string;
  eventType?: string;
  planId?: string;
  status?: "active" | "expired" | "cancelled";
}

export interface ListEventDto {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  eventName: string;
  eventDate: string;
  eventType: string;
  planId: string;
  planName: string;
  status: "active" | "expired" | "cancelled";
  createdAt: string;
  expiresAt: string;
  totalFiles: number;
  totalRevenue: number;
}

export interface ReadEventDto extends ListEventDto {
  qrCodeUrl: string;
  shareUrl: string;
  filesCount: number;
  viewsCount: number;
  lastAccessAt?: string;
}

