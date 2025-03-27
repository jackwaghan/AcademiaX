import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = (await cookies()).get("token")?.value;
  if (!cookie)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const decode = await verifyToken(cookie);
    if (!decode || typeof decode !== "object" || !("token" in decode)) {
      return NextResponse.json({ error: "JWT decode Error" }, { status: 402 });
    }
    const token = decode.token as string;
    console.log("Planner Fetched");
    const planner = await fetch("https://www.acadia.asia/api/planner", {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        pragma: "no-cache",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie: `token=${token}`,
        Referer: "https://www.acadia.asia/timetable",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }).then((res) => res.json());
    if (planner.error) return NextResponse.json(planner, { status: 400 });
    return NextResponse.json(planner, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
