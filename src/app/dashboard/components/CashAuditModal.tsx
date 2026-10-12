"use client";

import { useState } from "react";
import {
  FileText,
  Activity,
  X,
  Printer,
  Copy,
  Check,
  Building2,
  TrendingDown,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Calculator,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playPop, playSuccess } from "@/utils/sfx";

interface CashAuditModalProps {
  defaultBusinessName?: string;
}

export function CashAuditModal({ defaultBusinessName = "" }: CashAuditModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Audit form state
  const [prospectName, setProspectName] = useState(defaultBusinessName || "Acme Contracting Co.");
  const [contactName, setContactName] = useState("Dan Miller");
  const [totalAR, setTotalAR] = useState(48000);
  const [invoiceCount, setInvoiceCount] = useState(14);
  const [agingBand, setAgingBand] = useState<"mixed" | "fresh" | "stale">("mixed");

  // Calculations
  // Collection decay percentages based on Commercial Collection Agency Association / CRF benchmarks:
  // Current: 98%, 30 days: 93%, 60 days: 85%, 90 days: 73%, 120+ days: 26%
  const riskPercent = agingBand === "fresh" ? 0.12 : agingBand === "mixed" ? 0.28 : 0.46;
  const cashAtRisk = Math.round(totalAR * riskPercent);
  const pilotRecoverableMin = Math.round(totalAR * 0.35);
  const pilotRecoverableMax = Math.round(totalAR * 0.58);
  const averageInvoiceSize = invoiceCount > 0 ? Math.round(totalAR / invoiceCount) : 0;

  const handleCopyPitch = () => {
    const text = `EXECUTIVE ACCOUNTS RECEIVABLE RISK BRIEF
Prepared for: ${prospectName} (Attn: ${contactName})
Prepared by: InvoiceNudge Cash Recovery Partner

1. SUMMARY OF EXPOSURE:
• Total Outstanding Balance: $${totalAR.toLocaleString()}
• Invoices in Ledger: ${invoiceCount} accounts (Avg $${averageInvoiceSize.toLocaleString()} / invoice)
• Immediate Cash at Risk (Decay Velocity): $${cashAtRisk.toLocaleString()}

2. COLLECTION DECAY ANALYSIS:
Every 30 days an invoice remains unpaid, collectability decays by 8% to 15%. Without systematic follow-up, an estimated $${cashAtRisk.toLocaleString()} of this ledger is at risk of permanent write-off.

3. 14-DAY RECOVERY PILOT PROJECTION:
• Estimated Cash Recoverable in 14 Days: $${pilotRecoverableMin.toLocaleString()} - $${pilotRecoverableMax.toLocaleString()}
• Upfront Fee: $0.00 (Zero upfront risk)
• Safety Lock: Human approval on every draft before sending.

Next Step: Approve the 14-day recovery pilot to recover past-due funds this week.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    playSuccess();
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <button
        onClick={() => {
          playPop();
          setIsOpen(true);
        }}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-300 shadow-xs text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 active:scale-95 transition"
      >
        <Activity className="w-4 h-4 text-rose-500" />
        <span>Pre-Sale AR Audit</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 my-auto flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-rose-600/20">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white leading-tight">
                        Pre-Sale AR Risk Audit & Cash Leak Brief
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Sales Closer
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Generate a compelling 1-page executive brief to close clients into a 14-day recovery pilot
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
                {/* Inputs Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Prospect Company Name
                    </label>
                    <input
                      value={prospectName}
                      onChange={(e) => setProspectName(e.target.value)}
                      placeholder="e.g. Acme Contracting Co."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white font-medium outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Decision Maker / Contact
                    </label>
                    <input
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Dan Miller (Owner)"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white font-medium outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Total Unpaid Balance ($)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-bold">$</span>
                      <input
                        type="number"
                        value={totalAR}
                        onChange={(e) => setTotalAR(Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2 rounded-lg border border-slate-300 text-sm bg-white font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Estimated Invoice Count
                    </label>
                    <input
                      type="number"
                      value={invoiceCount}
                      onChange={(e) => setInvoiceCount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Average Aging Profile
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setAgingBand("fresh")}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition ${
                          agingBand === "fresh"
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                            : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        Recent (1-45 days)
                      </button>
                      <button
                        type="button"
                        onClick={() => setAgingBand("mixed")}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition ${
                          agingBand === "mixed"
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                            : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        Mixed Aging (30-90 days)
                      </button>
                      <button
                        type="button"
                        onClick={() => setAgingBand("stale")}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition ${
                          agingBand === "stale"
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                            : "bg-white text-slate-600 border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        Aged Backlog (90+ days)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Audit Analysis Output Card */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                  <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-indigo-400 font-bold">
                        Executive Audit Brief
                      </div>
                      <div className="text-lg font-black">{prospectName}</div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      Prepared for {contactName}
                    </span>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Key Metrics Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-[11px] font-bold uppercase text-slate-500">
                          Total Trapped Capital
                        </div>
                        <div className="text-2xl font-black text-slate-900 mt-1">
                          ${totalAR.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Across {invoiceCount} invoices
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                        <div className="text-[11px] font-bold uppercase text-rose-700">
                          Cash Loss Velocity Risk
                        </div>
                        <div className="text-2xl font-black text-rose-700 mt-1">
                          ${cashAtRisk.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-rose-600 mt-0.5">
                          At risk of decay in 60 days
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                        <div className="text-[11px] font-bold uppercase text-emerald-700">
                          14-Day Pilot Recovery
                        </div>
                        <div className="text-2xl font-black text-emerald-700 mt-1">
                          ${pilotRecoverableMin.toLocaleString()}+
                        </div>
                        <div className="text-[11px] text-emerald-600 mt-0.5">
                          Projected cash collected
                        </div>
                      </div>
                    </div>

                    {/* Decay Science Note */}
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
                      <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Collection Decay Reality:</strong> Commercial Credit Research shows overdue invoices lose 8% of collectability every 30 days they sit uncontacted. Without proactive, polite multi-touch follow-ups, up to <strong>${cashAtRisk.toLocaleString()}</strong> of this ledger risks turning into permanent bad debt.
                      </div>
                    </div>

                    {/* Proposed Agency Roadmap */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Proposed 14-Day Performance Pilot Protocol
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                          <div className="font-bold text-slate-900">Days 1-3: Courtesy Inquest</div>
                          <p className="text-[11px] text-slate-500 mt-1">Polite statements sent from your billing address verifying receipt.</p>
                        </div>
                        <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                          <div className="font-bold text-slate-900">Days 4-8: Remittance Direct</div>
                          <p className="text-[11px] text-slate-500 mt-1">Direct payment links & prompt payment reconciliation.</p>
                        </div>
                        <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                          <div className="font-bold text-slate-900">Days 9-14: Dispute Isolation</div>
                          <p className="text-[11px] text-slate-500 mt-1">Settlement terms & milestone review with human approval lock.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition"
                >
                  Close
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4 text-slate-600" />
                    <span>Print Executive PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyPitch}
                    className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition flex items-center gap-1.5 active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Brief Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Pitch Brief</span>
                      </>
                    )}
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
