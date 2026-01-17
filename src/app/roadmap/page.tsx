"use client";
import { useState } from "react";
import { saveSuggestion, registerInterest } from "@/lib/firestore";
import { ArrowRight, Bell, Calendar } from "lucide-react";

export default function RoadmapPage() {
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const milestones = [
    {
      title: "Layer 2 Integration",
      status: "Done",
      date: "Q4 2025",
      desc: "Launched on Arbitrum & Optimism.",
    },
    {
      title: "AI Sentiment Analysis",
      status: "Review",
      date: "Q1 2026",
      desc: "Integrating social sentiment into auto-balance algo.",
    },
    {
      title: "Institutional Custody",
      status: "Architecting",
      date: "Q2 2026",
      desc: "Partnership with Fireblocks.",
    },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (email && suggestion) {
      await saveSuggestion(email, suggestion);
      alert("Suggestion received!");
      setSuggestion("");
    }
  };

  return (
    <div className="container mx-auto py-20 px-4 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Strategic Outlook</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Our transparent roadmap for building the ultimate decentralized asset
          manager.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {milestones.map((m, i) => (
          <div
            key={i}
            className="relative p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-white/10 overflow-hidden group hover:border-accent/50 transition-all"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <span
                className={`px-2 py-1 rounded text-xs font-bold ${m.status === "Done" ? "bg-green-500 text-white" : "bg-yellow-500 text-black"}`}
              >
                {m.status}
              </span>
            </div>
            <Calendar className="w-10 h-10 text-accent mb-6" />
            <h3 className="text-xl font-bold mb-2">{m.title}</h3>
            <p className="text-sm text-slate-400 mb-4">{m.desc}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-slate-500">{m.date}</span>
              <button
                onClick={() => {
                  registerInterest(m.title);
                  alert("We will notify you!");
                }}
                className="text-xs font-bold text-accent flex items-center gap-1 hover:text-white transition-colors"
              >
                <Bell className="w-3 h-3" /> Notify Me
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center rounded-3xl bg-white/5 border border-white/10 p-12">
        <div>
          <h3 className="text-2xl font-bold mb-4">Suggest an Index</h3>
          <p className="text-slate-400 mb-6">
            What sector should we cover next? Gaming? BioTech? Let us know and
            get early access rewards.
          </p>
          <div className="flex items-center gap-2 text-accent font-bold cursor-pointer">
            <Bell className="w-4 h-4" />
            Get Notified on Launch
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-accent focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Suggestion (e.g. 'Solana Ecosystem Index')"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-accent focus:outline-none min-h-[100px]"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-primary font-bold hover:bg-slate-200 transition-all"
          >
            Submit Suggestion
          </button>
        </form>
      </div>
    </div>
  );
}
