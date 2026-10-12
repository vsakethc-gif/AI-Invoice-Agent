"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface BusinessSummary {
  id: string;
  name: string;
  owner_name: string;
  reply_to_email: string;
  theme_color?: string;
  ui_density?: string;
  total_recovered?: number;
}

/**
 * Get the currently active business for the logged-in user.
 * Reads the `active_business_id` cookie, falling back to the first business.
 */
export async function getActiveBusiness(): Promise<BusinessSummary | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const cookieStore = await cookies();
  const activeId = cookieStore.get("active_business_id")?.value;

  if (activeId) {
    const { data: biz } = await supabase
      .from("businesses")
      .select("id, name, owner_name, reply_to_email, theme_color, ui_density, total_recovered")
      .eq("id", activeId)
      .eq("user_id", user.id)
      .single();
    if (biz) return biz;
  }

  // Fallback to first business
  const { data: first } = await supabase
    .from("businesses")
    .select("id, name, owner_name, reply_to_email, theme_color, ui_density, total_recovered")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  return first || null;
}

/**
 * Get all businesses owned by this agency/user account.
 */
export async function getAllUserBusinesses(): Promise<BusinessSummary[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: list } = await supabase
    .from("businesses")
    .select("id, name, owner_name, reply_to_email, theme_color, ui_density, total_recovered")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  return list || [];
}

/**
 * Switch active client business by setting the cookie.
 */
export async function switchActiveBusiness(businessId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Verify ownership
  const { data: biz } = await supabase
    .from("businesses")
    .select("id")
    .eq("id", businessId)
    .eq("user_id", user.id)
    .single();

  if (!biz) throw new Error("Client business not found");

  const cookieStore = await cookies();
  cookieStore.set("active_business_id", businessId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/invoices");
  revalidatePath("/dashboard/queue");
  revalidatePath("/dashboard/attention");
  revalidatePath("/dashboard/settings");

  return { success: true };
}

/**
 * Add a new client business to manage under this agency account.
 */
export async function createClientBusiness(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const ownerName = formData.get("owner_name") as string;
  const replyTo = formData.get("reply_to_email") as string;

  if (!name || !ownerName || !replyTo) {
    return { error: "Please fill in all required fields." };
  }

  const { data: newBiz, error } = await supabase
    .from("businesses")
    .insert({
      user_id: user.id,
      name,
      owner_name: ownerName,
      reply_to_email: replyTo,
      default_tone: (formData.get("default_tone") as string) || "Professional",
      send_mode: "approval",
      theme_color: "indigo",
      ui_density: "cozy",
    })
    .select("id")
    .single();

  if (error || !newBiz) {
    return { error: error?.message || "Failed to create client." };
  }

  // Switch to newly created client
  const cookieStore = await cookies();
  cookieStore.set("active_business_id", newBiz.id, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/invoices");
  revalidatePath("/dashboard/queue");
  revalidatePath("/dashboard/settings");

  return { success: true, businessId: newBiz.id };
}
