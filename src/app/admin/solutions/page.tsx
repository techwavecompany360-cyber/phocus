import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import AdminShell from "@/components/admin/AdminShell";
import { SolutionsManager } from "@/components/admin/ContentManagers";

export const instant = false;

export default async function AdminSolutionsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell>
      <SolutionsManager />
    </AdminShell>
  );
}
