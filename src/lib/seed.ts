import { connectToDatabase } from "@/lib/mongodb";
import {
  AdminUser,
  CompanySettings,
  Service,
  Solution,
  Project,
  PageVisit,
} from "@/lib/models";
import bcrypt from "bcryptjs";
import { companyData } from "@/data/company";
import { servicesData } from "@/data/services";
import { solutionsData } from "@/data/solutions";
import { projectsData } from "@/data/projects";

export async function seedDatabase() {
  await connectToDatabase();

  // ── Seed default admin user ─────────────────────────────────────────
  const existingAdmin = await AdminUser.findOne({
    email: "info@phociexperttechnologies.co.tz",
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("phociexpert@2026", 12);
    await AdminUser.create({
      email: "info@phociexperttechnologies.co.tz",
      passwordHash,
      name: "PhocieXpert Admin",
      role: "superadmin",
    });
    console.log("✅ Default admin user seeded");
  }

  // ── Seed company settings ───────────────────────────────────────────
  const existingSettings = await CompanySettings.findOne();
  if (!existingSettings) {
    await CompanySettings.create(companyData);
    console.log("✅ Company settings seeded from static data");
  }

  // ── Seed services ───────────────────────────────────────────────────
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    const services = servicesData.map((s, i) => ({ ...s, order: i }));
    await Service.insertMany(services);
    console.log(`✅ ${services.length} services seeded`);
  }

  // ── Seed solutions ──────────────────────────────────────────────────
  const solutionCount = await Solution.countDocuments();
  if (solutionCount === 0) {
    const solutions = solutionsData.map((s, i) => ({ ...s, order: i }));
    await Solution.insertMany(solutions);
    console.log(`✅ ${solutions.length} solutions seeded`);
  }

  // ── Seed projects ───────────────────────────────────────────────────
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    const projects = projectsData.map((p, i) => ({ ...p, order: i }));
    await Project.insertMany(projects);
    console.log(`✅ ${projects.length} projects seeded`);
  }

  // ── Seed website visitor analytics if empty ──────────────────────────
  const visitCount = await PageVisit.countDocuments();
  if (visitCount === 0) {
    const paths = ["/", "/services", "/about", "/contact", "/solutions"];
    const referrers = ["https://www.google.com", "https://linkedin.com", "Direct", "https://twitter.com", "https://tanzaniatech.co.tz"];
    const browsers = ["Chrome", "Chrome", "Safari", "Safari", "Edge", "Firefox"];
    const devices: ("desktop" | "mobile" | "tablet")[] = ["desktop", "desktop", "desktop", "mobile", "mobile", "tablet"];

    const sampleVisits = [];
    const now = Date.now();

    for (let dayAgo = 13; dayAgo >= 0; dayAgo--) {
      // 80 to 180 visits per day
      const dailyCount = Math.floor(90 + Math.random() * 80 + (13 - dayAgo) * 3);
      for (let j = 0; j < dailyCount; j++) {
        const timeOffset = dayAgo * 86400000 + Math.floor(Math.random() * 86400000);
        const createdAt = new Date(now - timeOffset);
        const path = paths[Math.floor(Math.random() * (Math.random() > 0.4 ? 1 : paths.length))];
        const referrer = referrers[Math.floor(Math.random() * referrers.length)];
        const browser = browsers[Math.floor(Math.random() * browsers.length)];
        const device = devices[Math.floor(Math.random() * devices.length)];
        const ip = `197.250.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 254 + 1)}`;

        sampleVisits.push({
          path,
          referrer,
          userAgent: `Mozilla/5.0 (${device})`,
          ip,
          device,
          browser,
          createdAt,
        });
      }
    }

    await PageVisit.insertMany(sampleVisits);
    console.log(`✅ ${sampleVisits.length} initial website visitor visits seeded`);
  }
}

