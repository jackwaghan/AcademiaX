import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function GET() {
  (await cookies()).delete("token");
  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
