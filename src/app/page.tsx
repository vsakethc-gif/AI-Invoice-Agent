'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Zap, Clock, Mail, ShieldCheck, TrendingUp, Users, DollarSign, Award, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LandingPage() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#0ea5e9', '#3b82f6', '#10b981', '#6366f1']
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 font-sans selection:bg-indigo-200">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900 block leading-tight">InvoiceNudge</span>
              <span className="text-[9px] font-bold text-indigo-600 tracking-wider uppercase block">Agency A/R Suite</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 transition-colors">
              Operator Sign in
            </Link>
            <Link 
              href="/signup" 
              className="text-xs font-bold bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20 active:scale-95"
            >
              Start Free Pilot
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold mb-6 tracking-wide uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> Done-For-You Accounts Receivable
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 mb-6 leading-[1.1]">
              Recover Unpaid Invoices For Your Business. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Zero Awkward Calls.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed font-normal max-w-2xl mx-auto">
              We manage the follow-up process for busy businesses. Polite, autonomous, guardrail-protected emails that get your cash collected without damaging customer relationships.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link href="/signup">
                <button 
                  onClick={triggerConfetti}
                  className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-base shadow-lg shadow-indigo-600/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Request a 14-Day Free Sprint <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="#pricing">
                <button className="w-full sm:w-auto px-7 py-3.5 bg-white text-slate-800 border border-slate-300 rounded-xl font-bold text-base hover:bg-slate-50 transition active:scale-95 shadow-sm">
                  View Performance Pricing
                </button>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 14-Day Risk-Free Trial
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Software to Learn
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Keep 100% of Recovered Cash
              </span>
            </div>
          </motion.div>
        </div>

        {/* 3 Step Process: How It Works */}
        <div className="py-16 max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">The 3-Step No-Brainer Process</h2>
            <p className="text-sm text-slate-500 mt-2">How we recover thousands in uncollected revenue with zero effort on your part.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-black text-sm flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Send Your Overdue List</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Send us an export from QuickBooks, Stripe, or Excel. You don't need to log into or configure any software.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-black text-sm flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Autonomous Polite Follow-Ups</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our agent contacts clients in your company's name. Every email is verified by legal guardrails to protect your reputation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-black text-sm flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Cash Hits Your Account</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clients pay directly into your existing payment links. You receive weekly ROI progress reports showing every dollar collected.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section - Tailored for High-Ticket B2B & Free Pilots */}
        <div id="pricing" className="py-16 max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full">
            Partnership & Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 mb-2 tracking-tight">Simple, High-ROI Options</h2>
          <p className="text-sm text-slate-500 mb-12">Start with a 100% free pilot to see the cash recovery in action first.</p>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Free Trial Pilot Card */}
            <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full mb-4">
                  Step 1: Test Us First
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-1">14-Day Free Pilot</h3>
                <p className="text-xs text-slate-500 mb-6">Experience the recovered revenue before paying a single dollar.</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-slate-900">$0</span>
                  <span className="text-xs font-bold text-slate-400">/ 14 days</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Up to 10 overdue invoices processed</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Polite AI drafting under your company name</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Keep 100% of cash recovered</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>All we ask: A short review if you love the results</span>
                  </li>
                </ul>
              </div>

              <Link href="/signup">
                <button className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm">
                  Apply for Free Pilot
                </button>
              </Link>
            </div>

            {/* Managed Retainer / Performance */}
            <div className="bg-slate-950 text-white rounded-3xl border-2 border-indigo-600 p-8 shadow-xl relative flex flex-col justify-between">
              <div className="absolute -top-3.5 right-6 px-3 py-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-md">
                Most Popular
              </div>

              <div>
                <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-800 px-2.5 py-1 rounded-full mb-4">
                  Step 2: Ongoing Autopilot
                </div>
                <h3 className="text-2xl font-black text-white mb-1">Managed Recovery</h3>
                <p className="text-xs text-slate-400 mb-6">Full Done-For-You accounts receivable management year-round.</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-white">$950</span>
                  <span className="text-xs font-bold text-slate-400">/mo or 10% performance</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>Unlimited invoices & automated schedule</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>Custom tone & grace period controls</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>Inbound reply handling & dispute isolation</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>Weekly ROI performance reports</span>
                  </li>
                </ul>
              </div>

              <Link href="/signup">
                <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-indigo-600/30">
                  Book Intro Call / Onboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span>InvoiceNudge — Managed Accounts Receivable</span>
          </div>
          <p>© 2026 InvoiceNudge. Done-For-You Business Cash Recovery.</p>
        </div>
      </footer>
    </div>
  );
}
