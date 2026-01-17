import Link from "next/link";
import { ArrowRight, BarChart3, Globe, ShieldCheck, Zap } from "lucide-react";
import { IndexCard } from "@/components/IndexCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full pt-32 pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium text-slate-300">
            DeFi 2.0 is live
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-6 max-w-4xl mx-auto">
          Institutional Grade <br />
          <span className="text-accent">Access for All.</span>
        </h1>

        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Nexus Vest democratizes elite financial indices. Invest in curated
          portfolios of real-world assets and crypto blue chips starting at just
          $100.
        </p>

        <div className="flex items-center justify-center gap-4 mb-20">
          <Link
            href="/invest"
            className="px-8 py-4 rounded-xl bg-accent text-white font-bold text-lg hover:bg-blue-600 shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-xl bg-slate-800 text-white font-bold text-lg border border-white/10 hover:bg-slate-700 transition-all"
          >
            View Performance
          </Link>
        </div>

        {/* Floating Portfolio Preview */}
        <div className="relative mx-auto max-w-4xl animate-fade-in-up delay-200 hidden md:block group">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative rounded-xl bg-slate-900/90 border border-white/10 p-6 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                  <span className="font-bold text-white">NV</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Total Balance
                  </h3>
                  <p className="text-slate-400 text-sm">Main Portfolio</p>
                </div>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold text-white">$12,450.32</h3>
                <span className="text-green-400 text-sm font-medium">
                  +12.4% this month
                </span>
              </div>
            </div>
            {/* Fake Chart Line */}
            <div className="w-full h-32 flex items-end justify-between gap-2 px-2">
              {[40, 45, 60, 55, 70, 85, 80, 95, 100, 90, 110, 120].map(
                (h, i) => (
                  <div
                    key={i}
                    className="w-full bg-accent/20 hover:bg-accent/40 transition-colors rounded-t-md relative group/bar"
                    style={{ height: `${h / 1.5}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                      ${(h * 100).toLocaleString()}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="w-full border-y border-white/5 bg-white/[0.02] py-8">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4 text-center">
          {[
            { label: "Total Volume", value: "$42M+" },
            { label: "Active Investors", value: "12,403" },
            { label: "Avg. Return (YTD)", value: "18.2%" },
            { label: "Management Fee", value: "0.5%" },
          ].map((stat) => (
            <div key={stat.label}>
              <h4 className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </h4>
              <p className="text-sm text-slate-500 uppercase font-semibold tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Indices */}
      <section className="container mx-auto py-24 px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Curated Indices</h2>
            <p className="text-slate-400 max-w-lg">
              Diversify automatically with our expertly managed baskets.
            </p>
          </div>
          <Link
            href="/invest"
            className="text-accent hover:text-white transition-colors flex items-center gap-2 font-semibold"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <IndexCard
            title="Nexus Blue Chip"
            ticker="NBC"
            returns={24.5}
            risk="Med"
            description="Exposure to the top 10 protocols by market cap, rebalanced monthly."
          />
          <IndexCard
            title="DeFi Yield Plus"
            ticker="DYP"
            returns={42.3}
            risk="High"
            description="High-yield farming strategies aggregated into a single token."
          />
          <IndexCard
            title="Real World Assets"
            ticker="RWA"
            returns={12.1}
            risk="Low"
            description="Tokenized real estate, treasury bills, and gold."
          />
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="container mx-auto py-24 px-4 border-t border-white/5">
        <h2 className="text-4xl font-bold text-center mb-16">
          Why Nexus Vest?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 h-[600px]">
          <div className="col-span-2 row-span-2 relative rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 p-10 overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all" />
            <ShieldCheck className="w-16 h-16 text-white mb-6" />
            <h3 className="text-3xl font-bold mb-4">Institutional Security</h3>
            <p className="text-slate-400 text-lg max-w-md">
              Smart contracts audited by top firms. Multi-sig treasury
              management. Your assets are secured by best-in-class
              infrastructure.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-900 border border-white/10 p-8 hover:bg-slate-800 transition-all">
            <Zap className="w-10 h-10 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Automated Rebalancing</h3>
            <p className="text-slate-400 text-sm">
              We handle the portfolio adjustments so you don't have to.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-900 border border-white/10 p-8 hover:bg-slate-800 transition-all">
            <BarChart3 className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Real-time Analytics</h3>
            <p className="text-slate-400 text-sm">
              Track performance with embedded Power BI dashboards.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-32 relative text-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-950 z-[-2]" />

        {/* Grid SVG Background */}
        <div
          className="absolute inset-0 z-[-1] opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-[-1]" />

        <h2 className="text-5xl font-bold mb-8 text-white">
          Ready to start growing?
        </h2>
        <Link
          href="/invest"
          className="inline-block px-10 py-5 rounded-xl bg-white text-primary font-bold text-xl hover:scale-105 transition-all shadow-xl shadow-white/5"
        >
          Launch App
        </Link>
      </section>
    </div>
  );
}
