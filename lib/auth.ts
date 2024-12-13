'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.set({
    name: 'session',
    value: '',
    expires: new Date(0),
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  })

  return redirect('/auth/sign-up')
}