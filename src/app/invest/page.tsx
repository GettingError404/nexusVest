"use client";
import { useEffect, useState } from "react";
import { Stepper } from "@/components/Stepper";
import { connectWallet, sendInvestmentTx, Web3State } from "@/lib/web3";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import { recordInvestment, saveUserProfile } from "@/lib/firestore";
import { Loader2, Wallet, CheckCircle, AlertCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function InvestPageContent() {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState<number>(0);
  const [allocation, setAllocation] = useState<"standard" | "auto">("standard");
  const [web3State, setWeb3State] = useState<Web3State>({
    isConnected: false,
    provider: null,
    signer: null,
    address: null,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = getAuth(app);

  useEffect(() => {
    const amountParam = searchParams.get("amount");
    if (amountParam) {
      setAmount(Number(amountParam));
      // Simple alert as toast fallback since hook isn't fully set up in context
      // In a real scenario, use toast({ title: "..." })
      // For now, let's just use console or assume the UI shows the pre-filled amount clearly
    }
  }, [searchParams]);

  const steps = ["Amount", "Allocation", "Wallet", "Review"];

  const handleConnect = async () => {
    const state = await connectWallet();
    setWeb3State(state);
    if (state.isConnected) {
      if (auth.currentUser && state.address) {
        saveUserProfile({
          uid: auth.currentUser.uid,
          walletAddress: state.address,
        });
      }
      setStep(3);
    }
  };

  const handleInvest = async () => {
    if (!auth.currentUser) {
      alert("Please login first");
      return;
    }
    setIsProcessing(true);
    try {
      const txHash = await sendInvestmentTx(
        amount.toString(),
        web3State.signer,
      );
      await recordInvestment({
        uid: auth.currentUser.uid,
        walletAddress: web3State.address || "0xMOCK",
        amount,
        allocationType: allocation,
        txHash,
        status: "confirmed",
        createdAt: new Date(),
      });
      // Success
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
      alert("Transaction failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto py-20 px-4 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Start Investing</h1>
      <Stepper currentStep={step} steps={steps} />

      <div className="mt-12 p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl min-h-[400px] relative">
        {step === 0 && (
          <div className="flex flex-col items-center animate-fade-in">
            <label className="text-slate-400 font-medium mb-4">
              How much would you like to invest?
            </label>
            <div className="relative w-full max-w-sm mb-8">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl font-bold text-slate-500">
                $
              </span>
              <input
                type="number"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="0"
                className="w-full bg-transparent text-6xl font-bold text-white pl-12 focus:outline-none placeholder:text-slate-700"
                autoFocus
              />
            </div>

            <div className="flex gap-4 mb-12">
              {[100, 500, 1000].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className="px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 hover:border-accent transition-colors text-sm"
                >
                  ${val}
                </button>
              ))}
            </div>

            <button
              onClick={() => amount > 0 && setStep(1)}
              disabled={!amount}
              className="w-full max-w-xs py-4 rounded-xl bg-accent text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-all"
            >
              Continue
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold mb-6 text-center">
              Select Allocation Strategy
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div
                onClick={() => setAllocation("standard")}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${allocation === "standard" ? "border-accent bg-accent/5 ring-1 ring-accent" : "border-white/10 hover:border-white/20"}`}
              >
                <h4 className="font-bold mb-2">Standard</h4>
                <p className="text-sm text-slate-400">
                  Equal weight distribution across the top 5 DeFi protocols.
                </p>
              </div>
              <div
                onClick={() => setAllocation("auto")}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${allocation === "auto" ? "border-accent bg-accent/5 ring-1 ring-accent" : "border-white/10 hover:border-white/20"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold">Auto-Balance</h4>
                  <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-slate-400">
                  Smart algorithm that adjusts positions based on risk-adjusted
                  returns.
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setStep(0)}
                className="text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3 rounded-xl bg-accent text-white font-bold hover:bg-blue-600 transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full animate-fade-in py-12">
            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6">
              <Wallet className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Connect Wallet</h3>
            <p className="text-slate-400 mb-8 text-center max-w-sm">
              Connect your MetaMask or Web3 wallet to fund this investment.
            </p>

            <button
              onClick={handleConnect}
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-orange-600/10 text-orange-500 border border-orange-600/20 hover:bg-orange-600/20 transition-all font-bold"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                className="w-6 h-6"
                alt="MetaMask"
              />
              Connect MetaMask
            </button>

            <button
              onClick={() => setStep(1)}
              className="mt-8 text-slate-400 hover:text-white text-sm"
            >
              Back
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">Review Investment</h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between p-4 rounded-xl bg-white/5">
                <span className="text-slate-400">Total Amount</span>
                <span className="font-bold text-xl">
                  {formatCurrency(amount)}
                </span>
              </div>
              <div className="flex justify-between p-4 rounded-xl bg-white/5">
                <span className="text-slate-400">Wallet</span>
                <span className="font-mono text-sm text-slate-300">
                  {web3State.address
                    ? `${web3State.address.slice(0, 6)}...`
                    : "Not Connected"}
                </span>
              </div>
              <div className="flex justify-between p-4 rounded-xl bg-white/5">
                <span className="text-slate-400">Allocation</span>
                <span className="capitalize text-white">{allocation}</span>
              </div>

              <div className="p-4 rounded-xl border border-white/5 mt-4">
                <h4 className="text-sm font-bold text-slate-400 mb-3">
                  Portfolio Preview
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center font-bold text-xs">
                      UNI
                    </div>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: allocation === "auto" ? "30%" : "20%" }}
                      />
                    </div>
                    <span>{allocation === "auto" ? "30%" : "20%"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded bg-purple-500 flex items-center justify-center font-bold text-xs">
                      AAVE
                    </div>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500"
                        style={{ width: allocation === "auto" ? "45%" : "20%" }}
                      />
                    </div>
                    <span>{allocation === "auto" ? "45%" : "20%"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center font-bold text-xs">
                      COMP
                    </div>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: allocation === "auto" ? "25%" : "20%" }}
                      />
                    </div>
                    <span>{allocation === "auto" ? "25%" : "20%"}</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex justify-between text-xs text-slate-400">
                    <span>Mgmt Fee: 0.5%</span>
                    <span>Slippage: &lt;0.1%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-xs text-slate-500">
                Est. Gas Fee: &lt;$0.01 (Optimism)
              </div>
              <button
                onClick={handleInvest}
                disabled={isProcessing}
                className="px-8 py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                Confirm Transaction
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function InvestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <InvestPageContent />
    </Suspense>
  );
}
