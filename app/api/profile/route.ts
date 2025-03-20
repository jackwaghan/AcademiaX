import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = (await cookies()).get("token")?.value;
  const user = await fetch("https://www.acadia.asia/api/user", {
    method: "GET",
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/json",
      pragma: "no-cache",
      Referer: "https://www.acadia.asia/login",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      cookie: `token=${cookie}`,
    },
  }).then((res) => res.json());
  if (user.error) return NextResponse.json(user, { status: 400 });

  return NextResponse.json({ user }, { status: 200 });
}
