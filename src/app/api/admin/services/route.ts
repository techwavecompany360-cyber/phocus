import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { Service } from "@/lib/models";
import { getAdminSession } from "@/lib/session";

export async function GET() {
  await connectToDatabase();
  const services = await Service.find().sort({ order: 1 }).lean();
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const body = await req.json();
  const count = await Service.countDocuments();
  const service = await Service.create({ ...body, order: count });
  revalidatePath("/", "layout");
  return NextResponse.json(service, { status: 201 });
}
