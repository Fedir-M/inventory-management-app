import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // На продакшене с HTTPS Better Auth добавляет префикс __Secure-, локально на HTTP — нет...тут был сюрприз с входом. локально не переходило.
  const cookieName =
    process.env.NODE_ENV === 'production'
      ? '__Secure-better-auth.session_token'
      : 'better-auth.session_token';

  const sessionToken = request.cookies.get(cookieName)?.value;
  const { pathname } = request.nextUrl;

  // 1. Always allow these public paths
  const publicPaths = ['/', '/sign-in', '/sign-up'];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // 2. Define protected paths
  const protectedPaths = [
    '/dashboard',
    '/inventory',
    '/add-product',
    '/product',
    '/settings',
  ];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // 3. If protected and no token, redirect to sign-in
  if (isProtected && !sessionToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Use the same matcher to ensure we don't block static assets
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
