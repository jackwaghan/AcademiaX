import dynamic from "next/dynamic";
import React from "react";

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
