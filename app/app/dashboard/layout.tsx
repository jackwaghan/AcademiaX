import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - AcademiaX",
  description: "Academia - SRM Institute of Science and Technology",
};
export default async function Rootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="">{children}</div>;
}
