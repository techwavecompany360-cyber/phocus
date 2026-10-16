import { getAdminSession } from "@/lib/session";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import InvoicesManager from "@/components/admin/InvoicesManager";

export const instant = false;

export default async function AdminInvoicesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return (
    <AdminShell>
      <InvoicesManager />
    </AdminShell>
  );
}

