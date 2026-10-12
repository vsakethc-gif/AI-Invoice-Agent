import { connection } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { SettingsForm } from "./SettingsForm";

export const instant = false;

import { cookies } from "next/headers";

export default async function SettingsPage() {
  await connection();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const cookieStore = await cookies();
  const activeId = cookieStore.get("active_business_id")?.value;

  let business = null;
  if (activeId) {
    const { data: b } = await supabase.from("businesses").select("*").eq("id", activeId).eq("user_id", user?.id).single();
    business = b;
  }
  if (!business && user?.id) {
    const { data: first } = await supabase.from("businesses").select("*").eq("user_id", user.id).order("created_at", { ascending: true }).limit(1).single();
    business = first;
  }

  return (
    <div className="max-w-3xl space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Settings</h2>
        <p className="text-base text-slate-500 mt-2">Configure your business profile, sending preferences, and compliance details.</p>
      </div>

      <SettingsForm business={business} />
    </div>
  );
}
