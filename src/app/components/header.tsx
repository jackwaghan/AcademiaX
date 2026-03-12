"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import Icon from "@/../public/favicon.svg";

const links = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
] as const;

const Header = ({ value }: { value: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex items-center justify-center lg:px-0 px-3 py-4">
      <div className="relative max-w-5xl w-full px-4 py-3 md:py-0 md:h-14 apply-border-md rounded-lg bg-white/5 backdrop-blur-xs flex flex-col justify-center">
        <div className="absolute inset-0 bg-blue-400/30 blur-3xl -z-10 " />
        <div className="flex items-center gap-3">
          <Link href="/" className="flex gap-3 items-center shrink-0">
            <Image
              loading="lazy"
              src={Icon}
              width={25}
              height={25}
              alt="AcademiaX icon"
            />
            <h1 className="text-lg tracking-wide">
              AcademiaX <span className="text-white/50 text-sm ">v2</span>
            </h1>
          </Link>

          <nav className="hidden md:flex flex-1 items-center justify-center gap-6 text-sm text-white/70">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-white/70 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0 ml-auto">
            {value !== "root" ? (
              <Link
                href="/"
                className="px-3 py-1.5 rounded-lg apply-border-md bg-white/5 text-sm md:text-base "
              >
                Back
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="px-3 py-1.5 rounded-lg apply-border-md bg-white/5 text-sm md:text-base "
              >
                Login
              </Link>
            )}

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-md bg-white/5 apply-border-md transition-colors duration-200 hover:bg-white/10"
              aria-label="Toggle navigation"
            >
              <span className="relative flex flex-col gap-[5px]">
                <span
                  className={`block h-[2px] w-4 rounded-full bg-white transition-transform duration-200 ${
                    open ? "translate-y-[3.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] w-4 rounded-full bg-white transition-transform duration-200 ${
                    open ? "-translate-y-[3.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <nav
          className={`md:hidden overflow-hidden transition-all duration-200 origin-top ${
            open ? "max-h-32 mt-3 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 text-sm text-white/75">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-full text-left px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
