import { type NextRequest, NextResponse } from 'next/server';
import { decrypt } from './lib/session';
import { cookies } from 'next/headers';

export default async function middleware(req: NextRequest) {
  const protectedRoutes = ['/dashboard'];
  const currentPath = req.nextUrl.pathname.replace(/\/$/, ''); // Remove trailing slash
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    const cookie = (await cookies()).get('securesession')?.value;

    if (!cookie) {
      return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
    }

    const session = await decrypt(cookie);

    if (!session || !session.userId) {
      return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
};
