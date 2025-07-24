import { NextResponse, NextRequest } from 'next/server';

export const runtime = 'experimental-edge';

export async function middleware(request: NextRequest) {
  const user = await verifyUser(request);
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (
    (user && request.nextUrl.pathname === '/logout') ||
    (!user && request.nextUrl.pathname === '/login')
  ) {
    return NextResponse.next();
  }
  if (!user && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (user && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/app/timetable', request.url));
  }
  if (!user && request.nextUrl.pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/app/:path*', '/login', '/logout', '/'],
};

export async function verifyUser(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('isAuthenticated')?.value;
  if (!token) return false;
  return true;
}
