import { NextResponse } from 'next/server';
import { prisma } from "@/util/prisma";
import { compareSync } from "bcrypt-ts";
import nodemailer from "nodemailer";

// Simple in-memory store for verification codes
const verificationStore = new Map<string, {
  code: string,
  userId: string,
  role: string,
  timestamp: number
}>();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7e6ad89c88ce61",
    pass: "71cf73ad5759a6"
  }
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, code } = body;
    console.log('Received request:', { email, hasPassword: !!password, hasCode: !!code });

    // Verification code step
    if (code) {
      const storedData = verificationStore.get(email);
      console.log('Stored verification data:', { email, storedData });

      if (!storedData) {
        return NextResponse.json({ errors: 'Please login again' }, { status: 400 });
      }

      // Check if code is expired (5 minutes)
      if (Date.now() - storedData.timestamp > 5 * 60 * 1000) {
        verificationStore.delete(email);
        return NextResponse.json({ errors: 'Verification code expired' }, { status: 400 });
      }

      if (code !== storedData.code) {
        return NextResponse.json({ errors: 'Invalid code' }, { status: 400 });
      }

      // Cleanup and set session
      verificationStore.delete(email);
      const response = NextResponse.json({ success: true });
      response.cookies.set('user_id', storedData.userId, { httpOnly: true });
      response.cookies.set('role', storedData.role, { httpOnly: true });

      return response;
    }

    // Initial login step
    if (!email || !password) {
      return NextResponse.json({ errors: 'Email and password required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { userId: true, password: true, role: true }
    });

    if (!user || !compareSync(password, user.password)) {
      return NextResponse.json({ errors: 'Invalid credentials' }, { status: 401 });
    }

    // Store verification code with timestamp
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    verificationStore.set(email, {
      code: verificationCode,
      userId: user.userId,
      role: user.role,
      timestamp: Date.now()
    });

    console.log('Stored new verification code for:', email);

    // Send verification email
    await transporter.sendMail({
      from: '"Study Group Finder" <noreply@studygroup.com>',
      to: email,
      subject: "Verification Code",
      html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`
    });

    return NextResponse.json({ needsVerification: true, email });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ errors: 'Server error' }, { status: 500 });
  }
}
