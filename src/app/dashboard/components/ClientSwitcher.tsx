"use client";

import { useState, useTransition } from "react";
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

  const handleSelect = (bizId: string) => {
    if (bizId === currentBusiness?.id) {
      setIsOpen(false);
      return;
    }
    playPop();
    setIsOpen(false);
    startTransition(async () => {
      await switchActiveBusiness(bizId);
      playSuccess();
      router.refresh();
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
        setIsModalOpen(false);
        router.refresh();
      }
    });
  };

  return (
    <>
      {/* Switcher Trigger */}
      <div className="relative px-3 pt-3 pb-2 border-b border-slate-800/80">
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
                  <span className="px-1 py-0.2 bg-slate-800 text-[9px] text-slate-300 rounded font-mono">
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
                <div className="p-1.5 bg-slate-950/60">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Onboard New Client</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Onboard Client Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900"
            >
              {/* Header */}
              <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">Onboard New Client</h3>
                    <p className="text-xs text-slate-400">Add a business to manage under your agency</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateClient} className="p-6 space-y-4">
                {modalError && (
                  <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  >
                    <option value="Friendly">Friendly (Warm & gentle)</option>
                    <option value="Professional">Professional (Polite & direct)</option>
                    <option value="Firm">Firm (Clear urgency)</option>
                  </select>
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition active:scale-95 disabled:opacity-50"
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
