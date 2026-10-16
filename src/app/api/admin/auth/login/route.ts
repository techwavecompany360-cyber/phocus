import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { AdminUser } from "@/lib/models";
import { createAdminSession } from "@/lib/session";
import { seedDatabase } from "@/lib/seed";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    // Seed on first login attempt (idempotent)
    await seedDatabase();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await AdminUser.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await createAdminSession(user._id.toString(), user.email, user.role);

    return NextResponse.json({
      success: true,
      user: { email: user.email, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
