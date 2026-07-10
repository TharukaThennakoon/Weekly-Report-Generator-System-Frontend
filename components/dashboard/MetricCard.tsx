// components/dashboard/MetricCard.tsx
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";

export function MetricCard({
  label,
  value,
  icon: Icon,
  trend,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  trend?: { direction: "up" | "down"; label: string };
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">{label}</span>
        <Icon size={18} className="text-gray-400" />
      </div>
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
      {trend && (
        <div
          className={`flex items-center gap-1 text-xs mt-2 ${
            trend.direction === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend.direction === "up" ? <IconArrowUpRight size={14} /> : <IconArrowDownRight size={14} />}
          {trend.label}
        </div>
      )}
    </div>
  );
}