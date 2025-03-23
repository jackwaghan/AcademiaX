"use client";
import { useWindow } from "@/lib/hook";
import { useSidebar } from "@/lib/zustand";
import { CircleUserRound, Cog, LogOut, PanelRightOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const ProfileIcon = {
  Profile: <CircleUserRound />,
  Settings: <Cog />,
  Logout: <LogOut />,
};

const Profile = [
  { name: "Profile", link: "/app/profile" },
  { name: "Logout", link: "/auth/logout" },
] as const;

const Header = () => {
  const isMobile = useWindow();
  const path = usePathname();
  const { toggle, isOpen } = useSidebar();
  const [show, setShow] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && show) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);
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
      <div className="relative  ">
        <div
          className="rounded-full hover:scale-95 duration-300 cursor-pointer border-3 border-orange-500  w-9 h-9 p-0.5 flex "
          onClick={() => setShow(!show)}
        >
          <Image
            src="https://img.freepik.com/premium-vector/3d-vector-icon-simple-blue-user-profile-icon-with-white-features_6011-1575.jpg"
            alt="profile"
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
        {show && (
          <div
            ref={ref}
            className="absolute top-13 right-5 px-2 py-2 bg-background border border-foreground/10 rounded-lg shadow-lg flex flex-col gap-1 cursor-pointer "
          >
            {Profile.map((item, index) => {
              const color = item.name === "Logout" ? "red-500" : "blue-500";
              return (
                <Link
                  href={item.link}
                  key={index}
                  className={`flex gap-2 items-center hover:bg-foreground/10 px-3 py-1.5 rounded-lg duration-300 hover:scale-95 transition-transform`}
                  onClick={() => setShow(false)}
                >
                  <span
                    className={`w-5 h-5 items-center flex text-blue-500 text-${color}`}
                  >
                    {ProfileIcon[item.name]}
                  </span>
                  <p className="rounded px-2 mr-5">{item.name}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
