// app/(member)/reports/mine/page.tsx
"use client";

import Link from "next/link";
import { useMyReports } from "@/hooks/useReports";
import { ReportHistoryTable } from "@/components/reports/ReportHistoryTable";
import { getCurrentMonday } from "@/lib/utils";
import { IconPlus, IconCircleCheck, IconAlertCircle } from "@tabler/icons-react";

export default function MyReportsPage() {
  const { data: reports, isLoading, isError } = useMyReports();

  const currentMonday = getCurrentMonday();
  const thisWeekReport = reports?.find((r) => r.weekStart.slice(0, 10) === currentMonday);

  return (
  <div className="mx-auto max-w-7xl space-y-8">
    {/* Header */}
    <div className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-indigo-600">
          Weekly Reports
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          My Reports
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
          View your weekly report history, continue draft reports, or create a
          new report for this week.
        </p>
      </div>

      <Link
        href="/reports/mine/new"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
      >
        <IconPlus size={18} />
        New Report
      </Link>
    </div>

    {/* Weekly Status */}
    {!isLoading && (
      <div
        className={`rounded-2xl border p-5 shadow-sm transition ${
          thisWeekReport?.status === "SUBMITTED"
            ? "border-green-200 bg-green-50"
            : "border-amber-200 bg-amber-50"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 rounded-full p-2 ${
              thisWeekReport?.status === "SUBMITTED"
                ? "bg-green-100"
                : "bg-amber-100"
            }`}
          >
            {thisWeekReport?.status === "SUBMITTED" ? (
              <IconCircleCheck
                size={18}
                className="text-green-700"
              />
            ) : (
              <IconAlertCircle
                size={18}
                className="text-amber-700"
              />
            )}
          </div>

          <div className="flex-1">
            {thisWeekReport?.status === "SUBMITTED" ? (
              <>
                <h3 className="font-semibold text-green-800">
                  Weekly report submitted
                </h3>

                <p className="mt-1 text-sm leading-6 text-green-700">
                  Great work! Your report for this week has already been
                  submitted successfully.
                </p>
              </>
            ) : thisWeekReport ? (
              <>
                <h3 className="font-semibold text-amber-800">
                  Draft report available
                </h3>

                <p className="mt-1 text-sm leading-6 text-amber-700">
                  Your report is saved as a draft. Continue editing and submit
                  it before the reporting deadline.
                </p>

                <Link
                  href={`/reports/mine/${thisWeekReport.id}`}
                  className="mt-3 inline-flex text-sm font-semibold text-amber-800 underline underline-offset-4"
                >
                  Continue editing →
                </Link>
              </>
            ) : (
              <>
                <h3 className="font-semibold text-amber-800">
                  No report started
                </h3>

                <p className="mt-1 text-sm leading-6 text-amber-700">
                  You haven't started this week's report yet.
                </p>

                <Link
                  href="/reports/mine/new"
                  className="mt-3 inline-flex text-sm font-semibold text-amber-800 underline underline-offset-4"
                >
                  Create this week's report →
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    )}

    {/* Loading */}
    {isLoading && (
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />

        <p className="text-sm font-medium text-gray-600">
          Loading your reports...
        </p>
      </div>
    )}

    {/* Error */}
    {isError && (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-red-700">
          Unable to load reports
        </h3>

        <p className="mt-2 text-sm text-red-600">
          Something went wrong while fetching your report history.
        </p>
      </div>
    )}

    {/* Report History */}
    {reports && (
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <ReportHistoryTable reports={reports} />
      </div>
    )}
  </div>
);
}