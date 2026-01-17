import { cn } from "@/lib/utils";

interface ProposalCardProps {
  id: number;
  title: string;
  status: "Active" | "Passed" | "Rejected";
  votesFor: number;
  votesAgainst: number;
  timeLeft: string;
  onVote: (id: number, support: boolean) => void;
  category: string;
}

export function ProposalCard({
  id,
  title,
  status,
  votesFor,
  votesAgainst,
  timeLeft,
  onVote,
  category,
}: ProposalCardProps) {
  const total = votesFor + votesAgainst;
  const forPercent = total === 0 ? 0 : (votesFor / total) * 100;

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all">
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/20">
          {category}
        </span>
        <span className="text-xs text-slate-400">{timeLeft} remaining</span>
      </div>

      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-green-400 font-medium">For: {votesFor}</span>
          <span className="text-red-400 font-medium">
            Against: {votesAgainst}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{ width: `${forPercent}%` }}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onVote(id, true)}
          className="flex-1 py-2 rounded-lg bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30 font-medium text-sm transition-colors"
        >
          Vote For
        </button>
        <button
          onClick={() => onVote(id, false)}
          className="flex-1 py-2 rounded-lg bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600/30 font-medium text-sm transition-colors"
        >
          Vote Against
        </button>
      </div>
    </div>
  );
}
