import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = await cookies();
  await cookie.delete("token");
  return NextResponse.json({ message: "Cookie removed" });
}
