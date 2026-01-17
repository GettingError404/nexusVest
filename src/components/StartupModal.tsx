import { Startup } from "@/lib/startups";
import { formatCurrency, cn } from "@/lib/utils";
import {
  X,
  Rocket,
  MapPin,
  User,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface StartupModalProps {
  startup: Startup | null;
  isOpen: boolean;
  onClose: () => void;
  onInvest: (startup: Startup) => void;
}

export function StartupModal({
  startup,
  isOpen,
  onClose,
  onInvest,
}: StartupModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!visible && !isOpen) return null;

  if (!startup) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300",
        isOpen
          ? "bg-black/60 backdrop-blur-sm opacity-100"
          : "bg-black/0 backdrop-blur-none opacity-0 pointer-events-none",
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-slate-900 border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative transition-all duration-300 transform",
          isOpen
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-8 opacity-0",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image / Gradient */}
        <div className="h-40 bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-slate-900 relative">
          <div className="absolute -bottom-8 left-8 flex items-end gap-6">
            <div className="w-24 h-24 rounded-2xl bg-slate-800 border-4 border-slate-900 flex items-center justify-center text-5xl shadow-xl">
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
            <div className="pb-2">
              <h2 className="text-3xl font-bold text-white">{startup.name}</h2>
            </div>
          </div>
        </div>

        <div className="pt-12 px-8 pb-8">
          {/* Meta Tags */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge className="bg-accent/20 text-accent hover:bg-accent/30">
              {startup.category}
            </Badge>
            <Badge variant="outline">{startup.stage}</Badge>
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              <MapPin className="w-4 h-4" /> {startup.location}
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              <User className="w-4 h-4" /> {startup.founder}
            </div>
          </div>

          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            {startup.description}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-slate-400 text-xs uppercase font-bold mb-1">
                Projected ROI
              </div>
              <div className="text-green-400 font-bold text-xl">
                {startup.projectedROI.from}-{startup.projectedROI.to}%
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-slate-400 text-xs uppercase font-bold mb-1">
                Risk Level
              </div>
              <div
                className={cn(
                  "font-bold text-xl",
                  startup.riskLevel === "Low"
                    ? "text-blue-400"
                    : startup.riskLevel === "Medium"
                      ? "text-yellow-400"
                      : "text-orange-400",
                )}
              >
                {startup.riskLevel}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-slate-400 text-xs uppercase font-bold mb-1">
                {startup.metric.label}
              </div>
              <div className="text-white font-bold text-xl">
                {startup.metric.value}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-slate-400 text-xs uppercase font-bold mb-1">
                Min. Entry
              </div>
              <div className="text-white font-bold text-xl">
                {formatCurrency(startup.minEntry)}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-accent" /> Why This Matters
              </h3>
              <ul className="space-y-3">
                {startup.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-slate-300 text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
              <h3 className="text-sm font-bold text-blue-400 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" /> Tokenized Equity
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                This offering represents a tokenized interest in a special
                purpose vehicle (SPV) that holds equity in {startup.name}.
                Tokens are tradeable after a 12-month lock-up period.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Simulated Offering (Demo)
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex justify-end gap-3 sticky bottom-0 bg-slate-900/95 backdrop-blur-md pb-0">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => onInvest(startup)}
              className="bg-accent hover:bg-blue-600 min-w-[200px] text-lg h-12"
            >
              Invest {formatCurrency(startup.minEntry)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
