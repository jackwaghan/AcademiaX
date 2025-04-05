import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export const runtime = "edge";

const Loading = () => (
  <div className="w-dvw h-dvh flex items-center justify-between overflow-hidden">
    <span className="loader" />
  </div>
);

const Main = dynamic(() => import("./components/Main"), {
  ssr: true,
  loading: Loading,
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/auth/login");
  return <Main>{children}</Main>;
}
