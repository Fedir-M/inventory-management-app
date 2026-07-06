import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('better-auth.session_token')?.value;
  const { pathname } = request.nextUrl;

  // Исключаем главную страницу от проверки Middleware
  if (pathname === '/') {
    return NextResponse.next();
  }

  const protectedPaths = [
    '/dashboard',
    '/inventory',
    '/add-product',
    '/product',
    '/settings',
  ];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !sessionToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

// routes to be protected
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/inventory/:path*',
    '/add-product/:path*',
    '/settings/:path*',
    '/product/:path*',
  ],
};
