// components/reports/ReportStatusBadge.tsx
import { ReportStatus } from "@/types";

const STYLES: Record<ReportStatus, string> = {
  SUBMITTED: "bg-green-50 text-green-700 border-green-200",
  DRAFT: "bg-amber-50 text-amber-700 border-amber-200",
  LATE: "bg-red-50 text-red-700 border-red-200",
};

const LABELS: Record<ReportStatus, string> = {
  SUBMITTED: "Submitted",
  DRAFT: "Pending",
  LATE: "Late",
};

export function ReportStatusBadge({ status }: { status: ReportStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}