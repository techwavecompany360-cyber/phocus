import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Invoice } from "@/lib/models";
import { getAdminSession } from "@/lib/session";

export async function GET() {
  await connectToDatabase();
  const invoices = await Invoice.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(invoices);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const body = await req.json();
  // Auto-generate invoice number if not provided
  if (!body.invoiceNumber) {
    const count = await Invoice.countDocuments();
    const prefix = body.type === "proforma" ? "PF" : "INV";
    body.invoiceNumber = `${prefix}-${String(count + 1).padStart(4, "0")}`;
  }
  const invoice = await Invoice.create(body);
  return NextResponse.json(invoice, { status: 201 });
}
