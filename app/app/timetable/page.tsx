"use client";
import React from "react";
import {
  BookOpen,
  CalendarClock,
  ChevronRight,
  Clock,
  Clock8,
  MapPin,
  User,
} from "lucide-react";
import { useUser } from "@/lib/zustand";
import Error from "../components/Error";
import { getCurrentAndNextTimeslot } from "./components/TimeInRange";

const Page = () => {
  const { timetable, attendance, dayorder, setDay } = useUser();
  const [mount, setMount] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (dayorder?.do !== "N" && dayorder?.do)
      setDay((Number(dayorder?.do) - 1).toString());
    setMount(true);
  }, [dayorder?.do, setDay]);

  if (timetable === null) return <Error error="Timetable not found" />;
  if (attendance === null)
    return (
      <Error
        error="Attendance not
  found"
      />
    );
  if (dayorder === null) return <Error error="Day order not found" />;

  const dayOrder =
    dayorder.do !== "N" ? (Number(dayorder?.do) - 1).toString() : "6";

  const timeslot =
    dayOrder !== "6" ? getCurrentAndNextTimeslot(timetable, dayOrder) : null;
  const currentTime = new Date();
  const current = timeslot ? timeslot.current : null;
  const next = timeslot ? timeslot.next : null;
  const currentClass = current ? timetable[dayOrder][current.timeslot] : null;
  const nextClass =
    dayOrder !== "6" && next ? timetable[dayOrder][next.timeslot] : null;

  const facultyCurrent = attendance.find(
    (item) => item.code === currentClass?.code
  );
  const facultyNext = attendance.find((item) => item.code === nextClass?.code);

  let hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour >= 13 ? hour - 12 : hour;
  hour = hour === 0 ? 12 : hour;

  return (
    <div className="mx-auto max-w-7xl pb-10  md:px-5">
      <div className="flex justify-end items-center py-5 pr-5">
        <div className=" flex gap-4 ">
          <p className="text-md">Current Time</p>
          <div className="flex items-center gap-2 text-md text-green-500">
            <Clock size={20} />
            <p>{`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${ampm}`}</p>
          </div>
        </div>
      </div>
      <div
        className={`grid grid=cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  px-5 mx-5 md:mx-0  py-5  bg-foreground/5 rounded-lg border border-foreground/5 ${mount ? "translate-x-0 opacity-100" : " translate-y-20 opacity-0"} transition-all duration-500 `}
      >
        <div className="h-[300px] p-8 border border-foreground/10  rounded-lg flex flex-col bg-background ">
          <div className="flex items-center gap-4 ">
            {" "}
            <Clock8 size={30} className="stroke-orange-300" />
            <p className="text-2xl text-orange-500 font-semibold">
              Current Class
            </p>
          </div>
          {currentClass ? (
            <div className="h-full flex   flex-col gap-4 mt-5">
              <p className="text-xl">{currentClass.title}</p>
              <div className="flex items-center gap-2 text-md text-foreground/50">
                <p>{currentClass.code}</p>
                <span>-</span>
                <p>{currentClass.type}</p>
              </div>
              <div className="flex items-center gap-2 text-md text-blue-500">
                <MapPin size={20} />
                <p className="text-md">{currentClass.room}</p>
              </div>
              <div className="flex items-center gap-2 text-md text-blue-500">
                <User size={20} />
                <p>{facultyCurrent?.faculty}</p>
              </div>
              <div className="w-fit">
                <p className="text-green-500 text-sm border border-foreground/10 rounded-full bg-green-500/10 px-2 py-0.5">
                  {current?.timeslot}
                </p>
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
          {nextClass ? (
            <div className="h-full flex   flex-col gap-4 mt-5 x ">
              <p className="text-xl">{nextClass.title}</p>
              <div className="flex items-center gap-2 text-md text-foreground/50">
                <p>{nextClass.code}</p>
                <span>-</span>
                <p>{nextClass.type}</p>
              </div>
              <div className="flex items-center gap-2 text-md text-blue-500">
                <MapPin size={20} />
                <p className="text-md">{nextClass.room}</p>
              </div>
              <div className="flex items-center gap-2 text-md text-blue-500">
                <User size={20} />
                <p>{facultyNext?.faculty}</p>
              </div>
              <div className="w-fit">
                <p className="text-green-500 text-sm border border-foreground/10 rounded-full bg-green-500/10 px-2 py-0.5">
                  {next?.timeslot}
                </p>
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
              {dayOrder === "6" ? "Holiday" : Number(dayOrder) + 1}
            </p>
          </div>
        </div>
      </div>
      <SelectDay mount={mount} />
      <TimeTable mount={mount} current={currentClass} />
    </div>
  );
};

export default Page;

const SelectDay = ({ mount }: { mount: boolean }) => {
  const { timetable, day, setDay } = useUser();
  return (
    <div
      className={`mt-10 flex gap-6 px-5 py-5 items-center justify-center rounded-lg ${mount ? "translate-x-0 scale-100 opacity-100" : " translate-y-20 scale-75 opacity-0"} transition-all duration-500 delay-200`}
    >
      {timetable &&
        Object.keys(timetable).map((item, i) => {
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
  );
};

const TimeTable = ({
  mount,
  current,
}: {
  mount: boolean;
  current: {
    code: string;
    title: string;
    room: string;
    type: string;
    category: string;
  } | null;
}) => {
  const { timetable, attendance, day } = useUser();
  return (
    <div
      className={`mt-10 md:mx-0 mx-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ${mount ? "translate-x-0 opacity-100" : " translate-y-20 opacity-0"} transition-all duration-500 delay-400`}
    >
      {timetable &&
        attendance &&
        Object.keys(timetable[day]).map((item, i) => {
          const classItem = timetable[day][item];
          const faculty = attendance.find(
            (item) => item.code === classItem.code
          );
          return (
            <div
              key={i}
              className={`flex flex-col gap-6 border  p-4 rounded-lg bg-foreground/5 justify-between ${current === classItem ? "border-red-500" : "border-foreground/10"}`}
            >
              <div className="flex justify-between items-center gap-4">
                <p className="text-orange-500 text-sm border border-foreground/10 rounded-full bg-foreground/5 px-3 py-0.5">
                  {classItem?.type}
                </p>
                <p className="text-green-500 text-sm border border-foreground/10 rounded-full bg-green-500/10 px-2 py-0.5">
                  {item}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {" "}
                <p className="text-foreground">{classItem?.title}</p>
                <p className="text-foreground/50 font-sm">{classItem?.code}</p>
                <div className="flex items-center gap-2 text-md text-blue-500">
                  <User size={20} />
                  <p>{faculty?.faculty}</p>
                </div>
                <div className="flex items-center gap-2 text-md text-blue-500">
                  <MapPin size={20} />
                  <p className="">{classItem?.room}</p>
                </div>
              </div>
              <div>
                <p className="text-foreground/70 text-sm border border-foreground/10 rounded-full bg-background px-3 py-1 w-fit">
                  {classItem?.category}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};
