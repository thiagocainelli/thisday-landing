export interface DashboardStatsDto {
  totalEvents: number;
  activeEvents: number;
  totalCustomers: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

export interface UpcomingEventDto {
  uuid: string;
  name: string;
  startDate: string;
  status: string;
}

export interface PendingPaymentDto {
  uuid: string;
  amount: number;
  description: string;
  status: string;
  createdAt: string;
}

export interface EventsByMonthDto {
  month: string;
  eventos: number;
}

export interface RevenueByMonthDto {
  month: string;
  receita: number;
}

export interface DashboardDto {
  stats: DashboardStatsDto;
  upcomingEvents: UpcomingEventDto[];
  pendingPayments: PendingPaymentDto[];
  eventsByMonth: EventsByMonthDto[];
  revenueByMonth: RevenueByMonthDto[];
}
