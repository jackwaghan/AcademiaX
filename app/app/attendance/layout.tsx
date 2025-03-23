import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Attendance - AcademiaX",
  description:
    "Academix SRM helps you manage your attendance, marks, timetable, and more, all in one beautifully designed platform tailored for SRM students.",
};
export default async function Rootlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
