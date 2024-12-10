import { NextResponse } from 'next/server'
import { prisma } from '@/util/prisma'
import { verifySession } from '@/lib/session'

export async function DELETE() {
  try {
    const { userId } = await verifySession()

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Delete user from database
    const deletedUser = await prisma.user.delete({
      where: { id: userId }
    })
    console.log('Deleted user:', deletedUser)

    return NextResponse.json({ message: 'Account deleted successfully' })
  } catch (error: unknown) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal Error' }, 
      { status: 500 }
    )
  }
}