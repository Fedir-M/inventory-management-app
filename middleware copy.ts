import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get the session token from cookies
  const sessionToken = request.cookies.get('better-auth.session_token')?.value;
  const { pathname } = request.nextUrl;

  // LOG FOR DEBUGGING
  console.log('DEBUG_PATH:', pathname, 'HAS_TOKEN:', !!sessionToken);

  // Exclude the home page from middleware check
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

  // Check if the path begins with any of the protected routes
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  // If the path is protected and no token exists, redirect to sign-in
  if (isProtected && !sessionToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

// Routes to be protected
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/inventory/:path*',
    '/add-product/:path*',
    '/settings/:path*',
    '/product/:path*',
  ],
};
