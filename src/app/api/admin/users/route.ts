import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { AdminUser } from "@/lib/models";
import { getAdminSession } from "@/lib/session";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await getAdminSession();
  if (!session || session.role !== "superadmin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const users = await AdminUser.find().select("-passwordHash").lean();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session || session.role !== "superadmin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const { email, password, name, role } = await req.json();
  if (!email || !password || !name) {
    return NextResponse.json({ error: "email, password and name are required" }, { status: 400 });
  }
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await AdminUser.create({ email: email.toLowerCase().trim(), passwordHash, name, role: role || "editor" });
  return NextResponse.json({ _id: user._id, email: user.email, name: user.name, role: user.role }, { status: 201 });
}
