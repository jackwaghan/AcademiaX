import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/auth/login") {
    return NextResponse.next();
  }
  if (req.nextUrl.pathname === "/app") {
    const url = req.nextUrl.clone();
    url.pathname = "/app/dashboard";
    return NextResponse.redirect(url);
  }
  const isCookie = await checkCookie();
  if (!isCookie) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|$).*)",
  ],
};

async function checkCookie() {
  const cookie = await cookies();
  const token = cookie.get("token");
  if (!token) {
    return false;
  }
  return true;
}
