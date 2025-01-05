import { prisma } from "@/util/prisma"
import { NextResponse } from "next/server"
import { hashSync } from "bcrypt-ts"

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing token or password' 
      }, { status: 400 })
    }

    // Find user with valid token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date()
        }
      }
    })

    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid or expired reset token' 
      }, { status: 400 })
    }

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashSync(password, 10),
        resetToken: null,
        resetTokenExpiry: null
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Password updated successfully' 
    })

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to reset password' 
    }, { status: 500 })
  }
}