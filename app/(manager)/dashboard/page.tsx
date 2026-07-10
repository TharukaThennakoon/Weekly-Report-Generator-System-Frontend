// app/(manager)/dashboard/page.tsx
"use client";

import { useState } from "react";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TasksTrendChart } from "@/components/dashboard/TasksTrendChart";
import { SubmissionStatusChart } from "@/components/dashboard/SubmissionStatusChart";
import { WorkloadByProjectChart } from "@/components/dashboard/WorkloadByProjectChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { getCurrentMonday, formatDateRange } from "@/lib/utils";
import { IconFileText, IconGauge, IconAlertTriangle } from "@tabler/icons-react";

export default function DashboardPage() {
  const [week, setWeek] = useState(getCurrentMonday());
  const { data: metrics, isLoading, isError } = useDashboardMetrics(week);

  const shiftWeek = (days: number) => {
    const d = new Date(week);
    d.setDate(d.getDate() + days);
    setWeek(d.toISOString().slice(0, 10));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Week of {formatDateRange(week, new Date(new Date(week).setDate(new Date(week).getDate() + 6)).toISOString())}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => shiftWeek(-7)} className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
            ← Prev week
          </button>
          <button onClick={() => setWeek(getCurrentMonday())} className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
            This week
          </button>
          <button onClick={() => shiftWeek(7)} className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
            Next week →
          </button>
        </div>
      </div>

      {isLoading && <p className="text-sm text-gray-400">Loading metrics...</p>}
      {isError && (
        <p className="text-sm text-red-600">
          Couldn&apos;t load metrics. Please try again.
        </p>
      )}

      {metrics && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <MetricCard label="Reports submitted" value={`${metrics.totalSubmitted}/${metrics.totalExpected}`} icon={IconFileText} />
            <MetricCard label="Compliance rate" value={`${metrics.complianceRate}%`} icon={IconGauge} />
            <MetricCard label="Open blockers" value={metrics.openBlockers} icon={IconAlertTriangle} />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <TasksTrendChart data={metrics.tasksTrend} />
            <SubmissionStatusChart data={metrics.submissionByMember} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <WorkloadByProjectChart data={metrics.workloadByProject} />
            <ActivityFeed activity={metrics.recentActivity} />
          </div>
        </>
      )}
    </div>
  );
}