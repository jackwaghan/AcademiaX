"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSidebar, useUser } from "@/lib/zustand";
import { useWindow } from "@/lib/hook";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useWindow();
  const { isOpen } = useSidebar();
  const { loading } = useUser();
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/getdata", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      console.log("Data Fetch");
      if (data.error) {
        console.log(data.error);
      }
      useUser.setState({ user: data.user });
      useUser.setState({ marks: data.marks });
      useUser.setState({ attendance: data.attendance });
      useUser.setState({ timetable: data.timetable.data });
      useUser.setState({ loading: false });
    };
    fetchData();
  }, []);

  if (isMobile === undefined) return null;

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen justify-center items-center flex">
          <p className="animate-pulse">Fetching Data...</p>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default AppLayout;
