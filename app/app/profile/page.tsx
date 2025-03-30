"use client";
import { useUser } from "@/lib/zustand";
import Image from "next/image";
import React from "react";

export const runtime = "edge";

const Page = () => {
  const { user } = useUser();
  const [mount, setMount] = React.useState(false);
  React.useEffect(() => {
    setMount(true);
  }, []);
  return (
    <div className="max-w-7xl mx-auto h-full">
      <div className="flex items-center flex-col h-full pt-[100px] px-5 ">
        <Image
          src="https://img.freepik.com/premium-vector/3d-vector-icon-simple-blue-user-profile-icon-with-white-features_6011-1575.jpg"
          alt="profile"
          width={100}
          height={100}
          className={`rounded-full ${mount ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"} transition-all duration-500`}
        />
        <div
          className={`mt-20 bg-foreground/5 shadow-inner shadow-orange-300 border border-foreground/5   p-5 rounded-lg w-full  md:w-[500px] flex flex-col gap-5 text-foreground/60 ${mount ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"} transition-all duration-500 delay-200`}
        >
          <p className="text-lg flex justify-between">
            <span className="text-foreground">Name</span>
            {user?.name}
          </p>
          <p className="text-lg flex justify-between">
            <span className="text-foreground">Register Number</span>
            {user?.roll}
          </p>
          <p className="text-lg flex justify-between">
            <span className="text-foreground">Section</span>
            {user?.section}
          </p>
          <p className="text-lg flex justify-between">
            <span className="text-foreground">Department</span>
            {user?.specialisation}
          </p>
          <p className="text-lg flex justify-between">
            <span className="text-foreground">Semester</span>
            {user?.semester}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
