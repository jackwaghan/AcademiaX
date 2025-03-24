import { GraduationCap } from "lucide-react";
import Image from "next/image";
import Template from "../public/Template-Marks.png";
import Link from "next/link";
export default function Home() {
  return (
    <div className="w-dvw h-svh overflow-hidden px-2 font-poppins">
      <nav className="relative max-w-6xl mx-auto mt-5 border border-foreground/10 bg-foreground/5 backdrop-blur-3xl rounded-xl  h-[60px] flex items-center justify-between px-4">
        <div className="flex items-center justify-center gap-4 text-xl ">
          <GraduationCap size={30} className="stroke-orange-500" />
          <h1>AcademiaX SRM</h1>
        </div>
        <Link
          href={"/auth/login"}
          className="bg-orange-500 text-black px-3 py-1 md:px-4 md:py-2 rounded-lg hover:scale-90 duration-300 cursor-pointer font-semibold"
        >
          Login
        </Link>
        <div className="absolute inset-0 bg-orange-500/20 blur-3xl -z-10" />
      </nav>
      <main className="  max-w-5xl mx-auto items-center pt-20 flex flex-col justify-center">
        <h1 className="text-4xl md:text-7xl text-center leading-tight ">
          A Modern Webscraper for{" "}
          <span className="font-semibold text-orange-500">SRM Academia</span>
        </h1>
        <p className="px-2 text-md md:text-xl mt-10 text-foreground/80  flex items-center max-w-3xl text-center">
          Academix SRM helps you manage your attendance, marks, timetable, and
          more, all in one beautifully designed platform tailored for SRM
          students.
        </p>
        <Link
          href={"/auth/login"}
          className="mt-10 bg-orange-500 text-black px-3 py-1 md:px-4 md:py-2 rounded-lg hover:scale-90 duration-300 cursor-pointer font-semibold"
        >
          Get Started
        </Link>
      </main>
      <div className="  w-full flex items-center justify-center py-15 px-4">
        <div className="relative p-2 bg-foreground/5 rounded-lg  border border-foreground/10 ">
          <Image
            alt="App Template"
            src={Template}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            placeholder="blur"
            width={1700}
            height={1200}
            priority
            quality={85}
            className="rounded-lg "
          ></Image>
          <div className="absolute inset-0 bg-orange-500/90 blur-3xl -z-10" />
        </div>
      </div>
    </div>
  );
}
