"use client";

import { useState } from "react";
import { MessageSquare, Copy, Check, Sparkles, X, Send, PhoneCall, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { playSuccess, playPop } from "@/utils/sfx";

interface Template {
  id: string;
  category: "Cold Outreach" | "Post-Trial Pitch" | "Overcoming Objections";
  title: string;
  description: string;
  script: string;
}

const TEMPLATES: Template[] = [
  {
    id: "cold-outreach",
    category: "Cold Outreach",
    title: "The 'Found Cash' No-Brainer Email / LinkedIn",
    description: "Send to owners or CFOs of service businesses, contractors, or agencies.",
    script: `Hi [First Name],

Quick question — do you currently have at least $15,000 in unpaid or overdue invoices sitting around in QuickBooks/Stripe?

I run an AI-powered accounts receivable agency. We run a 14-day collection sprint for businesses where we chase your unpaid invoices with polite, guardrail-protected emails from your own domain.

Zero awkward phone calls, and zero aggressive language that damages relationships.

We'd love to run a 14-day sprint on your 5–10 oldest invoices completely free. If we don't recover any cash, you pay nothing. If we do recover your money, you keep 100% of it. All we ask in return is a 2-minute review if you love the results.

Do you have 5 minutes this Thursday to see how it works?

Best,
[Your Name]`,
  },
  {
    id: "post-trial",
    category: "Post-Trial Pitch",
    title: "Closing the $1,000–$2,500/mo Retainer After Free Pilot",
    description: "Send this right after you recover their first few thousand dollars.",
    script: `Hi [First Name],

Great news — our 14-day collection sprint just recovered [Insert Amount, e.g. $8,450] across [Number] of your overdue invoices! That cash has already cleared into your account.

Now that we've proven the engine works without creating any customer complaints, we'd love to put your entire accounts receivable on autopilot moving forward.

We have two simple options:
1. Flat Retainer: $1,250/month (unlimited follow-ups on all invoices all year long).
2. Performance Partner: $500/month + 10% of recovered cash.

Either option saves you from hiring a $4,500/mo full-time accounts receivable clerk.

Can we set up your recurring schedule starting next week?

Best,
[Your Name]`,
  },
  {
    id: "objection-reputation",
    category: "Overcoming Objections",
    title: "When They Say: 'I Don't Want to Annoy My Clients'",
    description: "Use when they are scared of automated follow-ups sounding aggressive.",
    script: `I completely understand, [First Name], and that’s actually our biggest differentiator. 

Most collection agencies sound aggressive and ruin client relationships. Our system is the exact opposite:

1. Every email starts warm and helpful (checking if they need another copy of the invoice or payment link).
2. Hard legal guardrails block any threats, harassment, or collection agency language.
3. If the client replies saying they already paid or need until next Friday, our AI instantly pauses reminders and flags it for human review.

You have full approval control before anything sends, so you’re always in the driver's seat.`,
  },
];

export function SalesCheatSheetModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (t: Template) => {
    playSuccess();
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 },
    });
    navigator.clipboard.writeText(t.script);
    setCopiedId(t.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <>
      <button
        onClick={() => {
          playPop();
          setIsOpen(true);
        }}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 border border-indigo-300 shadow-sm text-xs font-bold rounded-xl text-indigo-900 bg-indigo-50 hover:bg-indigo-100 active:scale-95 transition duration-150"
      >
        <MessageSquare className="w-4 h-4 text-indigo-600" />
        <span>Sales & Pitch Scripts</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 max-h-[85vh] flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">High-Ticket Client Acquisition Scripts</h3>
                    <p className="text-xs text-slate-400">Battle-tested templates to land free pilots & close retainers</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content List */}
              <div className="p-6 overflow-y-auto space-y-6">
                {TEMPLATES.map((t) => (
                  <div key={t.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-full">
                          {t.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">{t.title}</h4>
                      </div>
                      <button
                        onClick={() => handleCopy(t)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-xs font-bold rounded-xl text-slate-800 shadow-sm transition active:scale-95"
                      >
                        {copiedId === t.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            <span>Copy Script</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-slate-500">{t.description}</p>

                    <pre className="p-4 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed select-all">
                      {t.script}
                    </pre>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end flex-shrink-0">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
