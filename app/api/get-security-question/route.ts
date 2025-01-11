import { prisma } from "@/util/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
      select: { securityQuestion: true }
    });

    if (!user) {
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ 
      success: true, 
      securityQuestion: user.securityQuestion 
    });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
} 