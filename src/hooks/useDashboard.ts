import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/services/dashboard.service";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboard(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
