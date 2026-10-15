import { connection } from "next/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { QueueView, type QueueMessage } from "./QueueView";
import { activeModelLabel } from "@/lib/llm";

export const instant = false;

export default async function QueuePage() {
  await connection();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
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
  if (!business) {
    return (
      <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-3">
        <h4 className="text-base font-bold text-slate-800">No Client Business Found</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Please select or onboard a client business workspace to manage draft recovery emails.
        </p>
        <Link
          href="/dashboard/clients/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition shadow-sm"
        >
          + Onboard Client Workspace
        </Link>
      </div>
    );
  }

  // Drafts waiting for the owner (RLS guarantees only this business's rows come back)
  const { data: pending, error } = await supabase
    .from("messages")
    .select(
      "id, subject, body, step, tone, used_fallback, guardrail_flagged, violations, created_at, invoices!inner(id, business_id, invoice_number, customer_name, customer_email, amount, currency, due_date, status)"
    )
    .eq("status", "pending_approval")
    .eq("invoices.business_id", business.id)
    .order("created_at", { ascending: true });

  if (error) console.error("[queue] load error:", error.message);

  const { count: approvedCount } = await supabase
    .from("messages")
    .select("id, invoices!inner(business_id)", { count: "exact", head: true })
    .eq("invoices.business_id", business.id)
    .in("status", ["approved", "sent"]);

  return (
    <QueueView
      initialMessages={(pending ?? []) as unknown as QueueMessage[]}
      approvedCount={approvedCount ?? 0}
      sendMode={business.send_mode || "approval"}
      modelLabel={activeModelLabel()}
      loadError={error?.message ?? null}
    />
  );
}
