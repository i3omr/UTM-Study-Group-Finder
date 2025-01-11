import { verifySession } from "@/lib/session";
import { prisma } from "@/util/prisma";
import { NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt-ts";

export async function PUT(request: Request) {
  try {
    const { userId } = await verifySession();
    const body = await request.json();

    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const updateData: any = {
      name: body.name,
      email: body.email,
      bio: body.bio,
    };

    if (body.password) {
      const salt = genSaltSync(11);
      updateData.password = hashSync(body.password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: updateData,
      include: {
        groups: true
      }
    });

    return NextResponse.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      bio: updatedUser.bio,
    });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: "Failed to update user profile", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 