"use client";
import { useEffect, useState } from "react";
import { PowerBIReport } from "@/components/PowerBIReport";
import { StatCard } from "@/components/StatCard";
import { formatCurrency } from "@/lib/utils";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function DashboardPage() {
  const [investments, setInvestments] = useState<any[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const auth = getAuth(app);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "investments"),
      where("uid", "==", auth.currentUser.uid),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setInvestments(data);
      const total = data.reduce(
        (acc: any, curr: any) => acc + (curr.amount || 0),
        0,
      );
      setTotalValue(total);
    });
    return () => unsubscribe();
  }, [auth.currentUser]);

  const data = [
    { name: "DeFi", value: 400, color: "#3B82F6" },
    { name: "RWA", value: 300, color: "#10B981" },
    { name: "Infra", value: 300, color: "#F59E0B" },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Portfolio Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Balance"
          value={formatCurrency(totalValue * 1.12)}
          trend="+12.5%"
          trendUp={true}
        />
        <StatCard
          label="Daily PNL"
          value="+$124.50"
          trend="+2.1%"
          trendUp={true}
        />
        <StatCard
          label="Active Indices"
          value={investments.length.toString()}
          trend="Stable"
          trendUp={true}
        />
        <StatCard
          label="Next Rebalance"
          value="3 Days"
          trend="On Track"
          trendUp={true}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-4">Performance Analytics</h3>
          <PowerBIReport />

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Market Insights</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <h4 className="font-bold text-blue-400 mb-1">
                  Bullish on DeFi
                </h4>
                <p className="text-sm text-slate-400">
                  Total value locked in lending protocols hits 6-month high.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <h4 className="font-bold text-purple-400 mb-1">RWA Adoption</h4>
                <p className="text-sm text-slate-400">
                  BlackRock tokenized fund drives institutional volume.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold mb-4">Sector Allocation</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {data.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center gap-1 text-xs text-slate-400"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  {d.name}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 relative overflow-hidden">
            <h3 className="text-lg font-bold mb-2">Growth Forecast</h3>
            <p className="text-sm text-slate-400 mb-4">
              Projected value in 5 years based on current CAGR.
            </p>
            <div className="text-3xl font-bold text-accent mb-2">
              {formatCurrency(totalValue * 2.8)}
            </div>
            <div className="w-full h-16 flex items-end gap-1">
              {[40, 55, 45, 60, 75, 65, 80, 95].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-accent/30 hover:bg-accent transition-all rounded-t-sm"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-white/10">
          <h3 className="text-xl font-bold">Held Assets</h3>
          <button className="text-sm text-accent hover:text-white">
            Rebalance Portfolio
          </button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-white/5 text-slate-400 text-sm">
            <tr>
              <th className="p-4">Asset</th>
              <th className="p-4">Balance</th>
              <th className="p-4">allocation</th>
              <th className="p-4">ROI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {investments.length > 0 ? (
              investments.map((inv, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium">
                    Nexus {inv.allocationType === "auto" ? "Auto" : "Standard"}{" "}
                    Fund
                  </td>
                  <td className="p-4">{formatCurrency(inv.amount)}</td>
                  <td className="p-4">100%</td>
                  <td className="p-4 text-green-400">+12.4%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  No investments found.{" "}
                  <a href="/invest" className="text-accent hover:underline">
                    Start investing
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
