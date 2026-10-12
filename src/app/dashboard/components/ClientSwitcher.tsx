"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  ChevronDown,
  Plus,
  Check,
  Sparkles,
  X,
  Briefcase,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { switchActiveBusiness, createClientBusiness, type BusinessSummary } from "../business-actions";
import { playPop, playSuccess } from "@/utils/sfx";

interface ClientSwitcherProps {
  currentBusiness: BusinessSummary | null;
  businesses: BusinessSummary[];
}

export function ClientSwitcher({ currentBusiness, businesses }: ClientSwitcherProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [modalError, setModalError] = useState("");

  useEffect(() => {
    const handleOpen = () => setIsModalOpen(true);
    window.addEventListener("open-onboard-client", handleOpen);
    return () => window.removeEventListener("open-onboard-client", handleOpen);
  }, []);

  const handleSelect = (bizId: string) => {
    if (bizId === currentBusiness?.id) {
      setIsOpen(false);
      return;
    }
    playPop();
    setIsOpen(false);
    startTransition(async () => {
      document.cookie = `active_business_id=${bizId}; path=/; max-age=31536000; SameSite=Lax`;
      await switchActiveBusiness(bizId);
      playSuccess();
      window.location.reload();
    });
  };

  const handleCreateClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalError("");
    const formData = new FormData(e.currentTarget);
    playPop();

    startTransition(async () => {
      const res = await createClientBusiness(formData);
      if (res.error) {
        setModalError(res.error);
      } else {
        playSuccess();
        if (res.businessId) {
          document.cookie = `active_business_id=${res.businessId}; path=/; max-age=31536000; SameSite=Lax`;
        }
        setIsModalOpen(false);
        window.location.reload();
      }
    });
  };

  return (
    <>
      {/* Switcher Trigger & Dedicated Action */}
      <div className="relative px-3 pt-3 pb-3 border-b border-slate-800/80">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-left border border-slate-800/80 hover:border-slate-700 transition shadow-sm group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 text-indigo-400">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <span>Client Account</span>
                {businesses.length > 1 && (
                  <span className="px-1.5 py-0.2 bg-slate-800 text-[9px] text-slate-300 rounded font-mono">
                    {businesses.length}
                  </span>
                )}
              </div>
              <div className="text-xs font-bold text-white truncate tracking-tight">
                {currentBusiness?.name || "Select Client"}
              </div>
            </div>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dedicated Prominent Onboard Client Button in Sidebar */}
        <button
          onClick={() => {
            playPop();
            setIsModalOpen(true);
          }}
          className="w-full mt-2.5 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 border border-indigo-400/25 transition-all duration-150 active:scale-[0.98] group"
        >
          <div className="w-4 h-4 rounded-md bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>Onboard New Client</span>
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute left-3 right-3 top-full mt-1 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-40 overflow-hidden divide-y divide-slate-800/60"
              >
                {/* Client List */}
                <div className="max-h-56 overflow-y-auto py-1">
                  {businesses.map((biz) => {
                    const isSelected = biz.id === currentBusiness?.id;
                    return (
                      <button
                        key={biz.id}
                        onClick={() => handleSelect(biz.id)}
                        disabled={isPending}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition ${
                          isSelected
                            ? "bg-indigo-600/15 text-white font-semibold"
                            : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-indigo-400" : "bg-slate-600"}`} />
                          <div className="truncate">
                            <span className="block truncate">{biz.name}</span>
                            <span className="text-[10px] text-slate-500 truncate block">
                              {biz.owner_name}
                            </span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>

                {/* Add New Client CTA */}
                <div className="p-3 bg-slate-950/95 border-t border-slate-800/80">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition active:scale-95"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Onboard New Client</span>
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2 leading-tight">
                    Add another client company to your agency portal
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Onboard Client Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 my-auto flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">Onboard New Client</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Add a business to manage under your cash recovery agency</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateClient} className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-4 text-slate-900">
                {modalError && (
                  <div className="p-3.5 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200 font-medium">
                    {modalError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Client Business Name *
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="e.g. Acme Plumbing or Apex Design Studio"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Client Owner / Contact Person *
                  </label>
                  <input
                    name="owner_name"
                    required
                    placeholder="e.g. Michael Scott"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Reply-To Email Address *
                  </label>
                  <input
                    name="reply_to_email"
                    type="email"
                    required
                    placeholder="e.g. billing@acmeplumbing.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white text-slate-900"
                  />
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    When customers reply to AI follow-ups, their emails will go directly to this address.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Default Communication Tone
                  </label>
                  <select
                    name="default_tone"
                    defaultValue="Professional"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-slate-900"
                  >
                    <option value="Friendly">Friendly (Warm & gentle)</option>
                    <option value="Professional">Professional (Polite & direct)</option>
                    <option value="Firm">Firm (Clear urgency)</option>
                  </select>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition active:scale-95 disabled:opacity-50"
                  >
                    {isPending ? "Adding Client..." : "Create Client Account"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
