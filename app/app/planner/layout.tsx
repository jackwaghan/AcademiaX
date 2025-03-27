import { Metadata } from "next";
import dynamic from "next/dynamic";
import loading from "./loading";

const Fetch = dynamic(() => import("./components/Fetch"), {
  ssr: true,
  loading: loading,
});
export const metadata: Metadata = {
  title: "Planner- AcademiaX",
  description:
    "Academix SRM helps you manage your attendance, marks, timetable, and more, all in one beautifully designed platform tailored for SRM students.",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Fetch>{children}</Fetch>;
}

// async function fetchdata() {

//   const token = (await cookies()).get("token")?.value;
//   if (!token) return redirect("/auth/login");
//   const planner = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/planner`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       cookie: `token=${token}`,
//     },
//     credentials: "include",
//   }).then((res) => res.json());
//   return <Fetch/>
// }
