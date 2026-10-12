"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  Briefcase,
  Mail,
  MessageSquare,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { createClientBusiness } from "../../business-actions";
import { playPop, playSuccess } from "@/utils/sfx";

export default function NewClientPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    playPop();

    startTransition(async () => {
      const res = await createClientBusiness(formData);
      if (res.error) {
        setError(res.error);
      } else {
        playSuccess();
        if (res.businessId) {
          document.cookie = `active_business_id=${res.businessId}; path=/; max-age=31536000; SameSite=Lax`;
        }
        window.location.href = "/dashboard";
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8 space-y-6">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/clients"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Client List</span>
        </Link>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header Banner */}
        <div className="bg-slate-900 p-6 sm:p-8 text-white border-b border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/40">
                Agency Client Onboarding
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Onboard New Client Business
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Create a separate, isolated workspace for this client. You can immediately upload their outstanding invoices, set email tone guardrails, and start recovering unpaid cash under a 14-day free pilot.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200 font-semibold">
              {error}
            </div>
          )}

          {/* Business Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Client Business Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Building2 className="w-4 h-4" />
              </div>
              <input
                name="name"
                required
                placeholder="e.g. Acme Plumbing, Apex Design Studio, or Skyline Law"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white text-slate-900"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              The registered company name of your client. Appears in subject lines and invoice descriptions.
            </p>
          </div>

          {/* Owner / Contact Person */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Client Owner / Primary Contact <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Briefcase className="w-4 h-4" />
              </div>
              <input
                name="owner_name"
                required
                placeholder="e.g. Michael Scott, Dr. Sarah Johnson"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white text-slate-900"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Your main point of contact at the client business who signed off on the recovery pilot.
            </p>
          </div>

          {/* Reply-To Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Reply-To Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                name="reply_to_email"
                type="email"
                required
                placeholder="e.g. billing@acmeplumbing.com or accounts@apexdesign.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white text-slate-900"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Crucial: When debtors hit &quot;Reply&quot; on automated emails, replies will route directly to this address.
            </p>
          </div>

          {/* Default Tone */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Communication Tone & Grace Settings
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="border border-slate-200 hover:border-indigo-400 p-3.5 rounded-xl cursor-pointer transition flex flex-col justify-between space-y-1.5 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/40 has-[:checked]:ring-1 has-[:checked]:ring-indigo-600">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Friendly</span>
                  <input
                    type="radio"
                    name="default_tone"
                    value="Friendly"
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500">Warm, gentle reminders for client accounts you want to pamper.</p>
              </label>

              <label className="border border-slate-200 hover:border-indigo-400 p-3.5 rounded-xl cursor-pointer transition flex flex-col justify-between space-y-1.5 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/40 has-[:checked]:ring-1 has-[:checked]:ring-indigo-600">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Professional</span>
                  <input
                    type="radio"
                    name="default_tone"
                    value="Professional"
                    defaultChecked
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500">Polite, standard business follow-up. Recommended for most B2B clients.</p>
              </label>

              <label className="border border-slate-200 hover:border-indigo-400 p-3.5 rounded-xl cursor-pointer transition flex flex-col justify-between space-y-1.5 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/40 has-[:checked]:ring-1 has-[:checked]:ring-indigo-600">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Firm</span>
                  <input
                    type="radio"
                    name="default_tone"
                    value="Firm"
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500">Direct, concise, with explicit deadlines and immediate escalation cues.</p>
              </label>
            </div>
          </div>

          {/* Pilot Summary Box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
            <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">14-Day Pilot Safety Lock:</span> By default, all generated email drafts require your review in the Approval Queue before sending. You retain 100% control over every message sent on behalf of this client.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Link
              href="/dashboard/clients"
              className="py-3 px-5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isPending ? "Creating Client Account..." : "Create Client Account & Launch Workspace"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
