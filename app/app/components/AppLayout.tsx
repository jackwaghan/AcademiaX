"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSidebar } from "@/lib/zustand";
import { useWindow } from "@/lib/hook";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useWindow();
  const { isOpen } = useSidebar();

  // Ensure the window size is detected before rendering
  if (isMobile === undefined) return null;

  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div
        className={`flex-1 h-screen flex flex-col ${isOpen && !isMobile ? "pl-[250px]" : ""} duration-300 transition-all`}
      >
        <Header />
        <div className="flex-1 mt-[50px] md:overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
