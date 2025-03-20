import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = await cookies();
  await cookie.delete("token");
  const url = new URL(req.url);
  url.pathname = "/auth/login";
  return NextResponse.redirect(url);
}
