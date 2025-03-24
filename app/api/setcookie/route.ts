import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const FilteredEmail = "ja6101@srmist.edu.in";
  const Originaltoken =
    "zalb_74c3a1eecc%3D8538705ab1f6c0b9e5882ca962984b8a%3Bzccpn%3Db86a83508aa779b047754dec76a8e96e7976877b9a1b766c4802f35e2820740e0abbf39c0b91f8f039d5e64cac2cdc09bc8ffe93bced92ff070414e865efa8b0%3B_zcsr_tmp%3Db86a83508aa779b047754dec76a8e96e7976877b9a1b766c4802f35e2820740e0abbf39c0b91f8f039d5e64cac2cdc09bc8ffe93bced92ff070414e865efa8b0%3BZCNEWUIPUBLICPORTAL%3Dtrue%3BJSESSIONID%3D49E372B1D15220E48AE157A2CBB1CA1F%3Bcli_rgn%3DUS%3Biamcsr%3D2faefe40-e775-4b3f-8d71-74967ca6ce71%3Bzalb_f0e8db9d3d%3D7ad3232c36fdd9cc324fb86c2c0a58ad%3Bwms-tkp-token_client_10002227248%3D%3B_iamadt_client_10002227248%3D1b53db66773273d8094b5f3c343f411a73a71cc3458369ee870dce2609b573a79fd4ac6d1c97e2e25c7cab8217c05735%3B_iambdt_client_10002227248%3D0deef89c590c6ef1a4919b78185d2732d6ba74161075ac4bdec0d708a02400f41bb005fe72aea8d1e2f8bb5bc43b2d9f0cfae21f63a78cb5762f8375a2a1e92c%3B_z_identity%3Dtrue%3B%3Dundefined%3B";
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
