"use client";

import { useState } from "react";
import {
  Clock,
  X,
  Check,
  Copy,
  Briefcase,
  Wrench,
  Stethoscope,
  Building,
  Layers,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playPop, playSuccess } from "@/utils/sfx";

export function CadenceTemplatesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<"contractors" | "agencies" | "medical" | "b2b">("contractors");
  const [copied, setCopied] = useState(false);

  const cadences = {
    contractors: {
      name: "Contractors & Field Services",
      icon: Wrench,
      description: "Direct, milestone-based reminders designed for sub-contractors, construction, HVAC, electrical, and commercial trades.",
      steps: [
        { day: "Day -3", title: "Job Completion & Statement Heads-Up", tone: "Courteous", summary: "Confirms work was completed and attaches the statement before due date." },
        { day: "Day +2", title: "Payment Routing Inquest", tone: "Direct", summary: "Checks if remittance has been scheduled or if pay app approval is pending." },
        { day: "Day +8", title: "Formal Past-Due Notice", tone: "Firm", summary: "Explicit deadline with direct online payment link and billing manager contact." },
        { day: "Day +16", title: "Final Grace Period / Job Account Review", tone: "Urgent", summary: "Notifies debtor that account is flagged for review before service/liens hold." },
      ],
    },
    agencies: {
      name: "Agencies & Consultancies",
      icon: Briefcase,
      description: "Relationship-first gentle nudges for creative studios, software consultancies, and marketing retainers.",
      steps: [
        { day: "Day -2", title: "Upcoming Retainer Invoice Notice", tone: "Friendly", summary: "Gentle reminder with PDF attachment for easy forwarding to accounts payable." },
        { day: "Day +3", title: "Quick Check-in & Resend", tone: "Polite", summary: "Friendly note asking if anything is needed from the account team to process." },
        { day: "Day +9", title: "Accounting Department Touchpoint", tone: "Professional", summary: "Direct inquiry on batch payment cycle date and remittance receipt." },
        { day: "Day +15", title: "Executive Leadership Touchpoint", tone: "Diplomatic", summary: "Warm leadership check-in before any pauses on current deliverables." },
      ],
    },
    medical: {
      name: "Medical & Dental Clinics",
      icon: Stethoscope,
      description: "Polite patient co-pay, deductible, and insurance balance resolution adhering to healthcare etiquette.",
      steps: [
        { day: "Day +5", title: "Post-Visit Balance Statement", tone: "Gentle", summary: "Itemized statement with simple 1-click credit card payment link." },
        { day: "Day +14", title: "Courtesy Account Follow-Up", tone: "Courteous", summary: "Polite check-in inquiring if insurance adjustments or flex plans are needed." },
        { day: "Day +24", title: "Patient Ledger Final Courtesy Notice", tone: "Professional", summary: "Reminds patient to settle outstanding co-pay before administrative closure." },
      ],
    },
    b2b: {
      name: "High-Ticket B2B & SaaS",
      icon: Building,
      description: "Enterprise Net-30 follow-up framework tailored for corporate finance teams and enterprise software.",
      steps: [
        { day: "Day -5", title: "Scheduled Remittance Inquest", tone: "Professional", summary: "Verifies PO number matching and AP voucher queuing." },
        { day: "Day +1", title: "Due Date Reminder & Statement", tone: "Direct", summary: "Remittance address confirmation with EFT / ACH banking details." },
        { day: "Day +7", title: "Escalation to Purchasing Contact", tone: "Firm", summary: "Cc's the internal champion who authorized the initial purchase order." },
        { day: "Day +14", title: "Account Credit Hold Warning", tone: "Formal", summary: "Formal finance notification prior to software license or SLA freeze." },
      ],
    },
  };

  const activeCadence = cadences[selectedIndustry];

  const handleCopySequence = () => {
    const text = `CADENCE: ${activeCadence.name}\n${activeCadence.description}\n\n` +
      activeCadence.steps.map((s) => `${s.day} [${s.tone}]: ${s.title}\n${s.summary}`).join("\n\n");
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
        <Layers className="w-4 h-4 text-purple-600" />
        <span>Industry Cadences</span>
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
                  <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      Industry Follow-Up Cadence Blueprints
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Tailor your 14-day recovery reminders to the client&apos;s exact commercial industry
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
                {/* Industry Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.keys(cadences) as Array<keyof typeof cadences>).map((key) => {
                    const c = cadences[key];
                    const Icon = c.icon;
                    const isSelected = selectedIndustry === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedIndustry(key)}
                        className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-1.5 ${
                          isSelected
                            ? "bg-purple-50 border-purple-600 ring-2 ring-purple-600/20 text-purple-950 font-bold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? "text-purple-600" : "text-slate-400"}`} />
                        <span className="text-xs font-bold leading-tight">{c.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Cadence Details Card */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">{activeCadence.name}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {activeCadence.description}
                    </p>
                  </div>

                  {/* Step Timeline */}
                  <div className="space-y-3 pt-2">
                    {activeCadence.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3.5"
                      >
                        <div className="w-16 flex-shrink-0 text-center">
                          <span className="inline-block px-2 py-1 rounded bg-slate-100 font-mono text-xs font-black text-slate-800">
                            {step.day}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h5 className="text-xs font-bold text-slate-900">{step.title}</h5>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                              {step.tone}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {step.summary}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
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
                <button
                  type="button"
                  onClick={handleCopySequence}
                  className="py-2.5 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition flex items-center gap-1.5 active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>Cadence Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Cadence Sequence</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
