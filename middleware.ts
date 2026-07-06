import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Просто выводим в логи Vercel (не браузера!) то, что происходит
  console.log('Request to:', request.nextUrl.pathname);

  // Никаких редиректов. Просто пропускаем всё.
  return NextResponse.next();
}

// Этот конфиг говорит: "Не трогай файлы сборки и картинки"
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
