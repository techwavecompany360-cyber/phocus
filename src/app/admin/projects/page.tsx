import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import AdminShell from "@/components/admin/AdminShell";
import { ProjectsManager } from "@/components/admin/ContentManagers";

export const instant = false;

export default async function AdminProjectsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell>
      <ProjectsManager />
    </AdminShell>
  );
}
