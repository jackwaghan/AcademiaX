"use client";
import React from "react";
import App from "./components/AttendancePieBar";
import { useWindow } from "@/lib/hook";
import { CircleAlert, CircleCheck } from "lucide-react";
import { useUser } from "@/lib/zustand";
import Error from "../components/Error";
import Prediction from "./components/Prediction";

export const runtime = "edge";

const Suggestion = (value: number) => {
  switch (true) {
    case value >= 90 && value <= 100:
      return "Excellent";
    case value >= 75 && value < 90:
      return "Good";
    case value < 75:
      return "At risk";
  }
};

const Page = () => {
  const { attendance } = useUser();
  const isMobile = useWindow();
  const [mount, setMount] = React.useState(false);
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    setMount(true);
  }, []);
  if (attendance === null) return <Error error="Attendance not found" />;
  return (
    <div className=" px-4 ">
      <div className="h-full mx-auto max-w-7xl pt-10">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6  rounded-lg p-5 bg-foreground/5 shadow-inner border border-foreground/5 shadow-foreground/30  ${mount ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"} transition-all duration-500`}
        >
          <div className="flex flex-col ">
            <p className="text-xl text-center  text-orange-500 md:text-2xl">
              Overall Attendance
            </p>
            <p className="text-foreground/60 text-center mt-3 text-sm sm:text-base">
              Cumulative attendance across all subjects
            </p>
            <div
              className={`flex items-center justify-center ${isMobile ? "h-[350px]" : "h-full"}`}
            >
              <App />
            </div>
          </div>
          <div className="flex flex-col gap-4 px-5 justify-center">
            {attendance.map((item, i) => {
              return (
                <div key={i} className="flex gap-2 items-center">
                  <p className="p-1 text-sm sm:text-base text-blue-500">{i}</p>
                  <span>-</span>
                  <p className="text-sm sm:text-base">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="flex w-full justify-between mt-5 ">
            <h1
              className={`text-lg md:text-2xl  text-orange-300 ${!show && "opacity-0"}`}
            >
              OD / ML Predictions
            </h1>

            <button
              className={`bg-blue-600 hover:scale-98 hover:bg-blue-500 cursor-pointer text-foreground px-3 py-1 rounded transition-all duration-300 flex items-center gap-2 ${
                mount ? "opacity-100 scale-100 " : "opacity-0 scale-75 "
              }`}
              onClick={() => setShow(!show)}
            >
              <p className="text-sm sm:text-base">
                {show ? "Close Prediction" : "Show Prediction"}
              </p>
            </button>
          </div>
          {show && <Prediction />}
        </div>
        <div className="py-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6  ">
          {attendance.map((item, i) => {
            const marginText = item.margin < 0 ? "Required" : "Margin";
            const marginvalue = Math.abs(item.margin);
            const getSuggestion = Suggestion(Number(item.percetage));
            const suggestionValue =
              getSuggestion === "At risk"
                ? "text-red-500"
                : getSuggestion === "Good"
                  ? "text-blue-500"
                  : "text-green-500";

            const getIcon =
              getSuggestion === "At risk" ? (
                <CircleAlert className="stroke-red-500" size={20} />
              ) : getSuggestion === "Good" ? (
                <CircleCheck className="stroke-blue-500" size={20} />
              ) : (
                <CircleCheck className="stroke-green-500" size={20} />
              );

            const classAttended = Number(item.conducted) - Number(item.absent);
            return (
              <div
                key={i}
                className={`flex flex-col justify-between border border-foreground/5 shadow-inner shadow-foreground/10 rounded-lg p-4 bg-foreground/5 backdrop-blur-3xl ${mount ? "translate-y-0 opacity-100 " : "translate-y-20 opacity-0"} transition-all  delay-200 duration-500`}
              >
                <div className="flex justify-between border-b pb-5  border-foreground/10 w-full gap-2 ">
                  <div className="flex flex-col gap-2 w-full">
                    <p>{item.title}</p>
                    <div className="text-sm text-foreground/50 flex gap-2 ">
                      <p className="">{item.code}</p>
                      <span>-</span>
                      <p>{item.category}</p>
                    </div>
                  </div>
                  <div className={`${suggestionValue} `}>
                    <p className="px-2 py-1 text-sm border border-foreground/10 flex gap-1 rounded-full bg-background shadow-2xl text-center">
                      {item.percetage}
                      <span>%</span>
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div
                    className={`${suggestionValue} flex gap-2 items-center `}
                  >
                    {getIcon}
                    <p>{getSuggestion}</p>
                  </div>
                  <div
                    className={`${suggestionValue} flex items-center gap-2 `}
                  >
                    <p>{marginText}</p>
                    <span>{marginvalue}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 ">
                  <p className="text-orange-300">Class Attended</p>
                  <div className="flex gap-1 items-center  bg-orange-300 text-background font-bold px-2 py-0.5 rounded-full text-sm">
                    <p>{classAttended}</p>
                    <span>/</span>
                    <p>{item.conducted}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
