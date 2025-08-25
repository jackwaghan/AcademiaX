"use client";
import { useCourse, useMarks } from "@/hooks/query";
import React from "react";
import { MarkDetail } from "srm-academia-api";
import { GlobalLoader } from "../components/loader";

const Page = () => {
  const { data, isPending } = useMarks();
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

const Data = ({ data, category }: { data: MarkDetail[]; category: string }) => {
  const course = useCourse().data;
  const filteredData = data.filter(
    (i) => i.category.toLowerCase() === category
  );
  return (
    <div className=" py-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full grid gap-4 px-2 lg:px-5">
      {filteredData.map((item, i) => {
        const courseList = course?.find((i) => i.courseCode === item.course);
        return (
          <div
            key={i}
            className="flex flex-col items-center gap-3 rounded-xl apply-border-md bg-[#16171b] min-h-50 shadow-2xl  "
          >
            <div className="w-full h-full text-white/70  flex flex-col gap-4 ">
              <div className="flex justify-between w-full px-2 min-h-14 items-center border-b border-white/5 gap-4 ">
                <div className="flex gap-1  px-1 py-0.5  text-sm items-center w-[60%]">
                  {courseList?.courseTitle}
                </div>

                <div className="flex gap-1 bg-white/5  px-1 py-0.5 rounded-full text-sm apply-border-sm pl-2">
                  <h1 className="flex items-center  text-sm  ">Credit</h1>
                  <span className="px-2 py-0.5 rounded-full text-sm  apply-border-sm  bg-black text-green-400">
                    {courseList?.courseCredit}
                  </span>
                </div>
              </div>
              <div className=" flex items-center justify-center w-full h-full mx-auto  ">
                {item.marks.length === 0 ? (
                  <div className="text-red-400">No Marks</div>
                ) : (
                  <MarkData data={item} />
                )}
              </div>
              <div className="flex justify-between w-full px-2 min-h-12 items-center  border-white/5">
                <div className="flex bg-white/5  pl-2 pr-1 py-0.5 rounded-full text-sm apply-border-sm items-center gap-2">
                  <h1 className="capitalize">{courseList?.courseCode}</h1>
                  <span
                    className={`px-2 py-0.5 rounded-full text-sm  apply-border-sm bg-black text-blue-400`}
                  >
                    {courseList?.courseType.charAt(0)}
                  </span>
                </div>
                <div className="flex bg-white/5  pl-2 pr-1 py-0.5 rounded-full text-sm apply-border-sm items-center gap-2">
                  <h1 className="capitalize">{item.total.obtained}</h1>
                  <span
                    className={`px-2 py-0.5 rounded-full text-sm  apply-border-sm bg-black text-blue-400`}
                  >
                    {item.total.maxMark}
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

const MarkData = ({ data }: { data: MarkDetail }) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 px-2 text-sm text-white/50">
      {data.marks.map((item, i) => {
        return (
          <div
            key={i}
            className="flex  items-center justify-between px-3 w-full"
          >
            <h1 className="w-[60%]">{item.exam}</h1>
            <div className="flex gap-2 ">
              {" "}
              <h1>{item.obtained}</h1> |<h1>{item.maxMark}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};
