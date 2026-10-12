"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Briefcase,
  Users,
  Mail,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { switchActiveBusiness, type BusinessSummary } from "../business-actions";
import { playPop, playSuccess } from "@/utils/sfx";

interface ClientsViewProps {
  businesses: BusinessSummary[];
  activeBusinessId?: string;
}

export function ClientsView({ businesses, activeBusinessId }: ClientsViewProps) {
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (bizId: string) => {
    if (bizId === activeBusinessId) return;
    playPop();
    startTransition(async () => {
      document.cookie = `active_business_id=${bizId}; path=/; max-age=31536000; SameSite=Lax`;
      await switchActiveBusiness(bizId);
      playSuccess();
      window.location.href = "/dashboard";
    });
  };

  const handleOpenOnboardModal = () => {
    playPop();
    window.dispatchEvent(new CustomEvent("open-onboard-client"));
  };

  const totalRecoveredAcrossAll = businesses.reduce(
    (sum, b) => sum + Number(b.total_recovered || 0),
    0
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Client Accounts & Workspaces
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
              Agency Suite
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Manage your B2B cash recovery clients, active 14-day pilots, and performance retainers.
          </p>
        </div>

        {/* Primary Action Button */}
        <div>
          <Link
            href="/dashboard/clients/new"
            onClick={() => playPop()}
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/30 active:scale-95 transition-all duration-150"
          >
            <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center text-white">
              <Plus className="w-4 h-4 stroke-[3]" />
            </div>
            <span>Onboard New Client</span>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Client Accounts</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-950">{businesses.length}</div>
          <p className="text-xs text-slate-500 mt-1">Separate isolated workspaces</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Recovery Pilots</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600">{businesses.length} Active</div>
          <p className="text-xs text-slate-500 mt-1">14-Day Free Trial / Proof-of-Value</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Cash Recovered</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-950">
            ${totalRecoveredAcrossAll.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 mt-1">Across all managed client portfolios</p>
        </div>
      </div>

      {/* Client List Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Client Businesses ({businesses.length})
          </h2>
          <span className="text-xs text-slate-500">
            Click &quot;Switch Workspace&quot; to manage invoices and automated follow-ups
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {businesses.map((biz) => {
            const isActive = biz.id === activeBusinessId;
            return (
              <motion.div
                key={biz.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                className={`p-6 rounded-2xl border transition shadow-sm flex flex-col justify-between ${
                  isActive
                    ? "bg-white border-indigo-500 ring-2 ring-indigo-500/20"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                        Current Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        14-Day Pilot
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-950 tracking-tight leading-snug">
                    {biz.name}
                  </h3>

                  <div className="space-y-1.5 mt-3 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>{biz.owner_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{biz.reply_to_email}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  {isActive ? (
                    <button
                      disabled
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-500 text-xs font-bold cursor-default flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                      <span>Active Workspace</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSwitch(biz.id)}
                      disabled={isPending}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <span>Switch to this Client</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Dotted Onboard New Client Card */}
          <Link
            href="/dashboard/clients/new"
            onClick={() => playPop()}
            className="p-6 rounded-2xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/30 hover:bg-indigo-50/60 transition group flex flex-col items-center justify-center text-center gap-3 min-h-[220px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                + Onboard New Client
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Launch an automated 14-day cash recovery pilot for another business
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
