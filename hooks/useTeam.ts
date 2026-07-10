import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { User } from "@/types";

export function useTeamMembers() {
  return useQuery({
    queryKey: ["team", "members"],
    queryFn: () => api.get<User[]>("/users?role=MEMBER"),
  });
}