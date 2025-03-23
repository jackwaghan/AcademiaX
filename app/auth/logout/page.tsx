"use client";
import { useUser } from "@/lib/zustand";
import React from "react";

const Page = () => {
  const { logout } = useUser();
  React.useEffect(() => {
    logout();
  }, [logout]);
  return (
    <div className="w-dvw h-dvh flex items-center justify-center overflow-clip">
      <span className="loader" />
    </div>
  );
};

export default Page;
