import { prisma } from "@/util/prisma"
import { randomBytes } from "crypto"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json({ 
        success: true, 
        message: "If an account exists, you will receive a reset email" 
      })
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // Save token to database
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry
      }
    })

    // Create reset link
    const resetLink = `http://localhost:4000/auth/reset-password?token=${resetToken}`

    // Configure email transport
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7e6ad89c88ce61",
        pass: "71cf73ad5759a6"
      }
    })

    // Send email
    await transport.sendMail({
      from: '"Study Group Finder" <noreply@studygroup.com>',
      to: email,
      subject: "Reset Your Password",
      html: `
        <h1>Password Reset Request</h1>
        <p>Click the link below to reset your password. This link will expire in 1 hour.</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `,
    })

    return NextResponse.json({ 
      success: true, 
      message: "Reset link sent successfully" 
    })

  } catch (error) {
    console.error("Reset email error:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to process reset request" 
    }, { status: 500 })
  }
}
