// components/reports/ReportCard.tsx
import Link from "next/link";
import { Report } from "@/types";
import { ReportStatusBadge } from "./ReportStatusBadge";
import { formatDateRange } from "@/lib/utils";
import { IconAlertTriangle, IconClock, IconChevronRight } from "@tabler/icons-react";

export function ReportCard({ report }: { report: Report }) {
  return (
    <Link
      href={`/reports/mine/${report.id}`}
      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg
                 hover:border-indigo-300 hover:shadow-sm transition group"
    >
      <div className="flex items-center gap-4">
        <div
          className="w-1 h-10 rounded-full shrink-0"
          style={{ backgroundColor: report.projectName ? "#7F77DD" : "#ccc" }}
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900 text-sm">
              {formatDateRange(report.weekStart, report.weekEnd)}
            </span>
            <ReportStatusBadge status={report.status} />
            {report.hasBlockers && (
              <span title="Has blockers">
                <IconAlertTriangle size={14} className="text-red-500" />
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <span>{report.projectName}</span>
            {report.hoursWorked && (
              <span className="flex items-center gap-1">
                <IconClock size={12} />
                {report.hoursWorked}h
              </span>
            )}
          </div>
        </div>
      </div>
      <IconChevronRight size={16} className="text-gray-300 group-hover:text-indigo-500 transition" />
    </Link>
  );
}