import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { PageVisit } from "@/lib/models";

function parseDevice(ua: string): "desktop" | "mobile" | "tablet" {
  const lower = ua.toLowerCase();
  if (/ipad|tablet|(android(?!.*mobile))/i.test(lower)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(lower)) return "mobile";
  return "desktop";
}

function parseBrowser(ua: string): string {
  const lower = ua.toLowerCase();
  if (lower.includes("edg/")) return "Edge";
  if (lower.includes("chrome") && !lower.includes("edg/")) return "Chrome";
  if (lower.includes("safari") && !lower.includes("chrome")) return "Safari";
  if (lower.includes("firefox")) return "Firefox";
  if (lower.includes("opera") || lower.includes("opr/")) return "Opera";
  return "Other";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = typeof body.path === "string" ? body.path : "/";

    // Ignore tracking of admin routes and internal APIs
    if (path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ ignored: true });
    }

    const ua = req.headers.get("user-agent") || "";
    const referrer = typeof body.referrer === "string" ? body.referrer : (req.headers.get("referer") || "");
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "127.0.0.1";

    const device = parseDevice(ua);
    const browser = parseBrowser(ua);

    await connectToDatabase();
    await PageVisit.create({
      path,
      referrer,
      userAgent: ua.slice(0, 200),
      ip,
      device,
      browser,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Tracking error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
