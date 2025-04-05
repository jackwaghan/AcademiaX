import { GithubIcon, GraduationCap } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
export default async function Home() {
  const token = (await cookies()).get("token")?.value;
  return (
    <div className="w-dvw h-svh overflow-hidden px-4 md:px-0 font-poppins">
      <nav className="relative max-w-6xl mx-auto mt-5 border border-foreground/10 bg-foreground/5 backdrop-blur-3xl rounded-xl  h-[60px] flex items-center justify-between px-4">
        <div className="flex items-center justify-center gap-4 text-xl ">
          <GraduationCap size={30} className="stroke-orange-500" />
          <h1>AcademiaX SRM</h1>
        </div>
        <a
          href="https://github.com/jackwaghan/AcademiaX-SRM"
          target="_blank"
          className="bg-orange-500 text-black px-3 py-1 md:px-4 md:py-2 rounded-lg hover:scale-95 duration-300 cursor-pointer font-semibold"
        >
          <GithubIcon size={20} className="inline" />
        </a>
        <div className="absolute inset-0 bg-orange-500/20 blur-3xl -z-10" />
      </nav>
      <div className="mx-auto w-fit mt-15 ">
        <h1 className="relative px-4 py-1 text-sm md:text-lg rounded-3xl bg-foreground/10 border border-foreground/15 shadow shadow-orange-400  text-center ">
          AcademiaX is now Open Source!{" "}
          <span className="md:text-7xl text-4xl  absolute md:-right-30 -right-15 md:-bottom-2 bottom-0 ">
            🎉
          </span>
        </h1>
      </div>

      <main className="  max-w-5xl mx-auto items-center mt-5 flex flex-col justify-center">
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
          href={token ? "/app/timetable" : "/auth/login"}
          className="mt-10 bg-orange-500 text-black px-3 py-1 md:px-4 md:py-2 rounded-lg hover:scale-95 duration-300 cursor-pointer font-semibold"
        >
          {token ? "Open" : "Get Started"}
        </Link>
      </main>
      <div className="  w-full flex items-center justify-center py-15 px-4">
        <div className="relative p-2 bg-foreground/5 rounded-lg  border border-foreground/10 ">
          <Image
            alt="App Template"
            src="/screenshots/LandingPage-2.png"
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
