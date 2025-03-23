import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const cookie = (await cookies()).get("token")?.value;
  if (cookie && req.nextUrl.pathname === "/auth/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/app/timetable";
    return NextResponse.redirect(url);
  }
  if (req.nextUrl.pathname === "/app" && cookie) {
    const url = req.nextUrl.clone();
    url.pathname = "/app/timetable";
    return NextResponse.redirect(url);
  }
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|$).*)",
  ],
};
