// hooks/useReports.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Report } from "@/types";
import { ReportFormValues } from "@/lib/validators";

export function useMyReports() {
  return useQuery({
    queryKey: ["reports", "mine"],
    queryFn: () => api.get<Report[]>("/reports/mine"),
  });
}

export function useReport(id: string | undefined) {
  return useQuery({
    queryKey: ["reports", id],
    queryFn: () => api.get<Report>(`/reports/${id}`),
    enabled: !!id, // don't fetch until an id actually exists
  });
}

export function useCreateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ReportFormValues) => api.post<Report>("/reports", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports", "mine"] });
    },
  });
}

export function useUpdateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ReportFormValues }) =>
      api.put<Report>(`/reports/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reports", "mine"] });
      queryClient.invalidateQueries({ queryKey: ["reports", variables.id] });
    },
  });
}

export function useSubmitReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.post<Report>(`/reports/${id}/submit`, {}),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["reports", "mine"] });
      queryClient.invalidateQueries({ queryKey: ["reports", id] });
    },
  });
}


export interface ReportFilters {
  member?: string;
  project?: string;
  from?: string;
  to?: string;
  status?: string;
}

export function useAllReports(filters: ReportFilters) {
  const params = new URLSearchParams();
  if (filters.member) params.set("member", filters.member);
  if (filters.project) params.set("project", filters.project);
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  if (filters.status) params.set("status", filters.status);

  return useQuery({
    queryKey: ["reports", "all", filters],
    queryFn: () => api.get<Report[]>(`/reports?${params.toString()}`),
  });
}