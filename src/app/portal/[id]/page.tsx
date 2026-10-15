import { connection } from "next/server";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/utils/supabase/admin";
import { ClientGuestPortalView } from "./ClientGuestPortalView";

export const instant = false;

interface PortalPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PortalPage({ params }: PortalPageProps) {
  await connection();
  const { id } = await params;

  const supabase = createAdminClient();

  const { data: business } = await supabase
    .from("businesses")
    .select("id, name, owner_name, reply_to_email")
    .eq("id", id)
    .single();

  if (!business) {
    notFound();
  }

  const { data: invoices } = await supabase
    .from("invoices")
    .select("id, invoice_number, customer_name, amount, status, due_date, created_at")
    .eq("business_id", business.id)
    .order("due_date", { ascending: false });

  return (
    <ClientGuestPortalView
      business={business}
      invoices={invoices || []}
    />
  );
}
