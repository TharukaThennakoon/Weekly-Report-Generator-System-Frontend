// components/reports/ReportDetailPanel.tsx
"use client";

import { Report } from "@/types";
import { ReportStatusBadge } from "./ReportStatusBadge";
import { formatDateRange } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";

export function ReportDetailPanel({ report, onClose }: { report: Report; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-end" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md h-full overflow-y-auto p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{report.userName}</h2>
            <p className="text-sm text-gray-500">{formatDateRange(report.weekStart, report.weekEnd)}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <IconX size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <ReportStatusBadge status={report.status} />
          <span className="text-xs text-gray-400">{report.projectName}</span>
        </div>

        <div className="space-y-5">
          <Field label="Tasks completed" value={report.tasksCompleted} />
          <Field label="Tasks planned for next week" value={report.tasksPlanned} />
          <Field label="Blockers / challenges" value={report.blockers || "None reported"} muted={!report.blockers} />
          {report.hoursWorked !== undefined && report.hoursWorked !== null && (
            <Field label="Hours worked" value={`${report.hoursWorked}h`} />
          )}
          {report.notes && <Field label="Notes / links" value={report.notes} />}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div>
      <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{label}</h3>
      <p className={`text-sm whitespace-pre-wrap ${muted ? "text-gray-400 italic" : "text-gray-700"}`}>
        {value}
      </p>
    </div>
  );
}