import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const FilteredEmail = "ja6101@srmist.edu.in";
  const Originaltoken =
    "zalb_74c3a1eecc%3D86320f99d3a5ec2b36381b7353a57d1a%3Bzccpn%3De0d1ce1a4ab44ce4404ee5e7316ab82c02961a3c74bd314908ca5a0883a9a373d0f0cbc872abdb7bfc021eb109493dd2117f517df1d379fa1753e6cab21b4c52%3B_zcsr_tmp%3De0d1ce1a4ab44ce4404ee5e7316ab82c02961a3c74bd314908ca5a0883a9a373d0f0cbc872abdb7bfc021eb109493dd2117f517df1d379fa1753e6cab21b4c52%3BZCNEWUIPUBLICPORTAL%3Dtrue%3BJSESSIONID%3D8457158CF23C03F0FCD0C09BA300D37B%3Bcli_rgn%3DUS%3Biamcsr%3D47ae2d1d-4658-489b-8d05-f62b2249b4e0%3Bzalb_f0e8db9d3d%3D983d6a65b2f29022f18db52385bfc639%3Bwms-tkp-token_client_10002227248%3D%3B_iamadt_client_10002227248%3Dc56d360fd4ce0ba3137a3cb0bed2bbb344dd6c1fe0f77aec4c59dd4e44d4eb770e15e74ac3440ee4f3c907cb3f77f260%3B_iambdt_client_10002227248%3Dac7ec8a80aeb57fe81bf62c08ca96b36a88dc87d46e46592e99b250ceb5bb6656ecfb80043ab9e2766fa91ea1b21addfd4ec36aa4a93e7f6311c7a7945c3492c%3B_z_identity%3Dtrue%3B%3Dundefined%3B";
  const token = await signToken({
    email: FilteredEmail,
    token: Originaltoken,
  });
  (await cookies()).set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({ message: "Login Success" }, { status: 200 });
}
