import Link from "next/link";
import React from "react";
import Image from "next/image";
import Icon from "@/../public/favicon.svg";
const Header = ({ value }: { value: string }) => {
  return (
    <div className="w-full min-h-20 flex items-center justify-center lg:px-0 px-3">
      <div className="relative max-w-5xl w-full flex px-4 h-[70%] items-center justify-between apply-border-md rounded-lg bg-white/5 backdrop-blur-xs ">
        <div className="absolute inset-0 bg-blue-400/30 blur-3xl -z-10 " />
        <div className="flex gap-4 items-center justify-center">
          <Image loading="lazy" src={Icon} width={25} height={25} alt="icon" />
          <h1 className="text-lg tracking-wide">
            AcademiaX <span className="text-white/50 text-sm ">v2</span>
          </h1>
        </div>
        {value !== "root" ? (
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg apply-border-md bg-white/5"
          >
            Back
          </Link>
        ) : (
          <Link
            href="/auth/login"
            className="px-3 py-1.5 rounded-lg apply-border-md bg-white/5"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
