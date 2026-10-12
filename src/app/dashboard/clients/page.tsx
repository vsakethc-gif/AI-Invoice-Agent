import { connection } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { ClientsView } from "./ClientsView";
import { redirect } from "next/navigation";

export const instant = false;

export default async function ClientsPage() {
  await connection();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: businesses } = await supabase
    .from("businesses")
    .select("id, name, owner_name, reply_to_email, theme_color, ui_density, total_recovered")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  const cookieStore = await cookies();
  const activeId = cookieStore.get("active_business_id")?.value;

  const activeBusinessId = activeId || businesses?.[0]?.id;

  return (
    <ClientsView
      businesses={businesses || []}
      activeBusinessId={activeBusinessId}
    />
  );
}
