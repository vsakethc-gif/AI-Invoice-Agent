"use client";

import { useState } from "react";
import { FileText, Download, Sparkles, CheckCircle2, TrendingUp, DollarSign, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { playSuccess, playPop } from "@/utils/sfx";

interface ReportModalProps {
  businessName: string;
  totalRecovered: number;
  paidCount: number;
  overdueRemaining: number;
  overdueCount: number;
}

export function ClientReportModal({
  businessName,
  totalRecovered,
  paidCount,
  overdueRemaining,
  overdueCount,
}: ReportModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const fmt = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

  const handleOpen = () => {
    playPop();
    setIsOpen(true);
  };

  const handleCopyPitch = () => {
    playSuccess();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#10b981", "#3b82f6", "#6366f1"],
    });

    const summaryText = `Hi ${businessName} team,\n\nHere is your A/R Performance Summary from our AI Collection Sprint:\n\n• Cash Recovered: ${fmt(totalRecovered)} across ${paidCount} settled invoice(s)\n• Remaining Uncollected Balance: ${fmt(overdueRemaining)} across ${overdueCount} invoice(s)\n• Collection Success Rate: ${paidCount > 0 ? Math.round((totalRecovered / (totalRecovered + overdueRemaining || 1)) * 100) : 0}%\n\nOur autonomous agent kept 100% of communications professional and polite, protecting your customer relationships.\n\nLet us know if you'd like to put your accounts receivable on autopilot next month!`;

    navigator.clipboard.writeText(summaryText);
    alert("Client ROI Summary copied to clipboard! Paste it directly into your email or client update.");
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 border border-emerald-300 shadow-sm text-xs font-bold rounded-xl text-emerald-800 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-400 active:scale-95 transition duration-150"
        title="Generate proof-of-work report to send to your client"
      >
        <FileText className="w-4 h-4 text-emerald-600" />
        <span>Client ROI Report</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
            >
              {/* Header */}
              <div className="px-6 py-5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Client ROI Summary</h3>
                    <p className="text-xs text-slate-400">Proof-of-Value Report for {businessName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body Report Preview */}
              <div className="p-6 space-y-6">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Client Business</span>
                    <span className="text-sm font-bold text-slate-900">{businessName}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                      <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Cash Recovered</div>
                      <div className="text-2xl font-black text-emerald-950 mt-1">{fmt(totalRecovered)}</div>
                      <div className="text-[11px] text-emerald-700 mt-0.5">{paidCount} invoice(s) paid</div>
                    </div>

                    <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl">
                      <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Remaining Overdue</div>
                      <div className="text-2xl font-black text-slate-900 mt-1">{fmt(overdueRemaining)}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">{overdueCount} in active sequence</div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>
                      <strong>The Pitch:</strong> Show this proof-of-work to turn your free trial pilot into a <strong>$1,000–$2,500/mo</strong> retainer or 10% recovery commission!
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleCopyPitch}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Copy Client Update Text</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
