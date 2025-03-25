import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const cookie = (await cookies()).get("token")?.value;
  if (req.nextUrl.pathname === "/auth/login" && cookie) {
    const url = req.nextUrl.clone();
    url.pathname = "/app/timetable";
    return NextResponse.redirect(url);
  }
  if (req.nextUrl.pathname === "/auth/login" && !cookie) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/app" && cookie) {
    const url = req.nextUrl.clone();
    url.pathname = "/app/timetable";
    return NextResponse.redirect(url);
  }
  if (req.nextUrl.pathname === "/app" && !cookie) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|Manifest|favicon.ico|api/|.*\\.(?:txt|xml|js|svg|png|jpg|jpeg|gif|webp)$|$).*)",
  ],
};
