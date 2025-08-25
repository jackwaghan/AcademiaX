"use client";
import { useAttendance, useCalendar, useTimetable } from "@/hooks/query";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { AttendanceDetail, DaySchedule } from "srm-academia-api";
import { GlobalLoader } from "../components/loader";
const Page = () => {
  const { data, isPending } = useTimetable();
  if (isPending) return <GlobalLoader className="h-10 w-10 text-blue-400" />;
  if (!data)
    return (
      <div className="flex h-full w-full justify-center items-center">
        No data found
      </div>
    );
  return <DayChange data={data} />;
};

export default Page;

const DayChange = ({ data }: { data: DaySchedule[] }) => {
  const day = data?.map((i) => i.dayOrder.split(" ")[1]);
  const [today, setToday] = useState<number>();
  const [dayOrder, setDayOrder] = useState<number>(0);
  const {
    data: calendarData,
    isLoading: calendarLoading,
    isError: calendarError,
  } = useCalendar();

  React.useEffect(() => {
    if (calendarData) {
      const now = new Date();
      const monthsShort = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const formattedMonth = `${monthsShort[now.getMonth()]} '${String(
        now.getFullYear()
      ).slice(-2)}`;
      const monthObj = calendarData.find((m) => m.month === formattedMonth);
      if (monthObj) {
        const todayDate = String(now.getDate());
        const todayDay = monthObj.days.find((d) => d.date === todayDate);
        if (todayDay) {
          const todayDayOrder = Number(todayDay.dayOrder);
          if (!isNaN(todayDayOrder)) {
            setToday(todayDayOrder);
            setDayOrder(todayDayOrder - 1);
          }
        }
      }
    }
  }, [calendarData]);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="w-full flex items-center justify-center gap-3 ">
        {/* Today */}
        <div className="flex  bg-white/5  px-1 py-0.5 rounded-full text-sm apply-border-sm">
          <h1 className=" px-2 py-0.5 text-sm ">Today</h1>
          <span
            className={`px-2.5 py-0.5 rounded-full text-sm  apply-border-sm  backdrop-blur-3xl bg-black items-center flex ${
              calendarLoading
                ? "text-blue-400"
                : today === 0 || calendarError
                ? "text-red-400"
                : "text-blue-400"
            }`}
          >
            {calendarLoading ? (
              <GlobalLoader className="w-4 h-4" />
            ) : calendarError ? (
              "Failed"
            ) : today === 0 ? (
              "Holiday"
            ) : (
              today
            )}
          </span>
        </div>
      </div>
      <div className="w-full flex-shrink-0 h-[15%]  py-5">
        <div className="relative max-w-100 mx-auto h-full flex items-center justify-center text-4xl text-white/80 lg:text-5xl">
          {day[dayOrder]}
          <div
            onClick={() => {
              if (dayOrder > 0) {
                setDayOrder(dayOrder - 1);
              }
            }}
            className="absolute top-1/2  -translate-y-1/2 left-15   bg-white/5  p-1 apply-border-sm rounded-lg cursor-pointer shadow-2xl"
          >
            <Minus className="w-5 h-5" />
          </div>
          <div
            onClick={() => {
              if (dayOrder < day.length - 1) {
                setDayOrder(dayOrder + 1);
              }
            }}
            className="absolute top-1/2 -translate-y-1/2 right-15  bg-white/5  p-1 apply-border-sm rounded-lg cursor-pointer shadow-2xl"
          >
            <Plus className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto ">
        <Data data={data} dayorder={dayOrder} />
      </div>
    </div>
  );
};

const Data = ({
  data,
  dayorder,
}: {
  data: DaySchedule[];
  dayorder: number;
}) => {
  const { data: attendanceData, isError } = useAttendance();
  return (
    <div className="py-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full grid gap-4 px-2 lg:px-5">
      {data[dayorder].class.map((item) => {
        const attendance = attendanceData?.find(
          (i) => i.courseCode === item.courseCode
        );

        return (
          <div
            key={item.time}
            className="flex flex-col items-center gap-3 rounded-xl apply-border-md bg-[#16171b] min-h-50 shadow-2xl "
          >
            {item.isClass ? (
              <div className="w-full h-full text-white/70  flex flex-col gap-4 ">
                <div className="flex justify-between w-full px-2 min-h-12 items-center border-b border-white/5">
                  <h1 className="background-rounded apply-border-sm">
                    {item.courseRoomNo}
                  </h1>
                  <span className=" px-2 py-0.5 rounded-full text-sm apply-border-sm bg-black text-blue-400 ">
                    {item.courseType?.charAt(0)}
                  </span>
                  <span className="background-rounded apply-border-sm ">
                    {item.time}
                  </span>
                </div>
                <div className=" flex items-center justify-center w-[80%] h-full mx-auto  text-green-300">
                  {item.courseTitle}
                </div>
                {attendance ? (
                  <AttendanceData attendance={attendance} />
                ) : !isError ? (
                  <div className="w-full min-h-12 flex justify-center items-center animate-pulse  ">
                    <span className="background-rounded apply-border-sm">
                      Getting Attendance data
                    </span>
                  </div>
                ) : (
                  <div className="w-full min-h-12 flex justify-center items-center   ">
                    <span className="background-rounded apply-border-sm text-red-400">
                      Failed to get Attendancedata
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="justify-between h-full w-full flex flex-col">
                <div className="w-full h-12 flex items-center justify-end px-2  ">
                  <div className="background-rounded apply-border-sm ">
                    {item.time}
                  </div>
                </div>
                <div className="h-full flex justify-center items-center text-red-400">
                  No class
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const AttendanceData = ({ attendance }: { attendance: AttendanceDetail }) => {
  return (
    <div className="flex justify-between w-full px-2 min-h-12 items-center ">
      <h1
        className={`px-3 py-1 rounded-full text-sm  apply-border-sm bg-black ${
          Number(attendance.courseAttendance) <= 75
            ? "text-red-400"
            : "text-green-400"
        }`}
      >
        {attendance.courseAttendance} %
      </h1>
      <div className="flex gap-1 bg-white/5  px-1 py-0.5 rounded-full text-sm apply-border-sm">
        <h1 className=" px-2 py-0.5 rounded-full text-sm  apply-border-sm bg-black text-blue-400">
          {attendance.courseConducted}
        </h1>
        <span className="px-2 py-0.5 rounded-full text-sm  apply-border-sm bg-white/5 backdrop-blur-3xl ">
          {attendance.courseConducted - attendance.courseAbsent}
        </span>
      </div>
      <div className="flex gap-1 bg-white/5  pl-2 pr-1 py-0.5 rounded-full text-sm apply-border-sm items-center ">
        <h1 className="capitalize">
          {attendance.courseAttendanceStatus?.status}
        </h1>

        <span
          className={`px-2 py-0.5 rounded-full text-sm  apply-border-sm bg-black ${
            attendance.courseAttendanceStatus?.status === "required"
              ? "text-red-400"
              : "text-green-400"
          }`}
        >
          {attendance.courseAttendanceStatus?.classes}
        </span>
      </div>
    </div>
  );
};
