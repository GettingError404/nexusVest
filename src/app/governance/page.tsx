"use client";
import { Sidebar } from "@/components/Sidebar";
import { ProposalCard } from "@/components/ProposalCard";
import { useState } from "react";
import { sendVoteTx, connectWallet } from "@/lib/web3";
import { recordVote, checkIfVoted } from "@/lib/firestore";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState("proposals");
  const auth = getAuth(app);

  const stats = [
    { label: "Total Votes", value: "2.4M" },
    { label: "Participation", value: "68%" },
    { label: "Quorum", value: "Reached" },
  ];

  const handleVote = async (id: number, support: boolean) => {
    if (!auth.currentUser) return alert("Login required");

    const hasVoted = await checkIfVoted(auth.currentUser.uid, id);
    if (hasVoted) return alert("You have already voted on this proposal.");

    try {
      const { signer } = await connectWallet();
      if (!signer) return alert("Wallet required");

      const tx = await sendVoteTx(id, support, signer);
      await recordVote({
        uid: auth.currentUser.uid,
        proposalId: id,
        support,
        txHash: tx,
      });
      alert(`Voted ${support ? "For" : "Against"} successfully!`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Governance</h1>
            <p className="text-slate-400">Shape the future of the indices.</p>
          </div>
          <button className="px-6 py-3 rounded-xl bg-slate-800 border border-white/10 hover:bg-slate-700 font-bold transition-all">
            + Draft Proposal
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <p className="text-slate-400 text-sm mb-1">{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-6">Active Proposals</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ProposalCard
            id={1}
            title="NIP-12: Add RWA (Real World Assets) to Blue Chip Index"
            category="Allocation"
            status="Active"
            votesFor={124000}
            votesAgainst={45000}
            timeLeft="2 days"
            onVote={handleVote}
          />
          <ProposalCard
            id={2}
            title="NIP-13: Reduce Management Fee to 0.4%"
            category="Treasury"
            status="Active"
            votesFor={89000}
            votesAgainst={120000}
            timeLeft="5 hours"
            onVote={handleVote}
          />
          {/* Mock Draft */}
          <div className="p-6 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4 text-2xl">
              +
            </div>
            <h3 className="font-bold">Draft New Proposal</h3>
            <p className="text-sm text-slate-500">
              Have an idea? Submit it to the DAO.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
