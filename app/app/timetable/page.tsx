"use client";
import React from "react";
import { TimeInRange } from "./components/TimeInRange";
import {
  BookOpen,
  CalendarClock,
  ChevronRight,
  Clock,
  Clock8,
  MapPin,
  User,
} from "lucide-react";
import { TimetableData } from "@/Types/type";
import { useUser } from "@/lib/zustand";
import Error from "../components/Error";

const Page = () => {
  const { timetable, attendance, dayorder } = useUser();
  const [mount, setMount] = React.useState(false);
  const [day, setDay] = React.useState<string>("0");
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (dayorder?.do !== "N") setDay((Number(dayorder?.do) - 1).toString());
    setMount(true);
  }, [dayorder]);
  if (timetable === null) return <Error error="Timetable not found" />;
  if (attendance === null)
    return (
      <Error
        error="Attendance not
  found"
      />
    );
  if (dayorder === null) return <Error error="Day order not found" />;
  const getCurrentCourse = (currentTime: Date, dayOrder: string) => {
    for (const key in (timetable as TimetableData)[dayOrder]) {
      const [startTime, endTime] = key.split(" - ");
      const time = TimeInRange(startTime, endTime);
      if (time) {
        const currentClass = `${startTime} - ${endTime}`;

        return currentClass.toString();
      }
    }
  };

  const dayOrder =
    dayorder.do !== "N" ? (Number(dayorder?.do) - 1).toString() : "6";
  const currentTime = new Date();
  const currentClass =
    dayOrder !== "6" ? getCurrentCourse(currentTime, dayOrder) : null;
  const Class =
    dayOrder !== "6"
      ? timetable[dayOrder][
          currentClass as keyof (typeof timetable)[typeof dayOrder]
        ]
      : null;
  const faculty = attendance.find((item) => item.code === Class?.code);
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  return (
    <div className="mx-auto max-w-7xl pb-10 px-5 ">
      <div className="flex justify-end items-center py-5 ">
        <div className="flex items-center gap-2 text-md text-green-500">
          <Clock size={20} />

          <p>{`${hour}:${minute} ${ampm}`}</p>
        </div>
      </div>
      <div
        className={`grid grid=cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  px-5 py-5  bg-foreground/5 rounded-lg border border-foreground/5 ${mount ? "translate-x-0 opacity-100" : " translate-y-20 opacity-0"} transition-all duration-500 `}
      >
        <div className="h-[300px] p-8 border border-foreground/10  rounded-lg flex flex-col bg-background ">
          <div className="flex items-center gap-4 ">
            {" "}
            <Clock8 size={30} className="stroke-orange-300" />
            <p className="text-2xl text-orange-500 font-semibold">
              Current Class
            </p>
          </div>
          {Class ? (
            <div className="h-full flex   flex-col gap-4 mt-5">
              <p className="text-xl">{Class.title}</p>
              <div className="flex items-center gap-2 text-md text-foreground/50">
                <p>{Class.code}</p>
                <span>-</span>
                <p>{Class.type}</p>
              </div>
              <div className="flex items-center gap-2 text-md text-blue-500">
                <MapPin size={20} />
                <p className="text-md">{Class.room}</p>
              </div>
              <div className="flex items-center gap-2 text-md text-blue-500">
                <User size={20} />
                <p>{faculty?.faculty}</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center  justify-center flex-col gap-6 ">
              <CalendarClock size={50} className="stroke-blue-500" />
              <p className="text-blue-500">No class in progress right now</p>
            </div>
          )}
        </div>
        <div className="h-[300px]  p-8 border border-foreground/10  rounded-lg flex flex-col bg-background  ">
          <div className="flex items-center gap-4 ">
            {" "}
            <ChevronRight size={30} className="stroke-orange-300" />
            <p className="text-2xl text-orange-500 font-semibold">Next Class</p>
          </div>
          {Class ? (
            <div className="h-full flex   flex-col gap-4 mt-5 x ">
              <p className="text-xl">{Class.title}</p>
              <div className="flex items-center gap-2 text-md text-foreground/50">
                <p>{Class.code}</p>
                <span>-</span>
                <p>{Class.type}</p>
              </div>
              <div className="flex items-center gap-2 text-md text-blue-500">
                <MapPin size={20} />
                <p className="text-md">{Class.room}</p>
              </div>
              <div className="flex items-center gap-2 text-md text-blue-500">
                <User size={20} />
                <p>{faculty?.faculty}</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center  justify-center flex-col gap-6 ">
              <CalendarClock size={50} className="stroke-blue-500" />
              <p className="text-blue-500">No class in progress right now</p>
            </div>
          )}
        </div>
        <div className="h-[300px]   p-6 border border-foreground/10  rounded-lg flex flex-col bg-background">
          <div className="flex items-center gap-4 ">
            <BookOpen size={30} className="stroke-orange-300" />
            <p className="text-2xl text-orange-500 font-semibold">Day Order</p>
          </div>

          <div className="flex items-center justify-center w-full h-full">
            <p className="text-5xl font-semibold text-red-500">
              {dayOrder === "6" ? "Holiday" : dayOrder}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`mt-10 flex gap-6 px-5 py-5 items-center justify-center rounded-lg ${mount ? "translate-x-0 opacity-100" : " translate-y-20 opacity-0"} transition-all duration-500 delay-200`}
      >
        {Object.keys(timetable).map((item, i) => {
          return (
            <button
              key={i}
              onClick={() => setDay(item)}
              className={`px-4 py-2 rounded-lg border border-foreground/10  cursor-pointer hover:scale-90 duration-300 transition-transform ${
                day === item
                  ? "bg-blue-500 text-white"
                  : "bg-foreground/5 text-orange-500"
              }`}
            >
              {Number(item) + 1}
            </button>
          );
        })}
      </div>
      <div
        className={`mt-10  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 " ${mount ? "translate-x-0 opacity-100" : " translate-y-20 opacity-0"} transition-all duration-500 delay-400`}
      >
        {Object.keys(timetable[day]).map((item, i) => {
          const classItem =
            timetable[day][item as keyof (typeof timetable)[typeof day]];
          const faculty = attendance.find(
            (item) => item.code === classItem.code
          );
          return (
            <div
              key={i}
              className="flex flex-col gap-6 border border-foreground/10 p-4 rounded-lg bg-foreground/5 justify-between "
            >
              <div className="flex justify-between items-center gap-4">
                <p className="text-orange-500 text-sm border border-foreground/10 rounded-full bg-foreground/5 px-3 py-0.5">
                  {classItem.type}
                </p>
                <p className="text-green-500 text-sm border border-foreground/10 rounded-full bg-green-500/10 px-2 py-0.5">
                  {item}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {" "}
                <p className="text-foreground">{classItem.title}</p>
                <p className="text-foreground/50 font-sm">{classItem.code}</p>
                <div className="flex items-center gap-2 text-md text-blue-500">
                  <User size={20} />
                  <p>{faculty?.faculty}</p>
                </div>
                <div className="flex items-center gap-2 text-md text-blue-500">
                  <MapPin size={20} />
                  <p className="">{classItem.room}</p>
                </div>
              </div>
              <div>
                <p className="text-foreground/70 text-sm border border-foreground/10 rounded-full bg-background px-3 py-1 w-fit">
                  {classItem.category}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
