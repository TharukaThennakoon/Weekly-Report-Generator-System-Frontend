// app/(member)/reports/mine/new/page.tsx

import { ReportForm } from "@/components/reports/ReportForm";

export default function NewReportPage() {
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
              Create New Report
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Record your accomplishments, upcoming tasks, blockers, and project
              progress for this week's reporting period.
            </p>
          </div>

          <div>
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
              Draft
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <ReportForm />
      </div>
    </div>
  );
}