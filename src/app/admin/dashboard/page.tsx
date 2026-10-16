import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { Service, Solution, Project, AdminUser, PageVisit } from "@/lib/models";
import { seedDatabase } from "@/lib/seed";
import { getAdminSession } from "@/lib/session";
import AdminShell from "@/components/admin/AdminShell";
import DashboardClient from "@/components/admin/DashboardClient";

export const instant = false;

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  await connectToDatabase();
  await seedDatabase();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

  const [
    services,
    solutions,
    projects,
    users,
    totalVisits,
    todayVisits,
    uniqueVisitorsList,
    dailyRaw,
    topPagesRaw,
    devicesRaw,
    recentRaw,
  ] = await Promise.all([
    Service.countDocuments(),
    Solution.countDocuments(),
    Project.countDocuments(),
    AdminUser.countDocuments(),
    PageVisit.countDocuments(),
    PageVisit.countDocuments({ createdAt: { $gte: startOfToday } }),
    PageVisit.distinct("ip"),
    PageVisit.aggregate([
      { $match: { createdAt: { $gte: fourteenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    PageVisit.aggregate([
      { $group: { _id: "$path", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 6 },
    ]),
    PageVisit.aggregate([
      { $group: { _id: "$device", count: { $sum: 1 } } },
    ]),
    PageVisit.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .select("path device browser referrer createdAt")
      .lean(),
  ]);

  // Format daily chart points
  const dailyVisits = dailyRaw.map(d => ({
    date: d._id.slice(5), // "MM-DD"
    fullDate: d._id,
    count: d.count,
  }));

  const topPages = topPagesRaw.map(p => ({
    path: p._id || "/",
    count: p.count,
  }));

  const deviceMap: { desktop: number; mobile: number; tablet: number } = { desktop: 0, mobile: 0, tablet: 0 };
  devicesRaw.forEach((d: { _id?: string; count: number }) => {
    if (d._id === "desktop" || d._id === "mobile" || d._id === "tablet") {
      deviceMap[d._id] = d.count;
    }
  });

  const recentVisits = recentRaw.map(r => ({
    _id: String(r._id),
    path: r.path || "/",
    device: r.device || "desktop",
    browser: r.browser || "Other",
    createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
  }));

  return (
    <AdminShell>
      <DashboardClient
        stats={{ services, solutions, projects, users }}
        analytics={{
          totalVisits,
          todayVisits,
          uniqueVisitors: uniqueVisitorsList.length,
          dailyVisits,
          topPages,
          devices: deviceMap,
          recentVisits,
        }}
      />
    </AdminShell>
  );
}

