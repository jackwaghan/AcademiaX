"use client";
import { useAttendance, useDayOrder, useTimetable } from "@/hooks/query";
import React, { useState, useRef, useEffect } from "react";
import {
  Minus,
  Plus,
  RotateCcw,
  BookmarkCheck,
  Bookmark,
  Settings2,
} from "lucide-react";
import { AttendanceDetail, DaySchedule } from "@jackwaghan/srm-academia-api";
import { GlobalLoader } from "../components/loader";
import { useOptionalClasses } from "@/hooks/zustand";
import { isCurrentClass } from "@/utils/currentClass";
import { useRouter } from "next/navigation";
const Page = () => {
  const { data, isPending } = useTimetable();
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

const DayChange = ({ data }: { data: DaySchedule[] }) => {
  const router = useRouter();
  const day = data?.map((i) => i.dayOrder.split(" ")[1]);
  const [today, setToday] = useState<number>();
  const [dayOrder, setDayOrder] = useState<number>(0);
  const {
    data: dayOrderData,
    isLoading: dayOrderLoading,
    isError: dayOrderError,
    refetch: dayOrderRefetch,
    isFetching: dayOrderIsFetching,
  } = useDayOrder();

  React.useEffect(() => {
    if (dayOrderData) {
      const todayDayOrder = Number(dayOrderData.dayOrder);
      if (!isNaN(todayDayOrder)) {
        setToday(todayDayOrder);
        setDayOrder(todayDayOrder - 1);
        return;
      }
      setToday(0);
    }
  }, [dayOrderData]);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="w-full flex items-center justify-center gap-6 ">
        {/* Today */}
        <div
          onClick={() => {
            if (today && today !== 0) {
              setDayOrder(today - 1);
              return;
            }
          }}
          className="flex bg-white/5  pl-2 pr-1 py-0.5 rounded-full text-sm apply-border-sm items-center justify-center gap-3 cursor-pointer"
        >
          <span className="relative flex h-2 w-2 ">
            <span className="absolute animate-ping inset-0 rounded-full bg-blue-400 opacity-75"></span>
            <span className="rounded-full h-1.5 w-1.5 bg-blue-500 apply-inner-shadow-sm m-auto"></span>
          </span>
          <h1>Today</h1>
          <span
            className={`px-2.5 py-0.5 rounded-full text-sm  apply-border-sm  backdrop-blur-3xl bg-black items-center flex ${
              dayOrderLoading
                ? "text-blue-400"
                : today === 0 || dayOrderError
                ? "text-red-400"
                : "text-blue-400"
            }`}
          >
            {dayOrderLoading || dayOrderIsFetching ? (
              <GlobalLoader className="w-4 h-4" />
            ) : dayOrderError ? (
              <span className="flex gap-2 items-center justify-center">
                <h1>Failed</h1>
                <span onClick={() => dayOrderRefetch()}>
                  <RotateCcw className="w-3 h-3" />
                </span>
              </span>
            ) : today === 0 ? (
              "Holiday"
            ) : (
              today
            )}
          </span>
        </div>
        {/* Setting */}
        <Settings2
          className="w-4 h-4 cursor-pointer"
          onClick={() => {
            router.push("/app/configuration");
          }}
        />
      </div>
      <div className="w-full flex-shrink-0 h-[15%]  py-5">
        <div className="relative max-w-100 mx-auto h-full flex items-center justify-center text-4xl text-white/80 lg:text-5xl">
          {day[dayOrder]}
          <div
            onClick={() => {
              setDayOrder(dayOrder > 0 ? dayOrder - 1 : day.length - 1);
            }}
            className="absolute top-1/2  -translate-y-1/2 left-15   bg-white/5  p-1 apply-border-sm rounded-lg cursor-pointer shadow-2xl"
          >
            <Minus className="w-5 h-5" />
          </div>
          <div
            onClick={() => {
              setDayOrder(dayOrder < day.length - 1 ? dayOrder + 1 : 0);
            }}
            className="absolute top-1/2 -translate-y-1/2 right-15  bg-white/5  p-1 apply-border-sm rounded-lg cursor-pointer shadow-2xl"
          >
            <Plus className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto ">
        <Data data={data} dayorder={dayOrder} today={today} />
      </div>
    </div>
  );
};

const Data = ({
  data,
  dayorder,
  today,
}: {
  data: DaySchedule[];
  dayorder: number;
  today: number | undefined;
}) => {
  const { data: attendanceData, isError } = useAttendance();

  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentRef.current && today !== 0) {
      currentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [today, dayorder]);

  return (
    <div className="py-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full grid gap-4 px-2 lg:px-5">
      {data[dayorder].class.map((item) => {
        const attendance = attendanceData?.find(
          (i) =>
            i.courseCode === item.courseCode &&
            ((item.slot.startsWith("P") && i.courseSlot === "LAB") ||
              !item.slot.startsWith("P"))
        );
        const current =
          today && today !== 0 && dayorder === today - 1
            ? isCurrentClass(item.time)
            : undefined;
        return (
          <div
            key={item.time}
            ref={current ? currentRef : undefined}
            className={`flex flex-col items-center gap-3 rounded-xl bg-[#16171b] min-h-50 shadow-2xl ${
              current
                ? "border-2 border-blue-400/50 border-dotted"
                : "apply-border-md"
            }`}
          >
            {item.isClass ? (
              <div className="w-full h-full text-white/70  flex flex-col gap-4 ">
                <div className="flex justify-between w-full px-2 min-h-12 items-center border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-sm apply-border-sm bg-black text-blue-400">
                      {item.courseType?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {current && (
                      <span className="background-rounded apply-border-sm flex gap-2 items-center justify-center">
                        <span className="relative flex h-2 w-2 ">
                          <span className="absolute animate-ping inset-0 rounded-full bg-blue-400 opacity-75"></span>
                          <span className="rounded-full h-1.5 w-1.5 bg-blue-500 apply-inner-shadow-sm m-auto"></span>
                        </span>
                        <h1>Now</h1>
                      </span>
                    )}
                    <span className="background-rounded apply-border-sm">
                      {item.time}
                    </span>
                  </div>
                </div>

                <div className=" flex items-center justify-center w-[80%] h-full mx-auto  text-green-300 flex-col gap-3">
                  <h1 className="w-full">{item.courseTitle}</h1>
                  <h2 className=" text-sm text-white/60 flex gap-2 w-full">
                    <span className="text-white/80">Class Room</span> -
                    <span>{item.courseRoomNo}</span>
                  </h2>
                </div>

                {attendance ? (
                  <AttendanceData
                    attendance={attendance}
                    dayorder={dayorder}
                    item={{
                      courseCode: item.courseCode!,
                      time: item.time,
                    }}
                  />
                ) : !isError ? (
                  <div className="w-full min-h-12 flex justify-center items-center animate-pulse  ">
                    <span className="background-rounded apply-border-sm">
                      Getting Attendance data
                    </span>
                  </div>
                ) : (
                  <div className="w-full min-h-12 flex justify-center items-center   ">
                    <span className="background-rounded apply-border-sm text-red-400">
                      Failed to get Attendance data
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="justify-between h-full w-full flex flex-col">
                <div className="w-full h-12 flex items-center justify-between px-2">
                  <div>
                    {current && (
                      <span className="background-rounded apply-border-sm flex gap-2 items-center justify-center">
                        <span className="relative flex h-2 w-2 ">
                          <span className="absolute animate-ping inset-0 rounded-full bg-blue-400 opacity-75"></span>
                          <span className="rounded-full h-1.5 w-1.5 bg-blue-500 apply-inner-shadow-sm m-auto"></span>
                        </span>
                        <h1>Now</h1>
                      </span>
                    )}
                  </div>
                  <div className="background-rounded apply-border-sm">
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

const AttendanceData = ({
  attendance,
  dayorder,
  item,
}: {
  attendance: AttendanceDetail;
  dayorder: number;
  item: { courseCode: string; time: string };
}) => {
  const currentDayorder = dayorder + 1;
  const { toggleOptional, isOptional } = useOptionalClasses();
  const safeToggleOptional = (
    courseCode: string | undefined,
    time: string | undefined,
    dayorder: number | undefined
  ) => {
    if (courseCode && time && dayorder) {
      toggleOptional(courseCode, time, dayorder);
    }
  };

  const safeIsOptional = (
    courseCode: string | undefined,
    time: string | undefined,
    dayorder: number | undefined
  ) => {
    if (courseCode && time && dayorder) {
      return isOptional(courseCode, time, dayorder);
    }
    return false;
  };

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
      <button
        onClick={() =>
          safeToggleOptional(item.courseCode, item.time, currentDayorder)
        }
        className={`p-1 rounded-full ${
          safeIsOptional(item.courseCode, item.time, currentDayorder)
            ? "bg-orange-500/20"
            : "bg-white/5"
        } apply-border-sm`}
      >
        {safeIsOptional(item.courseCode, item.time, currentDayorder) ? (
          <div className="flex items-center justify-center gap-2 text-sm px-2">
            <BookmarkCheck className="w-4 h-4 text-orange-400" />
            <h1>Optional</h1>
          </div>
        ) : (
          <Bookmark className="w-4 h-4 text-white/60" />
        )}
      </button>

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
