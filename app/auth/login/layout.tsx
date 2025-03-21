import { GraduationCap, House } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login - AcademiaX",
  description: "Login to AcademiaX",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-dvw h-dvh bg-foreground/5 ">
      <div className="min-h-[60px] w-full  items-center justify-between flex border-b border-foreground/15 px-4 bg-foreground/5 ">
        <div className="flex items-center gap-4 ">
          {" "}
          <House size={30} className="stroke-blue-500" />
          <div className="px-4 py-2 rounded bg-foreground/5 border border-foreground/15 hover:scale-95 duration-300 cursor-pointer">
            <Link href={`${process.env.NEXT_PUBLIC_DOMAIN}/`}>Homepage</Link>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col  h-full overflow-hidden pb-[100px] md:pb-[250px] ">
        <div className="h-[300px] w-full text-3xl md:text-5xl font-geist-mono  items-center justify-center text-orange-500 flex gap-6 ">
          <GraduationCap className="stroke-orange-500" size={60} />
          <p> AcademiaX</p>
        </div>

        {children}
      </div>
    </div>
  );
}
