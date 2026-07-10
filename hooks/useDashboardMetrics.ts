// hooks/useDashboardMetrics.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { DashboardMetrics } from "@/types";

export function useDashboardMetrics(week: string) {
  return useQuery({
    queryKey: ["dashboard", "metrics", week],
    queryFn: () => api.get<DashboardMetrics>(`/dashboard/metrics?week=${week}`),
  });
}