"use client";
import React from "react";
import { RotateCcw } from "lucide-react";
import { usePathname } from "next/navigation";
import { UseQueryResult } from "@tanstack/react-query";
import { Loader } from "./loader";
import { getTime } from "@/utils/getLastUpdated";
import {
  useAttendance,
  useCalendar,
  useCourse,
  useMarks,
  useTimetable,
  useUserInfo,
} from "@/hooks/query";

type ItemType =
  | "timetable"
  | "attendance"
  | "marks"
  | "calendar"
  | "course"
  | "profile";

const TimetableLastUpdated = () => {
  const query = useTimetable();
  return <LastUpdatedContent query={query} />;
};

const AttendanceLastUpdated = () => {
  const query = useAttendance();
  return <LastUpdatedContent query={query} />;
};

const MarksLastUpdated = () => {
  const query = useMarks();
  return <LastUpdatedContent query={query} />;
};

const CourseLastUpdated = () => {
  const query = useCourse();
  return <LastUpdatedContent query={query} />;
};

const CalendarLastUpdated = () => {
  const query = useCalendar();
  return <LastUpdatedContent query={query} />;
};

const ProfileLastUpdated = () => {
  const query = useUserInfo();
  return <LastUpdatedContent query={query} />;
};

// Shared content component
const LastUpdatedContent = ({
  query,
}: {
  query: UseQueryResult<unknown, Error>;
}) => {
  const date = Date.now();

  const lastUpdated =
    !query.isLoading && query.dataUpdatedAt > 0
      ? getTime(date - query.dataUpdatedAt)
      : null;

  return (
    <div className="px-4 border-b border-slate-400/10 py-2 flex flex-col gap-2 ">
      <div className="w-full flex items-center justify-between ">
        <div className="h-full flex items-center justify-center">
          {query.isRefetching ? (
            <h1 className="text-white/50">Fetching</h1>
          ) : query.isLoading ? (
            <h1 className="text-white/50">Loading...</h1>
          ) : lastUpdated ? (
            <div className="flex gap-3 items-center justify-center">
              {!query.isError && (
                <span className="relative flex h-3 w-3 ">
                  <span className="absolute animate-ping inset-0 rounded-full bg-green-400 opacity-75"></span>
                  <span className="rounded-full h-2 w-2 bg-green-500 apply-inner-shadow-sm m-auto"></span>
                </span>
              )}
              <h1 className="text-white/50">Last updated {lastUpdated} ago </h1>
            </div>
          ) : (
            <h1 className="text-white/50">No data available</h1>
          )}
        </div>
        <span className="cursor-pointer ">
          {query.isRefetching ? (
            <Loader className="w-4 h-4" />
          ) : (
            <RotateCcw onClick={() => query.refetch()} className="w-4 h-4 " />
          )}
        </span>
      </div>
      {query.isError && (
        <div className="bg-red-400/20 text-red-400  w-full justify-center items-center min-h-8 flex border border-red-400/60 rounded-lg text-sm ">
          {query.error.message}
        </div>
      )}
    </div>
  );
};

const LastUpdated = () => {
  const pathArr = usePathname().split("/");
  const path = pathArr[pathArr.length - 1] as ItemType;

  switch (path) {
    case "timetable":
      return <TimetableLastUpdated />;
    case "attendance":
      return <AttendanceLastUpdated />;
    case "marks":
      return <MarksLastUpdated />;
    case "course":
      return <CourseLastUpdated />;
    case "calendar":
      return <CalendarLastUpdated />;
    case "profile":
      return <ProfileLastUpdated />;
    default:
      return <TimetableLastUpdated />; // fallback
  }
};

export default LastUpdated;
