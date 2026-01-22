import Image from "next/image";
import React from "react";
import LandingImage from "@/../public/Landing/LandingImage.png";
import { Github } from "lucide-react";
const HeroSection = () => {
  return (
    <div className="flex-1 flex flex-col ">
      <div className="lg:py-10 py-10  w-full container flex mx-auto flex-col justify-center items-center">
        <div className="flex items-center justify-center gap-2 apply-border-md pl-3 pr-1 lg:py-1 py-0.5 rounded-full lg:text-sm text-xs bg-white/5  ">
          <span className="relative mx-1 bg-blue-500 w-2 h-2 inset-0 rounded-full ">
            <span className=" absolute  w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          </span>
          Built with{" "}
          <span className="apply-border-md px-2 py-1 rounded-full text-sm bg-black flex gap-2 items-center justify-center">
            srm-academia-api
          </span>
        </div>
        <Content />
      </div>
      <div className="w-full flex justify-center items-center "></div>
    </div>
  );
};

export default HeroSection;

const Content = () => {
  return (
    <div className="py-10 flex flex-col w-full items-center justify-center gap-6 text-center">
      <h1 className="lg:text-7xl text-3xl font-extrabold leading-tight tracking-tight">
        Ditch the old SRM Academia.
      </h1>
      <p className="lg:text-xl text-base max-w-2xl font-normal opacity-80 px-4 mt-2">
        Discover a sleek and modern way to manage your academics - no clutter,
        just clarity.
      </p>
      <div className="flex justify-center gap-3 mt-6">
        <a
          href="https://github.com/jackwaghan/academiax"
          target="_blank"
          className="px-5 py-2 rounded-lg  bg-white/5 gap-4 flex items-center justify-between apply-inner-shadow-md"
        >
          <h1>Github</h1>
          <Github className="w-5 h-5" />
        </a>
      </div>
      <div className="relative bg-white/5 apply-border-md rounded-xl p-1 lg:p-2 mt-4 lg:w-[80%] w-[90%]">
        <div className="absolute inset-0 bg-blue-400/60 blur-3xl -z-10 " />
        <Image
          src={LandingImage}
          alt="Landing illustration showing a modern dashboard"
          className="w-full h-auto rounded-xl shadow-lg"
          priority
          fetchPriority="high"
          width={1006}
          height={499}
          quality={85}
        />
      </div>
    </div>
  );
};
