import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // get cookies
  const sessionToken = request.cookies.get('better-auth.session_token')?.value;

  const protectedPaths = [
    '/dashboard',
    '/inventory',
    '/add-product',
    '/settings',
  ];

  // Проверяем, начинается ли путь с любого из защищенных
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

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
  ],
};
