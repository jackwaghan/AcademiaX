import { Metadata } from "next";
import React from "react";
import AppLayout from "./components/AppLayout";

export const metadata: Metadata = {
  title: "App - Academia",
  description: "App - Academia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
