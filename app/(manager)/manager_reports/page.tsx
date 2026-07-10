// app/(manager)/reports/page.tsx
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAllReports } from "@/hooks/useReports";
import { ReportFilters } from "@/components/filters/ReportFilters";
import { ReportStatusBadge } from "@/components/reports/ReportStatusBadge";
import { ReportDetailPanel } from "@/components/reports/ReportDetailPanel";
import { formatDateRange } from "@/lib/utils";
import { Report } from "@/types";
import { IconAlertTriangle } from "@tabler/icons-react";

export default function TeamReportsPage() {
  const searchParams = useSearchParams();
  const filters = {
    member: searchParams.get("member") || undefined,
    project: searchParams.get("project") || undefined,
    status: searchParams.get("status") || undefined,
    from: searchParams.get("from") || undefined,
    to: searchParams.get("to") || undefined,
  };

  const { data: reports, isLoading, isError } = useAllReports(filters);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-1">Team reports</h1>
      <p className="text-sm text-gray-500 mb-6">Browse and filter reports across your team.</p>

      <ReportFilters />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading && <p className="text-sm text-gray-400 py-12 text-center">Loading reports...</p>}
        {isError && <p className="text-sm text-red-600 py-12 text-center">Couldn&apos;t load reports.</p>}

        {reports && reports.length === 0 && (
          <p className="text-sm text-gray-400 py-12 text-center">No reports match these filters.</p>
        )}

        {reports && reports.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200 bg-gray-50">
                <th className="py-2.5 px-4 font-medium">Member</th>
                <th className="py-2.5 px-4 font-medium">Week</th>
                <th className="py-2.5 px-4 font-medium">Project</th>
                <th className="py-2.5 px-4 font-medium">Status</th>
                <th className="py-2.5 px-4 font-medium">Hours</th>
                <th className="py-2.5 px-4 font-medium w-8"></th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">{report.userName}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {formatDateRange(report.weekStart, report.weekEnd)}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{report.projectName}</td>
                  <td className="py-3 px-4"><ReportStatusBadge status={report.status} /></td>
                  <td className="py-3 px-4 text-gray-600">{report.hoursWorked ?? "—"}</td>
                  <td className="py-3 px-4">
                    {report.hasBlockers && (
                      <span title="Has blockers">
                        <IconAlertTriangle size={14} className="text-red-500" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedReport && (
        <ReportDetailPanel report={selectedReport} onClose={() => setSelectedReport(null)} />
      )}
    </div>
  );
}