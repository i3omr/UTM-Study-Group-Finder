import { db, prisma } from "@/util/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON request body
    const { name, email, password, phoneNumber, gender, major } = await (request as NextRequest).json();

    // Validate that all required fields are present
    if (!name || !email || !password ||!phoneNumber || !gender || !major ) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          code: "USER_EXISTS",
          message: "An account with this email already exists.",
        },
        { status: 400 }
      );
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        phoneNumber,
        gender,
        major,
        name,
        email,
        password: hashedPassword,
       
      },
    });

    // Return success response
    return NextResponse.json(
      { status: "success", message: "User registered successfully", user: newUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating user profile:", error);
    return NextResponse.json(
      { status: "error", message: "Registration Failed" },
      { status: 500 }
    );
  }
}
