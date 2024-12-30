import { db, prisma } from "@/util/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: NextRequest) {
  try {
    // Update the destructuring to include security fields
    const { 
      name, 
      email, 
      password, 
      phoneNumber, 
      gender, 
      major,
      securityQuestion,
      securityAnswer 
    } = await request.json();

    // Update validation to include security fields
    if (!name || !email || !password || !phoneNumber || !gender || !major || !securityQuestion || !securityAnswer) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

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

    const hashedPassword = await bcrypt.hash(password, 10);

    // Include security fields in user creation
    const newUser = await prisma.user.create({
      data: {
        phoneNumber,
        gender,
        major,
        name,
        email,
        password: hashedPassword,
        securityQuestion,
        securityAnswer,
      },
    });

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
