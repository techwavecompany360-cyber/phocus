import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { AdminUser } from "@/lib/models";
import { getAdminSession } from "@/lib/session";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session || session.role !== "superadmin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const { id } = await params;
  const { name, role, password } = await req.json();

  const update: Record<string, string> = {};
  if (name) update.name = name;
  if (role) update.role = role;
  if (password) update.passwordHash = await bcrypt.hash(password, 12);

  const user = await AdminUser.findByIdAndUpdate(id, update, { new: true }).select("-passwordHash");
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(user);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session || session.role !== "superadmin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const { id } = await params;
  await AdminUser.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
