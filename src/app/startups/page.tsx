"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Startup, startups } from "@/lib/startups";
import { StartupCard } from "@/components/StartupCard";
import { StartupModal } from "@/components/StartupModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "AI",
  "FinTech",
  "Health",
  "Climate",
  "Web3",
  "Robotics",
];
const SORTS = ["Trending", "Newest", "Highest Growth"];

export default function StartupsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Trending");
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredStartups = useMemo(() => {
    let result = [...startups];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q),
      );
    }

    // Category
    if (selectedCategory !== "All") {
      result = result.filter((s) => s.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "Trending") return b.trendingScore - a.trendingScore;
      if (sortBy === "Newest")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortBy === "Highest Growth")
        return b.projectedROI.to - a.projectedROI.to;
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleInvest = (startup: Startup) => {
    // Show toast is tricky without useToast fully set up, but we'll try to use standard browser APIs or custom if needed.
    // Assuming UI/toast not available, user asked for navigation.
    router.push(`/invest?amount=${startup.minEntry}&startup=${startup.id}`);
  };

  const handleOpenDetails = (startup: Startup) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-accent/30">
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Curated Weekly
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Featured Startups
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Discover early-stage companies you can invest in with just $100.
            Backed by top VCs, accessible to you.
          </p>
        </div>

        {/* Filters */}
        <div className="sticky top-20 z-40 bg-slate-950/80 backdrop-blur-xl border-y border-white/5 py-4 mb-10 -mx-4 px-4 md:mx-0 md:rounded-2xl md:border md:px-6 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-accent transition-colors" />
              <input
                type="text"
                placeholder="Search startups..."
                className="w-full h-10 bg-slate-900 border border-white/10 rounded-lg pl-10 pr-4 text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-slate-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Badges - Scrollable on mobile */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
                    selectedCategory === cat
                      ? "bg-white text-slate-900 border-white shadow-lg shadow-white/10"
                      : "bg-transparent text-slate-400 border-white/10 hover:border-white/30 hover:text-white",
                  )}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative shrink-0 hidden md:block">
              <select
                className="h-10 pl-3 pr-8 rounded-lg bg-slate-900 border border-white/10 text-sm text-slate-300 focus:outline-none focus:border-white/30 appearance-none cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {SORTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? // Skeletons
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[420px] rounded-2xl bg-slate-900/50 border border-white/5 animate-pulse overflow-hidden"
                >
                  <div className="h-40 bg-slate-800/50" />
                  <div className="p-6 space-y-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-800" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-3/4 bg-slate-800 rounded" />
                        <div className="h-3 w-1/2 bg-slate-800 rounded" />
                      </div>
                    </div>
                    <div className="h-20 bg-slate-800/30 rounded" />
                    <div className="flex gap-2">
                      <div className="h-10 w-1/2 bg-slate-800 rounded" />
                      <div className="h-10 w-1/2 bg-slate-800 rounded" />
                    </div>
                  </div>
                </div>
              ))
            : filteredStartups.map((startup) => (
                <StartupCard
                  key={startup.id}
                  startup={startup}
                  onViewDetails={handleOpenDetails}
                  onInvest={handleInvest}
                />
              ))}
        </div>

        {!isLoading && filteredStartups.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Search className="w-6 h-6 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No startups found
            </h3>
            <p className="text-slate-400">
              Try adjusting your filters or search query.
            </p>
            <Button
              variant="link"
              className="mt-4 text-accent"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </main>

      <StartupModal
        startup={selectedStartup}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInvest={(s) => {
          setIsModalOpen(false);
          handleInvest(s);
        }}
      />
    </div>
  );
}
