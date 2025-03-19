import { NextResponse } from "next/server";

export async function GET() {
  const data = await fetch("https://www.acadia.asia/api/user", {
    method: "GET",
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/json",
      pragma: "no-cache",
      Referer: "https://www.acadia.asia/login",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      cookie:
        "token=zalb_74c3a1eecc%3D42c8226e37b1585dfe09da6ee6c142d4%3Bzccpn%3Da67a7b32c1f677f5f312bbe8739a80b7c26515c6be53ab5cc7eff88b11a78f2c3ff857c11492f2dae75164d1c65e7b591c48b7fac2e39a12b3f0f1346c6d657f%3B_zcsr_tmp%3Da67a7b32c1f677f5f312bbe8739a80b7c26515c6be53ab5cc7eff88b11a78f2c3ff857c11492f2dae75164d1c65e7b591c48b7fac2e39a12b3f0f1346c6d657f%3BZCNEWUIPUBLICPORTAL%3Dtrue%3BJSESSIONID%3D06744B9BD120F39B687E071E5BBE53A6%3Bcli_rgn%3DUS%3Biamcsr%3D0e2b9e70-7ab9-4567-88ab-a263b07549bb%3Bzalb_f0e8db9d3d%3D7ad3232c36fdd9cc324fb86c2c0a58ad%3Bwms-tkp-token_client_10002227248%3D%3B_iamadt_client_10002227248%3D8d3c8dd4f31b9bb71bde6e1b6391774230f801ed1f85dc6f64f08f494b4cf7cf2cc3b466bbd2bcec0b40ca24f9ebad90%3B_iambdt_client_10002227248%3Dce1e8224639efdcfb50da44207f81e6638387ab7810087c1142ebfce63c2d8c8923f7b816bf9aee1bac3c0a2a63435bf26cc901d132d40d7d2a91f93e9200ad5%3B_z_identity%3Dtrue%3B%3Dundefined%3B",
    },
  }).then((res) => res.json());
  if (data.error) return NextResponse.json(data, { status: 400 });

  return NextResponse.json(data, { status: 200 });
}
