import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const cookie = (await cookies()).get("token")?.value;

  if (!cookie)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  (await cookies()).delete("token");
  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
