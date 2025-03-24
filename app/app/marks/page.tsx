"use client";

import { useUser } from "@/lib/zustand";
import { GraduationCap, School } from "lucide-react";
import React from "react";
import Error from "../components/Error";

const Page = () => {
  const [mount, setMount] = React.useState(false);
  const { marks, attendance, user } = useUser();
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    setMount(true);
  }, []);
  if (marks === null) return <Error error="Marks not found" />;
  if (user === null) return <Error error="user not found" />;
  if (attendance === null)
    return (
      <Error
        error="Attendance not
  found"
      />
    );

  return (
    <div className="mx-auto max-w-7xl py-10 md:px-4 ">
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-0 ${mount ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"} transition-all duration-500`}
      >
        <div className="h-[150px] justify-center px-5 rounded-lg bg-foreground/5 border border-foreground/10 flex flex-col gap-4">
          <p className="text-xl text-blue-500 font-semibold">
            Current Semester
          </p>
          <div className="flex items-center justify-between ">
            <p className="text-4xl font-semibold">{user.semester}</p>
            <div className="bg-blue-200 rounded-full p-2">
              <GraduationCap size={30} className="stroke-blue-500" />
            </div>
          </div>
        </div>
        <div>
          <div className="h-[150px] justify-center px-5 rounded-lg bg-foreground/5 border border-foreground/10 flex flex-col gap-4 ">
            <p className="text-2xl text-blue-500 font-semibold">Section</p>
            <div className="flex items-center justify-between">
              <p className="text-4xl font-semibold">{user.section}</p>
              <div className="p-2 bg-blue-200 rounded-full">
                <School className="stroke-blue-500 " size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-4 md:px-0 ${mount ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"} delay-200 transition-all duration-500`}
      >
        {marks.map((mark, i) => {
          const getMark = mark.marks.map((item) => item);
          const value = getMark.map((item) => {
            return {
              name: item.name,
              mark: item.mark,
              total: item.total,
            };
          });

          const getFaculty = attendance.find((item) => item.code === mark.code);
          return (
            <div
              key={i}
              className="p-4 border border-foreground/10 rounded-lg bg-foreground/5 flex flex-col gap-3 "
            >
              <div className="flex justify-between gap-2">
                <p className="text-md">{mark.name}</p>
                <div className="flex gap-2  text-green-500">
                  <p>Credit</p>
                  <span>-</span>
                  <p>{mark.credit}</p>
                </div>
              </div>
              <div className="flex gap-2 items-center text-foreground/50 text-sm">
                <p>{mark.code}</p>
                <span>-</span>
                <p>{mark.type}</p>
              </div>
              <div className="flex gap-2 items-center text-blue-500 border-b pb-2">
                <p>Faculty</p>
                <span>-</span>
                <p>{getFaculty?.faculty}</p>
              </div>
              <div className="mt-2 flex flex-col gap-2 justify-center">
                {value.length !== 0 ? (
                  <div>
                    {value.map((item, i) => {
                      return (
                        <div key={i} className="flex flex-col ">
                          {" "}
                          <div className="flex justify-between items-center">
                            <p className="p-2 ">{item.name}</p>
                            <div className="flex gap-1 items-center bg-orange-500/80 px-2 py-0.5 text-background font-bold rounded-full text-sm">
                              <p>{item.mark}</p>
                              <span>/</span>
                              <p>{item.total}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {/* <div className="flex justify-between p-2">
                      <p>Total</p>
                      <div className="px-3 py-0.5 bg-orange-500/80 text-background font-bold rounded-full text-sm flex gap-1">
                        <p>{totalMark}</p>
                        <span>/</span>
                        <p>{Math.total}</p>
                      </div>
                    </div> */}
                  </div>
                ) : (
                  <div className="text-red-500 flex  items-center justify-center">
                    <p>No Marks</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
