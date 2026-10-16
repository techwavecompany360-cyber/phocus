import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import AdminShell from "@/components/admin/AdminShell";
import CompanyEditor from "@/components/admin/CompanyEditor";

export const instant = false;

export default async function AdminCompanyPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell>
      <CompanyEditor />
    </AdminShell>
  );
}
