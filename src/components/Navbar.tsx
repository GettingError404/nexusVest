"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "@/lib/firebase";
import { saveUserProfile } from "@/lib/firestore";
import { cn } from "@/lib/utils";
import { connectWallet } from "@/lib/web3";
import {
  Shield,
  LayoutDashboard,
  LineChart,
  FileText,
  Map,
  Menu,
  X,
  Wallet,
  Rocket,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const auth = getAuth(app);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        await saveUserProfile({
          uid: result.user.uid,
          name: result.user.displayName || "User",
          email: result.user.email || "",
          createdAt: new Date(),
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleConnectWallet = async () => {
    const { address } = await connectWallet();
    if (address) {
      setWallet(address);
      if (user) {
        await saveUserProfile({ uid: user.uid, walletAddress: address });
      }
    }
  };

  const links = [
    { href: "/invest", label: "Invest", icon: LineChart },
    { href: "/startups", label: "Startups", icon: Rocket },
    { href: "/dashboard", label: "Portfolio", icon: LayoutDashboard },
    { href: "/governance", label: "Governance", icon: Shield },
    { href: "/roadmap", label: "Roadmap", icon: Map },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-primary/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-white"
        >
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">N</span>
          </div>
          Nexus Vest
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => {
            const isActive =
              pathname === l.href ||
              (l.href !== "/" && pathname?.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm font-medium transition-colors flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5",
                  isActive
                    ? "text-white bg-white/10 font-semibold"
                    : "text-slate-300 hover:text-white",
                )}
              >
                <l.icon
                  className={cn(
                    "w-4 h-4",
                    isActive ? "text-accent" : "opacity-70",
                  )}
                />
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Button
                onClick={handleConnectWallet}
                variant={wallet ? "outline" : "secondary"}
                className={cn(
                  "gap-2",
                  wallet
                    ? "border-green-500/30 text-green-400 bg-green-500/10 hover:bg-green-500/20"
                    : "",
                )}
              >
                {wallet ? (
                  <>
                    <Wallet className="w-4 h-4" />
                    {wallet.slice(0, 6)}...{wallet.slice(-4)}
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </Button>
              <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full border border-white/10"
                />
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="text-xs text-slate-400 hover:text-white h-auto py-1"
                >
                  Sign out
                </Button>
              </div>
            </>
          ) : (
            <Button
              onClick={handleLogin}
              className="bg-accent hover:bg-blue-600 shadow-lg shadow-blue-500/20"
            >
              Get Started
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-primary/95 backdrop-blur-xl p-4 flex flex-col gap-4">
          {links.map((l) => {
            const isActive =
              pathname === l.href ||
              (l.href !== "/" && pathname?.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-accent/10 text-white font-semibold border border-accent/20"
                    : "hover:bg-white/5 text-slate-300",
                )}
              >
                <l.icon
                  className={cn("w-5 h-5", isActive ? "text-accent" : "")}
                />
                {l.label}
              </Link>
            );
          })}
          <div className="h-px bg-white/10 my-2" />
          {user ? (
            <div className="flex flex-col gap-3">
              <button
                onClick={handleConnectWallet}
                className="flex items-center gap-2 text-slate-300"
              >
                <Wallet className="w-5 h-5" />
                {wallet ? "Connected" : "Connect Wallet"}
              </button>
              <button onClick={handleLogout} className="text-left text-red-400">
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl bg-accent text-white font-bold"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
