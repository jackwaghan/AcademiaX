"use client";
import { useUser } from "@/lib/zustand";
import React from "react";

const Page = () => {
  const { logout } = useUser();
  React.useEffect(() => {
    logout();
  }, [logout]);
  return (
    <div className="w-screen h-screen flex items-center justify-center text-lg ">
      Logging out...
    </div>
  );
};

export default Page;
