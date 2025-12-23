import { apiGet } from "@/lib/api-utils";
import { API_CONFIG } from "@/config/api.config";
import { DashboardDto } from "@/types/dashboard.dto";

const DASHBOARD_ENDPOINT = API_CONFIG.endpoints.dashboard;

export const getDashboard = async (): Promise<DashboardDto> => {
  return await apiGet<DashboardDto>(`${DASHBOARD_ENDPOINT}/stats`);
};
