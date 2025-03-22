import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const FilteredEmail = "ja6101@srmist.edu.in";
  const Originaltoken =
    "zalb_74c3a1eecc%3D4cad43ac9848cc7edd20d2313fcde774%3Bzccpn%3D3e1bdf11524594b4500499c9f51d3a8460035970251783ba77531032bff685f1060b8225c582f5a957e45b4939eb5bc763b316a1c8dc6713a6ea815ef55ad5c1%3B_zcsr_tmp%3D3e1bdf11524594b4500499c9f51d3a8460035970251783ba77531032bff685f1060b8225c582f5a957e45b4939eb5bc763b316a1c8dc6713a6ea815ef55ad5c1%3BZCNEWUIPUBLICPORTAL%3Dtrue%3BJSESSIONID%3DDA9F144BEFB47E51E7C56CC20E945B67%3Bcli_rgn%3DUS%3Biamcsr%3D852e75e8-b050-4528-a0a8-b511e4349fdc%3Bzalb_f0e8db9d3d%3D983d6a65b2f29022f18db52385bfc639%3Bwms-tkp-token_client_10002227248%3D%3B_iamadt_client_10002227248%3D3c3988ec2e66bf75f2ebdddadcae22e4f1ed3d195bef62c257e6741add1c663f940714f5bc225c51aff7af653b1baa22%3B_iambdt_client_10002227248%3D38b328d67a1f76c021bf4fbcaa3c4670a27b59711ec58457165bb3dad6b2c65cf83bbdca46102bc5dcfb6a97c7f0230360500f2ce06706c9bdf0b95a10b3e870%3B_z_identity%3Dtrue%3B%3Dundefined%3B";
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
