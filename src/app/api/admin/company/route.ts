import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { CompanySettings } from "@/lib/models";
import { getAdminSession } from "@/lib/session";

export async function GET() {
  try {
    await connectToDatabase();
    const settings = await CompanySettings.findOne().lean();
    return NextResponse.json(settings);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectToDatabase();
    const body = await req.json();
    const settings = await CompanySettings.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
      runValidators: false,
    });
    revalidatePath("/", "layout");
    return NextResponse.json(settings);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
