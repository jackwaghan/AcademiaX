"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSidebar, useUser } from "@/lib/zustand";
import { useWindow } from "@/lib/hook";
import {
  Attendance,
  Dayorder,
  Marks,
  Planner,
  TimetableData,
  User,
} from "@/Types/type";
import { X } from "lucide-react";

const AppLayout = ({
  children,
  data,
  version,
}: {
  children: React.ReactNode;
  version: string;
  data: {
    user: User;
    marks: Marks;
    attendance: Attendance;
    timetable: { data: TimetableData };
    dayorder: Dayorder;
    planner: Planner;
    NewVersion: string;
  };
}) => {
  const isMobile = useWindow();
  const { isOpen } = useSidebar();
  const { NewVersion } = useUser();
  const [update, setUpdate] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("version") !== version) setUpdate(true);
  }, [version]);

  React.useEffect(() => {
    useUser.setState({ user: data.user });
    useUser.setState({ marks: data.marks });
    useUser.setState({ attendance: data.attendance });
    useUser.setState({ timetable: data.timetable.data });
    useUser.setState({ dayorder: data.dayorder });
    useUser.setState({ planner: data.planner });
    if (update) {
      useUser.setState({ NewVersion: true });
      localStorage.setItem("version", version);
    }
  }, [data, update, version]);
  React.useEffect(() => {
    if (isMobile === undefined) return;
    if (isMobile) {
      useSidebar.setState({ isOpen: false });
    }
  }, [isMobile]);
  if (isMobile === undefined) return null;

  return (
    <div className="flex h-screen">
      {NewVersion && <Updates />}
      <Sidebar />
      <div className="flex-1 h-screen flex flex-col ">
        <Header />
        <div
          className={`flex-1 mt-[50px] md:overflow-y-auto ${isOpen && !isMobile ? "pl-[250px]" : ""} duration-300 transition-all`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

const Updates = () => {
  return (
    <div className="fixed w-screen h-screen z-50 items-center justify-center flex bg-black/50 top-0 left-0">
      <div className="mx-4 w-[500px] h-[350px] bg-background rounded-lg shadow-foreground/10 p-5 border border-foreground/10">
        <div className="flex items-center justify-between">
          <p className="text-2xl  font-semibold">Updates v1.1.0 🥳</p>
          <X
            onClick={() => useUser.setState({ NewVersion: false })}
            className="cursor-pointer p-0.5 border border-foreground/10 rounded "
            size={30}
          />
        </div>
        <div className="flex flex-col gap-2 mt-5 ">
          <div className="flex gap-4 items-center px-2 ">
            <div className="w-4 md:w-3 h-2 bg-green-500 rounded-full " />
            <p>
              Added functionality to automatically determine if a course
              includes an End-Semester.
            </p>
          </div>
          <div className="flex gap-4 items-center px-2 ">
            <div className="w-2 h-2 bg-green-500 rounded-full " />
            <p>
              Improved the logic used for the attendance prediction and added
              some enhancements to the UI.
            </p>
          </div>
          <div className="flex gap-4 items-center px-2 ">
            <div className="w-2 h-2 bg-green-500 rounded-full " />
            <p>Overall performance of the app is increased.</p>
          </div>
        </div>

        <div className="w-full justify-center flex mt-[30px]">
          <a
            href="https://chat.whatsapp.com/B6a15jYEKgI1UD7QzX39cM"
            className="bg-green-600/80 text-white px-4 py-2 mt-5 rounded-md hover:bg-green-600 duration-300 transition-all hover:scale-98"
          >
            Join What&apos;sapp Group
          </a>
        </div>
      </div>
    </div>
  );
};
