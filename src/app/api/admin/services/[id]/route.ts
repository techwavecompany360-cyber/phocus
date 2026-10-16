import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { Service } from "@/lib/models";
import { getAdminSession } from "@/lib/session";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  const { id } = await params;
  const service = await Service.findById(id).lean();
  if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(service);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const { id } = await params;
  const body = await req.json();
  const service = await Service.findByIdAndUpdate(id, body, { new: true });
  if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/", "layout");
  return NextResponse.json(service);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const { id } = await params;
  await Service.findByIdAndDelete(id);
  revalidatePath("/", "layout");
  return NextResponse.json({ success: true });
}
