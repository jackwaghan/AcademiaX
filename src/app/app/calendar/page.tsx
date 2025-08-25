"use client";
import { useCalendar } from "@/hooks/query";
import React, { useState, useRef, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { Month } from "srm-academia-api";
import { GlobalLoader } from "../components/loader";
import { formattedMonth, getIndex } from "@/utils/currentMonth";
const Page = () => {
  const { data, isPending } = useCalendar();
  if (isPending) return <GlobalLoader className="h-10 w-10 text-blue-400" />;
  if (!data || data.length === 0)
    return (
      <div className="flex h-full w-full justify-center items-center">
        No data found
      </div>
    );
  return <DayChange data={data} />;
};

export default Page;

const DayChange = ({ data }: { data: Month[] }) => {
  const [month, setMonth] = useState<number>(getIndex({ data }));
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="w-full h-[15%]  py-5">
        <div className="relative max-w-100 mx-auto h-full flex items-center justify-center text-4xl text-white/80 lg:text-5xl">
          {data[month].month}
          <div
            onClick={() => {
              if (month > 0) {
                setMonth(month - 1);
              }
            }}
            className="absolute top-1/2  -translate-y-1/2 left-10   bg-white/5  p-1 apply-border-sm rounded-lg cursor-pointer shadow-2xl"
          >
            <Minus className="w-5 h-5" />
          </div>
          <div
            onClick={() => {
              if (month < data.length - 1) {
                setMonth(month + 1);
              }
            }}
            className="absolute top-1/2 -translate-y-1/2 right-10  bg-white/5  p-1 apply-border-sm rounded-lg cursor-pointer shadow-2xl"
          >
            <Plus className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto flex">
        <Data data={data} month={month} formattedMonth={formattedMonth} />
      </div>
    </div>
  );
};

const Data = ({
  data,
  month,
  formattedMonth,
}: {
  data: Month[];
  month: number;
  formattedMonth: string;
}) => {
  const today = new Date();
  const currentDate = today.getDate().toString();
  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [month]);

  return (
    <div className="py-3 h-full w-full grid px-1 sm:px-2 md:px-4 lg:px-6 xl:px-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
      {data[month].days.map((item, i) => {
        const holiday = item.dayOrder === "-";
        const isCurrent =
          item.date === currentDate && formattedMonth === data[month].month;
        return (
          <div
            key={i}
            ref={isCurrent ? currentRef : undefined}
            className={`w-full h-full flex flex-col shadow-xl p-3 sm:p-4 gap-4 lg:min-h-50 min-h-40 ${
              holiday ? "bg-red-400/10" : "bg-[#18191d]"
            } ${
              isCurrent
                ? "border-2 border-dotted border-blue-400 "
                : "apply-border-md "
            }`}
          >
            <div className="flex justify-between items-center w-full min-h-14 px-1 sm:px-2 ">
              <div className="flex flex-col items-center gap-0.5 text-xl text-white/60 ">
                <span className="font-semibold ">{item.date}</span>
                <h1 className=" ">{item.day}</h1>
              </div>
              {isCurrent && (
                <span className="background-rounded apply-border-sm flex gap-2 items-center justify-center">
                  <span className="relative flex h-2 w-2 ">
                    <span className="absolute animate-ping inset-0 rounded-full bg-blue-400 opacity-75"></span>
                    <span className="rounded-full h-1.5 w-1.5 bg-blue-500 apply-inner-shadow-sm m-auto"></span>
                  </span>
                  <h1>Today</h1>
                </span>
              )}
              <span className="text-3xl text-green-400/60">
                {item.dayOrder}
              </span>
            </div>
            {item.event.length !== 0 && (
              <div className="text-sm flex justify-start items-end-safe text-red-400/60 h-full overflow-y-auto">
                {item.event}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
