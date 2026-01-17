import { cn, formatCurrency } from "@/lib/utils";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";

interface IndexCardProps {
  title: string;
  ticker: string;
  returns: number;
  risk: "Low" | "Med" | "High";
  description: string;
  minInvestment?: number;
}

export function IndexCard({
  title,
  ticker,
  returns,
  risk,
  description,
  minInvestment = 100,
}: IndexCardProps) {
  return (
    <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col h-full">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white/60">
              {ticker}
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-snug">{description}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-success text-green-400 font-bold flex items-center gap-1 text-lg">
            +{returns}% <ArrowUpRight className="w-4 h-4" />
          </span>
          <span className="text-xs text-slate-500 mb-2">YTD Return</span>
          {/* Mini Bar Chart */}
          <div className="flex items-end gap-1 h-6">
            {[40, 70, 45, 90, 60].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-green-500/30 rounded-t-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="block text-slate-500 text-xs uppercase font-bold">
              Risk
            </span>
            <span
              className={cn(
                "font-semibold",
                risk === "Low"
                  ? "text-blue-400"
                  : risk === "Med"
                    ? "text-yellow-400"
                    : "text-red-400",
              )}
            >
              {risk}
            </span>
          </div>
          <div>
            <span className="block text-slate-500 text-xs uppercase font-bold">
              Min
            </span>
            <span className="text-slate-300 font-semibold">
              {formatCurrency(minInvestment)}
            </span>
          </div>
        </div>

        <Link
          href="/invest"
          className="p-2 rounded-full bg-slate-800 text-white hover:bg-accent hover:scale-110 transition-all"
        >
          <TrendingUp className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
