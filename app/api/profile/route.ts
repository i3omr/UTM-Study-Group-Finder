/*// app/api/profile/create/route.ts
import { prisma } from "@/util/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, gender, major, userId } = await request.json();

    // Check if all required fields are provided
    if (!phoneNumber || !gender || !major ) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert new user profile data into the UserProfile table
    const newProfile = await prisma.userProfile.create({
      data: {
        phoneNumber,
        gender,
        major,
        userId,  // Include the CuserId
      },
    });

    // Return success response with the newly created profile
    return NextResponse.json({
      status: "success",
      profile: newProfile,
    });
  } catch (error) {
    const typedError = error as Error;  // Type assertion to Error
    console.error("Error in registration:", typedError.message);

    // Return a JSON error response if something goes wrong
    return NextResponse.json(
      { status: "error", message: typedError.message || "An error occurred while registering." },
      { status: 500 }
    );
  }
}*/
