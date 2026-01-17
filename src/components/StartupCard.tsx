import { Startup } from "@/lib/startups";
import { formatCurrency, cn } from "@/lib/utils";
import {
  TrendingUp,
  Users,
  Zap,
  Leaf,
  Coins,
  Cpu,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface StartupCardProps {
  startup: Startup;
  onViewDetails: (startup: Startup) => void;
  onInvest: (startup: Startup) => void;
}

const CategoryIcons = {
  AI: Cpu,
  FinTech: Coins,
  Health: Activity,
  Climate: Leaf,
  Web3: Globe,
  Robotics: Zap,
};

export function StartupCard({
  startup,
  onViewDetails,
  onInvest,
}: StartupCardProps) {
  const Icon = CategoryIcons[startup.category] || Zap;

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-accent/40 bg-slate-900/40 backdrop-blur-sm border-white/5">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -z-10 group-hover:bg-accent/10 transition-all" />

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              {startup.category === "AI"
                ? "🤖"
                : startup.category === "FinTech"
                  ? "💳"
                  : startup.category === "Health"
                    ? "🩺"
                    : startup.category === "Climate"
                      ? "🌱"
                      : startup.category === "Web3"
                        ? "⛓️"
                        : "⚙️"}
            </div>
            <div>
              <h3 className="font-bold text-lg text-white leading-tight group-hover:text-accent transition-colors">
                {startup.name}
              </h3>
              <div className="flex items-center gap-2 text-xs mt-1">
                <Badge
                  variant="secondary"
                  className="bg-slate-800/80 text-slate-400 border border-white/5 font-normal"
                >
                  {startup.category}
                </Badge>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{startup.stage}</span>
              </div>
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-green-500/20 text-green-400 bg-green-500/5"
          >
            Min {formatCurrency(startup.minEntry)}
          </Badge>
        </div>

        <p className="text-slate-400 text-sm mb-6 line-clamp-2 h-10">
          {startup.tagline}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 mb-6 p-3 rounded-lg bg-black/20 border border-white/5">
          <div className="text-center border-r border-white/5">
            <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">
              ROI
            </span>
            <span className="text-green-400 font-bold text-sm">
              {startup.projectedROI.from}-{startup.projectedROI.to}%
            </span>
          </div>
          <div className="text-center border-r border-white/5">
            <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">
              Risk
            </span>
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "font-bold text-sm",
                  startup.riskLevel === "Low"
                    ? "text-blue-400"
                    : startup.riskLevel === "Medium"
                      ? "text-yellow-400"
                      : "text-orange-400",
                )}
              >
                {startup.riskLevel}
              </span>
              <div className="w-8 h-1 bg-slate-700 rounded-full mt-1 overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full",
                    startup.riskLevel === "Low"
                      ? "w-1/3 bg-blue-400"
                      : startup.riskLevel === "Medium"
                        ? "w-2/3 bg-yellow-400"
                        : "w-full bg-orange-400",
                  )}
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <span className="block text-[10px] text-slate-500 uppercase tracking-wider mb-1">
              Traction
            </span>
            <span className="text-slate-200 font-bold text-sm truncate px-1">
              {startup.metric.value}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="ghost"
            className="flex-1 bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-800"
            onClick={() => onViewDetails(startup)}
          >
            Details
          </Button>
          <Button
            className="flex-1 bg-accent hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20"
            onClick={() => onInvest(startup)}
          >
            Invest
          </Button>
        </div>
      </div>
    </Card>
  );
}
