// components/reports/ReportHistoryTable.tsx
import { Report } from "@/types";
import { ReportCard } from "./ReportCard";

export function ReportHistoryTable({ reports }: { reports: Report[] }) {
  if (reports.length === 0) {
    return (
      <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-lg">
        <p className="text-sm text-gray-500">You haven&apos;t created any reports yet.</p>
      </div>
    );
  }

  // group by year to add lightweight section breaks for long histories
  const byYear = reports.reduce<Record<string, Report[]>>((acc, report) => {
    const year = new Date(report.weekStart).getFullYear().toString();
    acc[year] = acc[year] || [];
    acc[year].push(report);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="space-y-6">
      {years.map((year) => (
        <div key={year}>
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">{year}</h3>
          <div className="space-y-2">
            {byYear[year].map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}