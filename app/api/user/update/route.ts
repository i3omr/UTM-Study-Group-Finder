import { verifySession } from "@/lib/session";
import { prisma } from "@/util/prisma";
import { NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt-ts";

export async function PUT(request: Request) {
  try {
    const { userId } = await verifySession();
    const body = await request.json();

    // Validate the input
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {
      name: body.name,
      email: body.email,
      bio: body.bio,
    };

    // If password is provided, hash it
    if (body.password) {
      const salt = genSaltSync(11);
      updateData.password = hashSync(body.password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        bio: true,
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: "Failed to update user profile", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 