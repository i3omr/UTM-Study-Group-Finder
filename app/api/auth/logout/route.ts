import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  // Create response with expired cookies
  const response = new NextResponse(null, { status: 200 })

  // Set multiple expired cookies to ensure they're cleared
  const cookieOptions = {
    expires: new Date(0),
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const
  }

  // Clear both session cookies
  response.cookies.set('session', '', cookieOptions)
  response.cookies.set('securesession', '', cookieOptions)

  // Also set via headers for redundancy
  response.headers.set('Set-Cookie', [
    'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly',
    'securesession=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure'
  ].join(', '))

  return response
} 