import { connection } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { AlertCircle, ArrowUpRight, DollarSign, Calendar, Mail } from "lucide-react";

export const instant = false;

export default async function NeedsAttentionPage() {
  await connection();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const cookieStore = await cookies();
  const activeId = cookieStore.get("active_business_id")?.value;

  let business = null;
  if (activeId) {
    const { data: b } = await supabase.from("businesses").select("*").eq("id", activeId).eq("user_id", user.id).single();
    business = b;
  }
  if (!business) {
    const { data: first } = await supabase.from("businesses").select("*").eq("user_id", user.id).order("created_at", { ascending: true }).limit(1).single();
    business = first;
  }

  const { data: attentionInvoices = [] } = await supabase
    .from("invoices")
    .select("*")
    .eq("business_id", business?.id)
    .or("needs_attention.eq.true,status.eq.disputed")
    .order("due_date", { ascending: false });

  const list = attentionInvoices || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Needs Attention</h2>
          <p className="text-sm text-slate-500">
            Invoices requiring human review for <span className="font-semibold text-slate-800">{business?.name || "Client"}</span> (disputes, partial payments, or completed follow-up schedules).
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-300 rounded-xl">
          {list.length} item(s) pending review
        </div>
      </div>

      {list.length === 0 ? (
        <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-2">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            ✓
          </div>
          <h4 className="text-base font-bold text-slate-800">All clear for {business?.name || "this client"}!</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No disputed invoices or sequence timeouts. The AI collection engine is handling the rest autonomously.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm divide-y divide-slate-100">
          {list.map((inv) => (
            <div key={inv.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-slate-900 px-2 py-0.5 bg-slate-100 rounded">
                    {inv.invoice_number}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    inv.status === "disputed" ? "bg-rose-100 text-rose-800 border border-rose-200" : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}>
                    {inv.status}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-800">
                  {inv.customer_name} <span className="text-xs text-slate-400 font-normal">({inv.customer_email})</span>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-3">
                  <span>Due: {inv.due_date}</span>
                  <span>Amount: ${Number(inv.amount).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="px-3.5 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl hover:bg-slate-50 text-slate-700 transition"
                >
                  View on Dashboard
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
