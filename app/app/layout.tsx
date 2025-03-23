import { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";

export const metadata: Metadata = {
  title: "Timetable - AcademiaX",
  description:
    "Academix SRM helps you manage your attendance, marks, timetable, and more, all in one beautifully designed platform tailored for SRM students.",
};

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
  return <Main>{children}</Main>;
}
