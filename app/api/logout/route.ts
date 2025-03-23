import { verifyToken } from "@/lib/jwt";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function GET() {
  const cookie = (await cookies()).get("token")?.value;

  if (!cookie)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decode = await verifyToken(cookie);
  if (
    !decode ||
    typeof decode !== "object" ||
    !("email" in decode) ||
    !("token" in decode)
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const email = decode.email;
  const token = decode.token;

  const supabase = await createClient();
  await supabase
    .from("session")
    .delete()
    .eq("email", email)
    .eq("session_cookie", token);
  (await cookies()).delete("token");
  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
