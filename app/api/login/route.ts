import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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
  if (user.error) return NextResponse.json(user, { status: 400 });

  const original = user.token;
  const { token } = await convertCookies(original);
  (await cookies()).set("token", token);

  return NextResponse.json({ token });
}

function convertCookies(original: string) {
  const token = encodeURIComponent(original);
  return { token };
}
