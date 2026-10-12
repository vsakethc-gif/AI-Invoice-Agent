"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
  Download,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

interface PortalInvoice {
  id: string;
  invoice_number: string;
  customer_name: string;
  amount: number;
  status: string;
  due_date: string;
  created_at: string;
}

interface ClientGuestPortalViewProps {
  business: {
    id: string;
    name: string;
    owner_name: string;
    reply_to_email: string;
  };
  invoices: PortalInvoice[];
}

export function ClientGuestPortalView({
  business,
  invoices,
}: ClientGuestPortalViewProps) {
  const [filter, setFilter] = useState<"all" | "paid" | "active">("all");

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);

  const stats = useMemo(() => {
    let recovered = 0;
    let paidCount = 0;
    let outstanding = 0;
    let overdueCount = 0;

    for (const inv of invoices) {
      const amt = Number(inv.amount || 0);
      if (inv.status === "paid") {
        recovered += amt;
        paidCount++;
      } else {
        outstanding += amt;
        if (inv.due_date < todayStr || inv.status === "overdue") {
          overdueCount++;
        }
      }
    }

    const total = recovered + outstanding;
    const recoveryRate = total > 0 ? Math.round((recovered / total) * 100) : 0;

    return {
      recovered,
      paidCount,
      outstanding,
      overdueCount,
      total,
      recoveryRate,
    };
  }, [invoices, todayStr]);

  const filteredInvoices = useMemo(() => {
    if (filter === "paid") return invoices.filter((i) => i.status === "paid");
    if (filter === "active") return invoices.filter((i) => i.status !== "paid");
    return invoices;
  }, [invoices, filter]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 antialiased">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-slate-900 tracking-tight">
                  {business.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Live Portal
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Managed Accounts Receivable & Cash Recovery Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Proof of Value Hero Card */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-indigo-900/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-900/50 px-3 py-1 rounded-full border border-indigo-700/50">
                  14-Day Pilot Recovery Status
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2">
                  ${stats.recovered.toLocaleString()} Recovered
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Automated intelligent follow-ups actively chasing unpaid balances on behalf of{" "}
                  <strong className="text-white">{business.name}</strong>. Zero aggressive tactics, 100% relationship-safe.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl text-center sm:text-right flex-shrink-0">
                <div className="text-xs font-semibold text-indigo-200 uppercase tracking-wider">
                  Recovery Success Rate
                </div>
                <div className="text-3xl font-black text-emerald-400 mt-1">
                  {stats.recoveryRate}%
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  {stats.paidCount} of {invoices.length} invoices settled
                </div>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-indigo-200 font-semibold">
                <span>Recovered: ${stats.recovered.toLocaleString()}</span>
                <span>Outstanding: ${stats.outstanding.toLocaleString()}</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                  style={{ width: `${Math.max(stats.recoveryRate, 4)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Cash Settled</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">
              ${stats.recovered.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {stats.paidCount} paid and closed accounts
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Active in Recovery</span>
              <Clock className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              ${stats.outstanding.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {invoices.length - stats.paidCount} accounts undergoing follow-up
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Safety & Guardrails</span>
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-slate-900">
              Human-Approved
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Every message reviewed prior to delivery
            </p>
          </div>
        </div>

        {/* Invoices Table Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Accounts Receivable Ledger
              </h2>
              <p className="text-xs text-slate-500">
                Live status of all tracked customer balances
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filter === "all"
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "hover:text-slate-900"
                }`}
              >
                All ({invoices.length})
              </button>
              <button
                onClick={() => setFilter("paid")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filter === "paid"
                    ? "bg-white text-emerald-700 shadow-xs font-bold"
                    : "hover:text-slate-900"
                }`}
              >
                Recovered ({stats.paidCount})
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filter === "active"
                    ? "bg-white text-indigo-700 shadow-xs font-bold"
                    : "hover:text-slate-900"
                }`}
              >
                Active ({invoices.length - stats.paidCount})
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Invoice #</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Due Date</th>
                  <th className="py-3.5 px-4">Recovery Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No invoices found under this view.
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => {
                    const isPaid = inv.status === "paid";
                    return (
                      <tr
                        key={inv.id}
                        className={isPaid ? "bg-emerald-50/20" : "hover:bg-slate-50/60"}
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {inv.invoice_number}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {inv.customer_name}
                        </td>
                        <td className="py-3.5 px-4 font-black text-slate-900">
                          ${Number(inv.amount).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {inv.due_date}
                        </td>
                        <td className="py-3.5 px-4">
                          {isPaid ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Paid & Recovered
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              Active Follow-Up
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Agency Partner Footer */}
        <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-800">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span>Managed by InvoiceNudge Certified Cash Recovery Agency</span>
          </div>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            Questions regarding these collections? Inbound customer replies are forwarded directly to{" "}
            <span className="font-semibold text-slate-700">{business.reply_to_email}</span>.
          </p>
        </div>
      </main>
    </div>
  );
}
