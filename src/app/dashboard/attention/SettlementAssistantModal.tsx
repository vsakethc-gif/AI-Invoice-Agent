"use client";

import { useState } from "react";
import {
  Sparkles,
  X,
  Copy,
  Check,
  Send,
  ShieldCheck,
  MessageSquare,
  DollarSign,
  Calendar,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playPop, playSuccess } from "@/utils/sfx";

interface SettlementAssistantModalProps {
  invoice: {
    id: string;
    invoice_number: string;
    customer_name: string;
    customer_email: string;
    amount: number;
    status: string;
    due_date: string;
  };
  businessName?: string;
  replyToEmail?: string;
}

export function SettlementAssistantModal({
  invoice,
  businessName = "Your Business",
  replyToEmail = "billing@company.com",
}: SettlementAssistantModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [objectionType, setObjectionType] = useState<"cashflow" | "dispute" | "lost" | "extension">("cashflow");

  const amountHalf = Math.round(invoice.amount / 2);

  const plans = {
    cashflow: [
      {
        title: "50/50 Bridge Payment Plan (Recommended)",
        tag: "Highest Conversion",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        subject: `Payment Plan Option: Invoice #${invoice.invoice_number} for ${invoice.customer_name}`,
        body: `Hi ${invoice.customer_name},

Thank you for being candid regarding current cash flow. We want to work with you to keep your account in good standing without adding financial stress.

We can split invoice #${invoice.invoice_number} ($${Number(invoice.amount).toLocaleString()}) into two equal installments:
• Installment 1: $${amountHalf.toLocaleString()} due within 3 business days
• Installment 2: $${amountHalf.toLocaleString()} due in 14 days

If this helps resolve the balance, please reply "AGREED" and we will send the payment link for Part 1 immediately.

Best regards,
Billing Operations on behalf of ${businessName}
${replyToEmail}`,
      },
      {
        title: "7-Day Clean Settlement (Prompt Close)",
        tag: "Quick Cash Close",
        badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
        subject: `Balance Resolution: Invoice #${invoice.invoice_number} (${businessName})`,
        body: `Hi ${invoice.customer_name},

We understand timing can be tight. To help close out invoice #${invoice.invoice_number} ($${Number(invoice.amount).toLocaleString()}) without any interest or late charges, we can authorize a 7-day grace window.

If you can clear the balance by next Friday, all late record notes will be removed and your account marked paid in full.

Please confirm if this schedule works for your accounting team.

Warm regards,
Accounts Department for ${businessName}`,
      },
    ],
    dispute: [
      {
        title: "Deliverable Review & Verification Inquest",
        tag: "Relationship Preserving",
        badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
        subject: `Regarding your notes on Invoice #${invoice.invoice_number} - ${businessName}`,
        body: `Hi ${invoice.customer_name},

We take your feedback seriously and want to ensure you are 100% satisfied with the deliverables for invoice #${invoice.invoice_number}.

We have paused all automatic reminders while we review the specific milestones in question. Could you reply with the exact details or discrepancies you noticed so we can reconcile them with our team?

If a quick 10-minute call with our project manager is easier, please let us know your availability today or tomorrow.

Best regards,
Client Relations for ${businessName}`,
      },
    ],
    lost: [
      {
        title: "Immediate Copy Resend + Direct Payment Link",
        tag: "Frictionless",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
        subject: `Invoice Copy Attached: #${invoice.invoice_number} ($${Number(invoice.amount).toLocaleString()})`,
        body: `Hi ${invoice.customer_name},

No problem at all! Invoices can easily get caught in spam or filters.

Here are the details for invoice #${invoice.invoice_number}:
• Original Due Date: ${invoice.due_date}
• Total Amount: $${Number(invoice.amount).toLocaleString()}

Please let us know once this has been forwarded to your accounts payable queue for processing this week.

Thank you,
Billing Operations for ${businessName}`,
      },
    ],
    extension: [
      {
        title: "Formal 14-Day Payment Commitment",
        tag: "Structured Extension",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
        subject: `Extension Request Approved: Invoice #${invoice.invoice_number}`,
        body: `Hi ${invoice.customer_name},

We are happy to accommodate your request for a brief extension on invoice #${invoice.invoice_number} ($${Number(invoice.amount).toLocaleString()}).

We have officially locked your new remittance commitment date for 14 days from today. Automated notifications are paused until that date.

Please confirm that your finance department has queued payment for that day.

Best regards,
Accounting for ${businessName}`,
      },
    ],
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    playSuccess();
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const currentPlans = plans[objectionType] || plans.cashflow;

  return (
    <>
      <button
        onClick={() => {
          playPop();
          setIsOpen(true);
        }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition active:scale-95"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>AI Settlement Assistant</span>
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
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      AI Negotiation & Settlement Assistant
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Generate relationship-safe settlement offers for {invoice.customer_name} (${Number(invoice.amount).toLocaleString()})
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
                {/* Invoice Quick Summary Bar */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400">Invoice:</span>{" "}
                    <strong className="text-slate-900 font-mono">#{invoice.invoice_number}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Customer:</span>{" "}
                    <strong className="text-slate-900">{invoice.customer_name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Balance:</span>{" "}
                    <strong className="text-indigo-600 font-black">${Number(invoice.amount).toLocaleString()}</strong>
                  </div>
                </div>

                {/* Objection Type Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Customer Objection / Response Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setObjectionType("cashflow")}
                      className={`p-2.5 rounded-xl text-center text-xs font-bold border transition ${
                        objectionType === "cashflow"
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Cash Flow Tight
                    </button>
                    <button
                      type="button"
                      onClick={() => setObjectionType("dispute")}
                      className={`p-2.5 rounded-xl text-center text-xs font-bold border transition ${
                        objectionType === "dispute"
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Quality Dispute
                    </button>
                    <button
                      type="button"
                      onClick={() => setObjectionType("lost")}
                      className={`p-2.5 rounded-xl text-center text-xs font-bold border transition ${
                        objectionType === "lost"
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Lost Invoice
                    </button>
                    <button
                      type="button"
                      onClick={() => setObjectionType("extension")}
                      className={`p-2.5 rounded-xl text-center text-xs font-bold border transition ${
                        objectionType === "extension"
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Need More Time
                    </button>
                  </div>
                </div>

                {/* Generated Settlement Plans */}
                <div className="space-y-4">
                  {currentPlans.map((plan, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white"
                    >
                      <div className="bg-slate-50 p-3.5 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{plan.title}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${plan.badgeColor}`}>
                            {plan.tag}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(`Subject: ${plan.subject}\n\n${plan.body}`, idx)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Draft</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="text-[11px] text-slate-500 font-semibold">
                          Subject: <span className="text-slate-900">{plan.subject}</span>
                        </div>
                        <div className="p-3 bg-slate-50/70 rounded-lg font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-wrap select-all">
                          {plan.body}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="py-2 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition"
                >
                  Close
                </button>
                <p className="text-[11px] text-slate-500">
                  Copy draft to email customer directly from client&apos;s billing address
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
