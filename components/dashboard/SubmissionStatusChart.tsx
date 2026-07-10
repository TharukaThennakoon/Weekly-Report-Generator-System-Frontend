// components/dashboard/SubmissionStatusChart.tsx
"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const STATUS_COLOR: Record<string, string> = {
  SUBMITTED: "#16a34a",
  DRAFT: "#d97706",
  LATE: "#dc2626",
};

export function SubmissionStatusChart({
  data,
}: {
  data: { name: string; status: "SUBMITTED" | "DRAFT" | "LATE" }[];
}) {
  const chartData = data.map((d) => ({ name: d.name, value: 1, status: d.status }));

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Submission status by member</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} layout="vertical">
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} stroke="#9ca3af" />
          <Tooltip formatter={(value, name, props) => props?.payload?.status || ""} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={18}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={STATUS_COLOR[entry.status]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}