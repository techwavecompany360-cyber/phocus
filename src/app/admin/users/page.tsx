import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import AdminShell from "@/components/admin/AdminShell";
import UsersManager from "@/components/admin/UsersManager";

export const instant = false;

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell>
      <UsersManager />
    </AdminShell>
  );
}
