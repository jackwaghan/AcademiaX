"use client";
import { useCourse } from "@/hooks/query";
import React from "react";
import { CourseDetail } from "srm-academia-api";
import { GlobalLoader } from "../components/loader";

const Page = () => {
  const { data, isPending } = useCourse();
  if (isPending) return <GlobalLoader className="h-10 w-10 text-blue-400" />;
  if (!data || data.length === 0)
    return (
      <div className="flex h-full w-full justify-center items-center">
        No data found
      </div>
    );

  return <Data data={data} />;
};

export default Page;

const Data = ({ data }: { data: CourseDetail[] }) => {
  return (
    <div className=" py-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full grid gap-4 px-2 lg:px-5">
      {data.map((item, i) => {
        return (
          <div
            key={i}
            className="flex flex-col items-center gap-3 rounded-xl apply-border-md bg-[#16171b] min-h-50 shadow-2xl  "
          >
            <div className="w-full h-full text-white/70  flex flex-col pb-4 gap-4 ">
              <div className="flex justify-between w-full px-2 min-h-12 items-center border-b border-white/5">
                <div className="flex  bg-white/5  px-1 py-0.5 rounded-full text-sm apply-border-sm">
                  <h1 className=" px-2 py-0.5 text-sm  ">{item.courseCode}</h1>
                  <span className="px-2 py-0.5 rounded-full text-sm  apply-border-sm  backdrop-blur-3xl text-blue-400 bg-black">
                    {item.courseType.charAt(0)}
                  </span>
                </div>
                <div className="flex  bg-white/5  px-1 py-0.5 rounded-full text-sm apply-border-sm">
                  <span className="px-2 py-0.5  text-sm   backdrop-blur-3xl ">
                    Credit
                  </span>
                  <h1 className=" px-2 py-0.5 rounded-full text-sm  apply-border-sm bg-black text-green-400">
                    {item.courseCredit}
                  </h1>
                </div>
              </div>
              <div className=" flex flex-col gap-2 px-3  w-full h-full  text-sm text-white/50 ">
                <h1 className="flex justify-between items-center">
                  <span>Course</span>
                  <span className="w-[70%]">{item.courseTitle}</span>
                </h1>
                <h1 className="flex justify-between items-center">
                  <span>Faculty</span>
                  <span className="w-[70%]">
                    {item.courseFaculty.split("(")[0]}
                  </span>
                </h1>
                <h1 className="flex justify-between items-center">
                  <span>Type</span>
                  <span className="w-[70%]">{item.courseType}</span>
                </h1>
                <h1 className="flex justify-between items-center">
                  <span>Slot</span>
                  <span className="w-[70%]">{item.courseSlot.join(" , ")}</span>
                </h1>
                <h1 className="flex justify-between items-center">
                  <span>Class Room</span>
                  <span className="w-[70%]">{item.courseRoomNo}</span>
                </h1>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
