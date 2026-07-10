// app/(member)/reports/mine/[reportId]/page.tsx
"use client";

import { useReport } from "@/hooks/useReports";
import { ReportForm } from "@/components/reports/ReportForm";
import { useParams } from "next/navigation";

export default function EditReportPage() {
  const { reportId } = useParams<{ reportId: string }>();
  const { data: report, isLoading, isError } = useReport(reportId);

  if (isLoading) {
    return <p className="text-sm text-gray-400">Loading report...</p>;
  }

  if (isError || !report) {
    return <p className="text-sm text-red-600">Report not found.</p>;
  }

  return (
  <div className="mx-auto max-w-6xl space-y-8">
    {/* Page Header */}
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-indigo-600">
            Weekly Report
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Week of{" "}
            {new Date(report.weekStart).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
            Review and update your weekly report before submitting it.
          </p>
        </div>

        <div>
          <span
            className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
              report.status === "SUBMITTED"
                ? "bg-green-100 text-green-700"
                : report.status === "DRAFT"
                ? "bg-amber-100 text-amber-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {report.status}
          </span>
        </div>
      </div>
    </div>

    {/* Form */}
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <ReportForm existingReport={report} />
    </div>
  </div>
);
}