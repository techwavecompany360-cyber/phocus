import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { Solution } from "@/lib/models";
import { getAdminSession } from "@/lib/session";

export async function GET() {
  await connectToDatabase();
  const solutions = await Solution.find().sort({ order: 1 }).lean();
  return NextResponse.json(solutions);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const body = await req.json();
  const count = await Solution.countDocuments();
  const solution = await Solution.create({ ...body, order: count });
  revalidatePath("/", "layout");
  return NextResponse.json(solution, { status: 201 });
}
