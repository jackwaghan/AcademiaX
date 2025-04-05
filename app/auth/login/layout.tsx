import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Login - AcademiaX",
  description: "Login to AcademiaX",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;
  if (token) redirect("/app/timetable");
  return <>{children}</>;
}
