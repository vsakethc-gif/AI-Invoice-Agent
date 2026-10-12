"use client";

import { useState } from "react";
import {
  Mail,
  X,
  Copy,
  Check,
  Send,
  Sparkles,
  TrendingUp,
  DollarSign,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playPop, playSuccess } from "@/utils/sfx";

interface WeeklyRoiSummaryModalProps {
  businessName?: string;
  ownerName?: string;
  totalRecovered?: number;
  paidCount?: number;
  outstandingAmount?: number;
  activeCount?: number;
}

export function WeeklyRoiSummaryModal({
  businessName = "Client Business LLC",
  ownerName = "Business Owner",
  totalRecovered = 8400,
  paidCount = 3,
  outstandingAmount = 14200,
  activeCount = 7,
}: WeeklyRoiSummaryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const subject = `Weekly Cash Recovery Update: $${totalRecovered.toLocaleString()} Collected for ${businessName}`;

  const body = `Hi ${ownerName},

Here is your weekly Accounts Receivable Recovery update for ${businessName}:

📊 WEEKLY PERFORMANCE HIGHLIGHTS:
• Cash Recovered & Settled: $${totalRecovered.toLocaleString()} (across ${paidCount} settled accounts)
• Current Active Invoices in Follow-Up: ${activeCount} accounts ($${outstandingAmount.toLocaleString()} pending)
• Outbound Communication Tone: Professional & Polite (zero customer friction)

All collected payments have cleared directly into your normal merchant/bank account.

🎯 UPCOMING WEEK FOCUS:
Our automated intelligent reminders will continue touching overdue accounts with scheduled grace periods and direct remittance links. Any customer responses or disputes remain routed directly to your billing desk.

You can view your live ledger anytime on your client portal.

Best regards,
Your Dedicated Cash Recovery Team
Managed via InvoiceNudge Agency Suite`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopied(true);
    playSuccess();
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <>
      <button
        onClick={() => {
          playPop();
          setIsOpen(true);
        }}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-300 shadow-xs text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 active:scale-95 transition"
      >
        <Mail className="w-4 h-4 text-emerald-600" />
        <span>Weekly Client Recap</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 my-auto flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      Weekly Client ROI Update Email
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Send a weekly proof-of-value summary to {ownerName} ({businessName})
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
              <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Email Subject Line
                  </label>
                  <div className="text-xs font-bold text-slate-900">{subject}</div>
                </div>

                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-wrap select-all">
                  {body}
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition"
                >
                  Close
                </button>
                <div className="flex items-center gap-2">
                  <a
                    href={mailtoLink}
                    className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-slate-600" />
                    <span>Open in Email App</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5 active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-200" />
                        <span>Email Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Email Text</span>
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
