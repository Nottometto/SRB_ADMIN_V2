import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
 
export async function POST(req: NextRequest) {
  try {
    const {email, name } = await req.json();
 
    if (!email) {
        return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }
 
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        return NextResponse.json({ error: "A user with that email already exists." }, { status: 409 });
    }

    const user = await prisma.user.create({
    data: { email, name: name || null },
    });

    return NextResponse.json({ user }, { status: 201 });
    }
 
  catch (err) {
    console.error("[auth]", err);
    return NextResponse.json({ error: "Database error. Check your connection." }, { status: 500 });
  }
}