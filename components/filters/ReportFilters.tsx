// components/filters/ReportFilters.tsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTeamMembers } from "@/hooks/useTeam";
import { useProjects } from "@/hooks/useProjects";
import { IconX } from "@tabler/icons-react";

export function ReportFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: members } = useTeamMembers();
  const { data: projects } = useProjects();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => router.push(pathname);

  const hasActiveFilters = searchParams.toString().length > 0;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <select
        value={searchParams.get("member") || ""}
        onChange={(e) => updateParam("member", e.target.value)}
        className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All members</option>
        {members?.map((m) => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>

      <select
        value={searchParams.get("project") || ""}
        onChange={(e) => updateParam("project", e.target.value)}
        className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All projects</option>
        {projects?.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <select
        value={searchParams.get("status") || ""}
        onChange={(e) => updateParam("status", e.target.value)}
        className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All statuses</option>
        <option value="SUBMITTED">Submitted</option>
        <option value="DRAFT">Pending</option>
        <option value="LATE">Late</option>
      </select>

      <input
        type="date"
        value={searchParams.get("from") || ""}
        onChange={(e) => updateParam("from", e.target.value)}
        className="text-sm border border-gray-300 rounded-md px-3 py-1.5
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <span className="text-gray-400 text-sm">to</span>
      <input
        type="date"
        value={searchParams.get("to") || ""}
        onChange={(e) => updateParam("to", e.target.value)}
        className="text-sm border border-gray-300 rounded-md px-3 py-1.5
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 ml-1"
        >
          <IconX size={14} />
          Clear filters
        </button>
      )}
    </div>
  );
}