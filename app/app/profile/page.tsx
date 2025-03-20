"use client";
import { useUser } from "@/lib/zustand";
import React from "react";

const Page = () => {
  const { setUser, user } = useUser();
  console.log(user);
  React.useEffect(() => {
    const fetchProfile = async () => {
      await fetch("/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error(data.error);
            return;
          }
          setUser(data.user);
        });
    };
    fetchProfile();
  }, [setUser]);

  return (
    <div className="flex flex-1 items-center justify-center ">
      {/* <div className="flex flex-col gap-4 p-5 border border-foreground/15 rounded-lg text-xl">
        <div className="h-[30px] flex gap-4 items-center ">
          Register Number : {!loading ? user.roll : <Loader />}
        </div>
        <div className="h-[30px] flex gap-4 items-center ">
          Name : {!loading ? user.name : <Loader />}
        </div>
        <div className="h-[30px] flex gap-4 items-center ">
          Program : {!loading ? user.program : <Loader />}
        </div>
        <div className="h-[30px] flex gap-4 items-center ">
          Department : {!loading ? user.department : <Loader />}
        </div>
        <div className="h-[30px] flex gap-4 items-center ">
          Specialization : {!loading ? user.specialisation : <Loader />}
        </div>
        <div className="h-[30px] flex gap-4 items-center ">
          Semester : {!loading ? user.semester : <Loader />}
        </div>
        <div className="h-[30px] flex gap-4 items-center ">
          Batch : {!loading ? user.batch : <Loader />}
        </div>
        <div className="h-[30px] flex gap-4 items-center ">
          Section : {!loading ? user.section : <Loader />}
        </div>
      </div> */}
    </div>
  );
};

export default Page;

const Loader = () => {
  return <div className="h-[25px] bg-foreground/10 rounded w-[200px] " />;
};
