import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LineChart,
  LayoutDashboard,
  Shield,
  Map,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

export function Sidebar() {
  const links = [
    { href: "/invest", label: "Invest", icon: LineChart },
    { href: "/dashboard", label: "Portfolio", icon: LayoutDashboard },
    { href: "/governance", label: "Governance", icon: Shield },
    { href: "/roadmap", label: "Roadmap", icon: Map },
  ];

  return (
    <div className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-slate-900 border-r border-white/10 pt-20 pb-6 px-4">
      <div className="flex flex-col gap-2 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <link.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{link.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-auto border-t border-white/10 pt-4 flex flex-col gap-2">
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-left">
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-left">
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium text-sm">Help & Support</span>
        </button>
      </div>
    </div>
  );
}
