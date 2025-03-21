import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
  const email = "ja6101@srmist.edu.in";

  const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  (await cookies()).set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });
  return NextResponse.json({ message: "Cookie set" });
}
