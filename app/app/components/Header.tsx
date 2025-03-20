"use client";
import { useWindow } from "@/lib/hook";
import { useSidebar } from "@/lib/zustand";
import { PanelRightOpen } from "lucide-react";
import { usePathname } from "next/navigation";

import React from "react";

const Header = () => {
  const isMobile = useWindow();
  const path = usePathname();
  const { toggle, isOpen } = useSidebar();
  return (
    <div
      className={`z-40 fixed top-0 w-full  min-h-[50px]  border-b border-foreground/15 items-center justify-between flex px-4 bg-foreground/10 backdrop-blur-3xl ${isOpen && !isMobile ? "pl-[260px]" : ""} transition-all duration-300 `}
    >
      <div className="flex gap-2 items-center h-full">
        <PanelRightOpen
          className="stroke-foreground/80 hover:stroke-foreground p-1 hover:bg-foreground/10 hover:scale-95 duration-300 transition-all rounded cursor-pointer"
          size={35}
          onClick={() => toggle()}
        />
        <div className="bg-foreground/20 h-[40px] w-[1px]" />
        <p className="text-xl text-orange-500 capitalize font-geist-mono">
          {path.split("/")[2]}
        </p>
      </div>
      <div className="w-7 h-7 rounded-full bg-foreground" />
    </div>
  );
};

export default Header;
