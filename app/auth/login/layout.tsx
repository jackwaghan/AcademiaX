import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - AcademiaX",
  description: "Login to AcademiaX",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
