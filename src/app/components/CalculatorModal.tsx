"use client";

import { useState } from "react";
import { Calculator, DollarSign, TrendingUp, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export function CalculatorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [unpaidBalance, setUnpaidBalance] = useState<number>(35000);
  const [averageDaysLate, setAverageDaysLate] = useState<number>(45);

  // Recovery estimates based on A/R benchmarks:
  // Invoices 30-60 days late typically recover 65-80% with automated polite follow-ups
  const recoveryRate = averageDaysLate <= 30 ? 0.85 : averageDaysLate <= 60 ? 0.72 : 0.55;
  const estimatedRecovery = Math.round(unpaidBalance * recoveryRate);
  const humanClerkCost = 4500; // Average monthly cost of hiring an A/R clerk
  const ourManagedCost = 950;
  const savingsVsHuman = humanClerkCost - ourManagedCost;

  const fmt = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

  const handleCalculate = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#10b981", "#6366f1", "#3b82f6"],
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-sm transition active:scale-95 flex items-center justify-center gap-2"
      >
        <Calculator className="w-4 h-4 text-emerald-400" />
        <span>Calculate Your Cash Recovery</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Uncollected Revenue Calculator</h3>
                  <p className="text-xs text-slate-400">See how much found cash we can recover</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            {/* Inputs */}
            <div className="p-6 space-y-5">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Approximate Unpaid Invoices Amount:</span>
                  <span className="text-indigo-600 font-black text-sm">{fmt(unpaidBalance)}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="250000"
                  step="5000"
                  value={unpaidBalance}
                  onChange={(e) => {
                    setUnpaidBalance(Number(e.target.value));
                    handleCalculate();
                  }}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>$5,000</span>
                  <span>$100,000</span>
                  <span>$250,000+</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Average Days Overdue:</span>
                  <span className="text-indigo-600 font-black text-sm">{averageDaysLate} Days</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="5"
                  value={averageDaysLate}
                  onChange={(e) => setAverageDaysLate(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>15 Days (Fresh)</span>
                  <span>60 Days</span>
                  <span>120+ Days (Stale)</span>
                </div>
              </div>

              {/* Recovery Result Card */}
              <div className="p-5 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-300 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Estimated 14-Day Recovery
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-black">
                    {Math.round(recoveryRate * 100)}% Expected Yield
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-black text-emerald-950">
                  {fmt(estimatedRecovery)}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Money currently stuck in your accounts receivable that our autonomous engine can collect during your <strong>14-day free pilot</strong>.
                </p>

                <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between text-xs text-slate-700 font-medium">
                  <span>Savings vs. hiring a collection clerk:</span>
                  <strong className="text-emerald-700 font-bold">{fmt(savingsVsHuman)} / month</strong>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = "/signup";
                }}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/20 transition active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Claim Your Free 14-Day Recovery Sprint</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
