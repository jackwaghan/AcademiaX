"use client";

import { useUser } from "@/lib/zustand";
import React, { useRef, useState } from "react";
import { getCurrentMonth } from "./components/CurrentMonth";
import { getCurrentDate } from "./components/CurrentDay";

const Page = () => {
  const { planner } = useUser();

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const todayRef = useRef<HTMLDivElement | null>(null);
  // Ensure the selected month is valid when planner data loads
  React.useEffect(() => {
    if (planner && !planner[selectedMonth]) {
      const fallbackMonth = Object.keys(planner)[0]; // Default to first available month
      setSelectedMonth(fallbackMonth);
    }
  }, [planner, selectedMonth]);

  React.useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedMonth]);

  const today = getCurrentDate();

  if (!planner) return null;

  return (
    <div className="px-5   h-full">
      {/* Header */}
      <div className="sticky top-[50px] md:top-0 left-0 right-0 flex justify-between items-center mb-5 bg-background py-2   ">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          📅 Academic Calendar
        </h2>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-foreground/5 shadow-inner bg-foreground/10 text-white px-4 py-2 rounded-lg shadow-foreground/20  focus:outline-none cursor-pointer transition-all duration-300"
        >
          {Object.keys(planner).map((month) => (
            <option
              key={month}
              value={month}
              className="bg-background text-foreground"
            >
              {month}
            </option>
          ))}
        </select>
      </div>
      {/* Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-5 pb-5 container mx-auto">
        {planner[selectedMonth].map((day, i) => {
          const isToday =
            today === day.date && selectedMonth === getCurrentMonth();

          return (
            <div
              key={i}
              ref={isToday ? todayRef : null}
              className={`bg-foreground/5 p-5 rounded-lg flex flex-col gap-3 ${isToday ? "border-2 border-orange-500" : "shadow-foreground/20 shadow-inner "}`}
            >
              <div className="flex justify-between items-center">
                <p className="text-2xl text-blue-500 font-semibold">
                  {day.date}
                </p>
                <p className="text-lg text-foreground/60 font-semibold ">
                  {day.day}
                </p>
              </div>
              <p
                className={`${day.dayo === " - " ? "text-red-500" : "text-orange-300"} `}
              >
                {" "}
                Day Order - {day.dayo === " - " ? "Holiday" : day.dayo}
              </p>
              <p className="text-sm h-full items-center  text-green-600 flex">
                {day.sp}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
