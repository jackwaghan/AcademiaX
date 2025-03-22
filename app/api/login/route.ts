import { signToken } from "@/lib/jwt";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email)
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  if (!password)
    return NextResponse.json(
      { error: "Password is required" },
      { status: 400 }
    );

  try {
    const user = await fetch("https://www.acadia.asia/api/login", {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        //   cookie:
        //     "_ga=GA1.1.2014352967.1742235047; _ga_MGPN5E88RB=GS1.1.1742235046.1.1.1742235088.0.0.0",
        Referer: "https://www.acadia.asia/login",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: JSON.stringify({ email: email, pass: password }),
      method: "POST",
    }).then((res) => res.json());
    if (user.error)
      return NextResponse.json({ error: user.error }, { status: 400 });

    const FilteredEmail = email.includes("@srmist.edu.in")
      ? email
      : email + "@srmist.edu.in";
    const EncodedToken = user.token;
    const { Originaltoken } = await convertCookies(EncodedToken);

    const token = await signToken({
      email: FilteredEmail,
      token: Originaltoken,
    });
    (await cookies()).set("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });
    return NextResponse.json({ message: "Login Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "You have reached session limit", message: error },
      { status: 500 }
    );
  }
}

function convertCookies(EncodedToken: string) {
  const Originaltoken = encodeURIComponent(EncodedToken);
  return { Originaltoken };
}
