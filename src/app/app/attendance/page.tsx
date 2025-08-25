"use client";
import { useAttendance } from "@/hooks/query";
import React from "react";
import { AttendanceDetail } from "srm-academia-api";
import { GlobalLoader } from "../components/loader";

const Page = () => {
  const { data, isPending } = useAttendance();
  if (isPending) return <GlobalLoader className="h-10 w-10 text-blue-400" />;
  if (!data || data.length === 0)
    return (
      <div className="flex h-full w-full justify-center items-center">
        No data found
      </div>
    );

  return (
    <div className="flex flex-col gap-4 py-2 ">
      <h1 className="text-2xl text-blue-400 ">Theory</h1>
      <Data data={data} category="theory" />
      <h1 className="text-2xl text-blue-400">Practical</h1>
      <Data data={data} category="practical" />
    </div>
  );
};

export default Page;

const Data = ({
  data,
  category,
}: {
  data: AttendanceDetail[];
  category: string;
}) => {
  const filteredData = data.filter(
    (i) => i.courseCategory.toLowerCase() === category
  );
  return (
    <div className=" py-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full grid gap-4 px-2 lg:px-5">
      {filteredData.map((item, i) => {
        return (
          <div
            key={i}
            className="flex flex-col items-center gap-3 rounded-xl apply-border-md bg-[#16171b] min-h-50 shadow-2xl  "
          >
            <div className="w-full h-full text-white/70  flex flex-col gap-4 ">
              <div className="flex justify-between w-full px-2 min-h-12 items-center border-b border-white/5">
                <div className="flex gap-1 bg-white/5  px-1 py-0.5 rounded-full text-sm apply-border-sm">
                  <h1 className=" px-2 py-0.5 rounded-full text-sm  apply-border-sm bg-black text-blue-400">
                    {item.courseConducted}
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-sm  apply-border-sm bg-white/5 backdrop-blur-3xl ">
                    {item.courseConducted - item.courseAbsent}
                  </span>
                </div>
                {item.courseCode}
                <span
                  className={`px-2 py-0.5 rounded-full   apply-border-sm bg-black apply-border-sm ${
                    Number(item.courseAttendance) >= 75
                      ? "text-green-400 "
                      : "text-red-400"
                  }`}
                >
                  {item.courseAttendance} %
                </span>
              </div>
              <div className=" flex items-center justify-center w-[80%] h-full mx-auto  ">
                {item.courseTitle}
              </div>
              <div className="flex justify-between w-full px-2 min-h-12 items-center  ">
                <h1 className=" px-3 py-1 rounded-full text-sm  apply-border-sm bg-black">
                  {item.courseCategory}
                </h1>
                <div className="flex gap-1 bg-white/5  pl-2 pr-1 py-0.5 rounded-full text-sm apply-border-sm items-center ">
                  <h1 className="capitalize">
                    {item.courseAttendanceStatus?.status}
                  </h1>
                  <span
                    className={`px-2 py-0.5 rounded-full text-sm  apply-border-sm bg-black ${
                      item.courseAttendanceStatus?.status === "required"
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {item.courseAttendanceStatus?.classes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
