"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSidebar, useUser } from "@/lib/zustand";
import { useWindow } from "@/lib/hook";
import { Attendance, Dayorder, Marks, TimetableData, User } from "@/Types/type";

const AppLayout = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: {
    user: User;
    marks: Marks;
    attendance: Attendance;
    timetable: { data: TimetableData };
    dayorder: Dayorder;
  };
}) => {
  const isMobile = useWindow();
  const { isOpen } = useSidebar();
  React.useEffect(() => {
    useUser.setState({ user: data.user });
    useUser.setState({ marks: data.marks });
    useUser.setState({ attendance: data.attendance });
    useUser.setState({ timetable: data.timetable.data });
    useUser.setState({ dayorder: data.dayorder });
  }, [data]);
  React.useEffect(() => {
    if (isMobile === undefined) return;
    if (isMobile) {
      useSidebar.setState({ isOpen: false });
    }
  }, [isMobile]);
  if (isMobile === undefined) return null;

  return (
    <div className="flex h-screen ">
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
