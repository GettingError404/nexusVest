import { ArrowUpRight } from "lucide-react";

export function StatCard({
  label,
  value,
  trend,
  trendUp,
}: {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="p-6 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-400 font-medium text-sm">{label}</span>
        <div
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${trendUp ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
        >
          {trend}
          {trendUp && <ArrowUpRight className="w-3 h-3" />}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
    </div>
  );
}
