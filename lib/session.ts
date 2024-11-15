'use server';
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import {cookies} from "next/headers";
const key = new TextEncoder().encode(process.env.AUTH_SECRET)
type SessionType = {
    userId: string
    expires: any
}
type AuthCookieType = {
    name: string
    options: any
    duration: bigint | undefined

}
const cookie = {
    name: 'securesession',
    options: { httpOnly: true, secure: true, sameSite: 'lax', path: '/' },
    duration: 24 * 60 * 60 * 1000
}
export async function encrypt(payload: SessionType) {
    return new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('1day').sign(key)
}
export async function decrypt(session: string | Uint8Array) {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        })
        return payload
    }
    catch (err: any) {
        return null
    }
}
export async function createSession(userId: string,role:string) {
    const expires = new Date(Date.now() + cookie.duration)
    const session = await encrypt({ userId, expires });

    (await cookies()).set(cookie.name, session, { ...cookie.options, sameSite: 'lax', expires })

    role==='student'?redirect(`/mydashboard`):redirect(`/user/${userId}`)
}
export async function verifySession() {
    const authcookie = (await cookies()).get(cookie.name)?.value
    const session = await decrypt(authcookie as string | Uint8Array)
    if (!session?.userId) {
        redirect('/login')
    }
    return { userId: session.userId }

}
export async function checkSessionExistOnly() {
    const authcookie = (await cookies()).get(cookie.name)?.value
    const session = await decrypt(authcookie as string | Uint8Array)
    if (!session?.userId) {
        return {session:false}
    }
    return { session: session.userId }

}
export async function deleteSession() {

    (await cookies()).delete(cookie.name)
    redirect('/login')
}