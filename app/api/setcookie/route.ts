import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const FilteredEmail = "ja6101@srmist.edu.in";
  const Originaltoken =
    "zalb_74c3a1eecc%3Db7a328fb61c3ccda28d1ea1fc9f51f22%3Bzccpn%3D15188fb85a881f0760b3d49a66605b2bb63762c690b87b33255d67cbbb5ff4661d3b2b45d511cff8174c0146c6ec37642a2c9ce28c52a01608be425d99da7113%3B_zcsr_tmp%3D15188fb85a881f0760b3d49a66605b2bb63762c690b87b33255d67cbbb5ff4661d3b2b45d511cff8174c0146c6ec37642a2c9ce28c52a01608be425d99da7113%3BZCNEWUIPUBLICPORTAL%3Dtrue%3BJSESSIONID%3DB06661BE1BCE0E4F407CFEB481ABA082%3Bcli_rgn%3DUS%3Biamcsr%3Dc7779593-036b-4911-93d6-b5d1af0c19da%3Bzalb_f0e8db9d3d%3D7ad3232c36fdd9cc324fb86c2c0a58ad%3Bwms-tkp-token_client_10002227248%3D%3B_iamadt_client_10002227248%3Df9c98f106e53ff7db4a93a26c7037641069027b3ea89a9135a0579e7db92321caa2a7cdaaa97ad817230f72180e50587%3B_iambdt_client_10002227248%3D0942569409e97d9d0ddd8c826abb02988ce07038bfdd64ed92191fe4d876c38ffbc95de45c4a40f38c46dd0d7914f3670b8e0aa791763aa806ccb1afbb4de931%3B_z_identity%3Dtrue%3B%3Dundefined%3B";
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
