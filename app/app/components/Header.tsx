"use client";
import { useWindow } from "@/lib/hook";
import { useSidebar, useUser } from "@/lib/zustand";
import {
  CircleUserRound,
  LogOut,
  PanelRightOpen,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const ProfileIcon = {
  Profile: <CircleUserRound />,
  // Settings: <Cog />,
  Logout: <LogOut />,
};

const Profile = [
  // { name: "Profile", link: "/app/profile" },
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
      className={`z-40 fixed top-0 w-full  min-h-[50px]  border-b border-foreground/10  items-center justify-between flex px-4 bg-foreground/10 backdrop-blur-3xl ${isOpen && !isMobile ? "pl-[260px]" : ""} transition-all duration-300 `}
    >
      <div className="flex gap-2 items-center h-full">
        <PanelRightOpen
          className="stroke-orange-500 hover:stroke-foreground p-1 hover:bg-foreground/10 hover:scale-95 duration-300 transition-all rounded cursor-pointer"
          size={35}
          onClick={() => toggle()}
        />
        <div className="bg-foreground/20 h-[40px] w-[1px]" />
        <p className="text-xl  capitalize ">{path.split("/")[2]}</p>
      </div>
      <div className="relative  ">
        <UserCircle2
          onClick={() => setShow(!show)}
          size={30}
          className=" text-blue-500 hover:scale-95 duration-300 transition-all cursor-pointer"
        />
        {show && <ProfileDropdown ref={ref} show={show} setShow={setShow} />}
      </div>
    </div>
  );
};

export default Header;

const ProfileDropdown = ({
  ref,
  setShow,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useUser();
  return (
    <div
      ref={ref}
      className="absolute top-13 right-5 px-2 py-2 shadow-inner shadow-foreground/20 border border-foreground/10 bg-background rounded-lg flex flex-col gap-1  w-[230px] md:w-[250px] z-50 transition-transform duration-500"
    >
      <div className="flex items-center  text-sm p-2 gap-4 border-b border-foreground/10">
        <UserCircle2 size={30} className=" text-blue-500" />
        <div>
          <p className="">{user?.name}</p>
          <p className="text-foreground/60">{user?.roll}</p>
        </div>
      </div>
      {Profile.map((item, index) => {
        const color = item.name === "Logout" ? "red-500" : "blue-500";
        return (
          <Link
            href={item.link}
            key={index}
            className={`flex gap-2 items-center hover:shadow-inner hover:shadow-foreground/20 hover:bg-foreground/5 px-3 py-1.5 rounded-lg duration-300 hover:scale-98 transition-transform `}
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
  );
};
