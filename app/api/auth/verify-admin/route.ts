import { NextResponse } from 'next/server'
import { prisma } from '@/util/prisma'

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })

    return NextResponse.json({
      isAdmin: user?.role === 'admin'
    })
  } catch (error) {
    console.error('Admin verification error:', error)
    return NextResponse.json({ isAdmin: false }, { status: 500 })
  }
} 