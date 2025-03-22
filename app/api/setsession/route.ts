import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export const config = {
  runtime: "edge",
};

export async function POST() {
  const token = await (await cookies()).get("token")?.value;
  if (!token)
    return NextResponse.json(
      { error: "Failed to create Session" },
      { status: 400 }
    );
  const decode = await verifyToken(token);
  if (
    !decode ||
    typeof decode !== "object" ||
    !("email" in decode) ||
    !("token" in decode)
  ) {
    return NextResponse.json(
      { error: "Failed to create Session" },
      { status: 400 }
    );
  }

  const FilteredEmail = decode.email;
  const Originaltoken = decode.token;

  const supabase = await createClient();

  const { error } = await supabase
    .from("students")
    .upsert({
      email: FilteredEmail,
      session_cookie: Originaltoken,
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    })
    .select();

  return NextResponse.json(
    { message: "Session Created Successfully" },
    { status: 200 }
  );

  if (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
