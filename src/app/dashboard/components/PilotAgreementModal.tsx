"use client";

import { useState } from "react";
import {
  FileCheck,
  X,
  Printer,
  Copy,
  Check,
  Building2,
  ShieldCheck,
  Briefcase,
  DollarSign,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playPop, playSuccess } from "@/utils/sfx";

interface PilotAgreementModalProps {
  businessName?: string;
  ownerName?: string;
  replyToEmail?: string;
}

export function PilotAgreementModal({
  businessName = "Client Business LLC",
  ownerName = "Business Owner",
  replyToEmail = "billing@clientbusiness.com",
}: PilotAgreementModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [clientCompany, setClientCompany] = useState(businessName);
  const [clientSigner, setClientSigner] = useState(ownerName);
  const [agencyName, setAgencyName] = useState("InvoiceNudge Recovery Partner");
  const [feeType, setFeeType] = useState<"performance" | "retainer" | "hybrid">("hybrid");

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const getAgreementText = () => {
    let feeClause = "";
    if (feeType === "hybrid") {
      feeClause = `a) 14-Day Free Pilot: The Client pays $0.00 upfront for the initial fourteen (14) day recovery pilot period.\nb) Performance Success Fee: Agency shall earn a ten percent (10%) fee exclusively on past-due balances successfully collected and settled during the Pilot Period.\nc) Retainer Conversion: Following completion of the 14-day Pilot, Client may elect to continue ongoing managed AR recovery services at a standard monthly retainer of $1,500.00 USD per month.`;
    } else if (feeType === "performance") {
      feeClause = `a) Zero Upfront Cost: Client pays $0.00 upfront.\nb) Pure Performance Fee: Agency shall earn a twelve percent (12%) fee exclusively on past-due invoice balances successfully settled during the engagement. No recovery, no fee.`;
    } else {
      feeClause = `a) 14-Day Free Pilot: Zero upfront fee for the initial 14-day pilot.\nb) Monthly Retainer: Following the 14-day pilot, Client transitions to a flat managed service retainer of $2,000.00 USD per month for ongoing autonomous accounts receivable management.`;
    }

    return `14-DAY CASH RECOVERY PERFORMANCE PILOT & AUTHORIZATION AGREEMENT

Effective Date: ${todayFormatted}

PARTIES:
• Client Company: ${clientCompany} ("Client")
• Authorized Representative: ${clientSigner}
• Service Provider: ${agencyName} ("Agency")

1. PURPOSE & SCOPE OF ENGAGEMENT
The Client engages the Agency to provide autonomous and human-supervised Accounts Receivable follow-up, reminder outreach, and payment reconciliation services for designated outstanding and past-due invoices.

2. SERVICE STANDARDS & SAFETY GUARANTEES
a) Relationship Preservation: Agency shall utilize polite, professional, and compliant communications designed to preserve Client's goodwill and customer relationships.
b) Human Sign-Off Lock: By default, reminder communications generated during the Pilot require review and approval in the Client's verification queue prior to transmission.
c) Direct Payment Routing: All customer payments shall be made directly to Client's existing bank accounts, merchant processors, or payment portals. Agency never takes custody of Client customer funds.

3. COMPENSATION & TERMS
${feeClause}

4. AUTHORIZATION & INBOUND EMAIL ROUTING
Client hereby authorizes Agency to send written invoice reminders displaying Client's designated reply-to address (${replyToEmail}). Inbound customer replies and dispute communications shall be routed directly to Client for resolution.

5. CONFIDENTIALITY
Agency shall maintain strict confidentiality over all customer names, invoice balances, email addresses, and financial records provided by Client, utilizing enterprise encryption and secure databases.

ACCEPTED AND AGREED:

Client: ${clientCompany}
By: _______________________________
Name: ${clientSigner}
Title: Authorized Principal
Date: ${todayFormatted}

Agency: ${agencyName}
By: _______________________________
Title: Managing Partner
Date: ${todayFormatted}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getAgreementText());
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
        <FileCheck className="w-4 h-4 text-indigo-600" />
        <span>Pilot Agreement</span>
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
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white leading-tight">
                        14-Day Pilot Agreement Generator
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Contract Ready
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Generate a standardized, legal 1-page authorization contract for new pilot clients
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

              {/* Form & Contract Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
                {/* Configuration Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Client Company
                    </label>
                    <input
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white font-medium outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Client Principal Signer
                    </label>
                    <input
                      value={clientSigner}
                      onChange={(e) => setClientSigner(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white font-medium outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Your Agency Legal Name
                    </label>
                    <input
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white font-medium outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3 pt-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Pilot Fee & Retainer Structure
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFeeType("hybrid")}
                        className={`p-2.5 rounded-xl text-left border text-xs transition ${
                          feeType === "hybrid"
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-xs font-bold"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div>$0 Pilot + 10% Fee</div>
                        <div className={`text-[10px] mt-0.5 ${feeType === "hybrid" ? "text-indigo-200" : "text-slate-500"}`}>
                          Transitions to $1,500/mo retainer
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFeeType("performance")}
                        className={`p-2.5 rounded-xl text-left border text-xs transition ${
                          feeType === "performance"
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-xs font-bold"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div>Pure Performance (12%)</div>
                        <div className={`text-[10px] mt-0.5 ${feeType === "performance" ? "text-indigo-200" : "text-slate-500"}`}>
                          Zero monthly fees, strictly success
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFeeType("retainer")}
                        className={`p-2.5 rounded-xl text-left border text-xs transition ${
                          feeType === "retainer"
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-xs font-bold"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div>$0 Pilot &rarr; $2k Retainer</div>
                        <div className={`text-[10px] mt-0.5 ${feeType === "retainer" ? "text-indigo-200" : "text-slate-500"}`}>
                          Pure recurring retainership
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Printable Agreement Canvas */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-300 font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-wrap select-all shadow-inner max-h-96 overflow-y-auto">
                  {getAgreementText()}
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
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4 text-slate-600" />
                    <span>Print Agreement</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition flex items-center gap-1.5 active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Contract Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Agreement Text</span>
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
