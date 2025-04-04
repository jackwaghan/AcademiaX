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
import { Updates } from "./UpdateBox";

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
