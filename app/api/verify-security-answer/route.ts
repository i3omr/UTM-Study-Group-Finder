import { prisma } from "@/util/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, answer } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
      select: { securityAnswer: true }
    });

    const isCorrect = user?.securityAnswer === answer;
    return NextResponse.json({ success: isCorrect });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
} 