'use server'
import { createSession } from "@/lib/session";
import { prisma } from "@/util/prisma";
import { compareSync } from "bcrypt-ts";
import nodemailer from "nodemailer";
import { cookies } from 'next/headers';

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7e6ad89c88ce61",
    pass: "71cf73ad5759a6"
  }
});

export async function login(prevState: any, formData: FormData): Promise<any> {
  try {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const code = formData.get('code')?.toString();

    // Verification step
    if (code) {
      const cookieStore = await cookies();
      const storedData = cookieStore.get('auth_verification')?.value;
      if (!storedData) {
        return { errors: 'Verification expired. Please login again.' };
      }

      const { userId, role, verificationCode } = JSON.parse(storedData);
      
      if (code !== verificationCode) {
        return { errors: 'Invalid verification code' };
      }

      cookieStore.delete('auth_verification');
      await createSession(userId, role);
      
      return { success: true };
    }

    // Initial login step
    if (!email || !password) {
      return { errors: 'Email and password are required' };
    }

    const user = await prisma.user.findUnique({ 
      where: { email },
      select: {
        userId: true,
        password: true,
        role: true
      }
    });

    if (!user || !compareSync(password, user.password)) {
      return { errors: 'Invalid email or password' };
    }

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store verification data in cookie
    const cookieStore = await cookies();
    cookieStore.set('auth_verification', JSON.stringify({
      userId: user.userId,
      role: user.role,
      verificationCode,
      email
    }), { 
      maxAge: 300, // 5 minutes
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    // Send verification email
    await transporter.sendMail({
      from: '"Study Group Finder" <noreply@studygroup.com>',
      to: email,
      subject: "Login Verification Code",
      html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`
    });

    return { needsVerification: true, email };
  } catch (error) {
    console.error('Login error details:', error);
    return { errors: error instanceof Error ? error.message : 'An error occurred during login' };
  }
}

function comparePasswordAndHash(enteredPassword:string, storedHash:string) {
  return compareSync(enteredPassword, storedHash);
}