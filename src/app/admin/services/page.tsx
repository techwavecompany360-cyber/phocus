import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import AdminShell from "@/components/admin/AdminShell";
import { ServicesManager } from "@/components/admin/ContentManagers";

export const instant = false;

export default async function AdminServicesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell>
      <ServicesManager />
    </AdminShell>
  );
}
