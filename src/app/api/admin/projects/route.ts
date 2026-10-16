import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { Project } from "@/lib/models";
import { getAdminSession } from "@/lib/session";

export async function GET() {
  await connectToDatabase();
  const projects = await Project.find().sort({ order: 1 }).lean();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const body = await req.json();
  const count = await Project.countDocuments();
  const project = await Project.create({ ...body, order: count });
  revalidatePath("/", "layout");
  return NextResponse.json(project, { status: 201 });
}
