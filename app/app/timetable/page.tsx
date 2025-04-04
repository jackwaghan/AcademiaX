"use client";
import React from "react";
import {
  BookOpen,
  CalendarClock,
  ChevronRight,
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
  const current = timeslot ? timeslot.current : null;
  const next = timeslot ? timeslot.next : null;
  const currentClass = current ? timetable[dayOrder][current.timeslot] : null;
  const nextClass =
    dayOrder !== "6" && next ? timetable[dayOrder][next.timeslot] : null;

  return (
    <div className="mx-auto max-w-7xl pb-10 px-4 ">
      <div
        className={`pt-7 grid grid=cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full ${mount ? "translate-x-0 opacity-100" : " translate-y-20 opacity-0"} transition-all duration-500 `}
      >
        <div className="h-[270px] p-6 border border-foreground/5 shadow-inner shadow-foreground/20 rounded-lg flex flex-col bg-background-muted/15 backdrop-blur-3xl ">
          <div className="flex items-center gap-4 ">
            {" "}
            <Clock8 size={30} className="stroke-orange-300" />
            <p className="text-2xl text-orange-300 font-semibold">
              Current Class
            </p>
          </div>
          {currentClass ? (
            <div className="h-full flex flex-col gap-4 mt-5">
              <p className="text-lg">{currentClass.title}</p>
              <div className="flex items-center gap-2 text-md text-foreground/50">
                <p>{currentClass.code}</p>
                <span>-</span>
                <p>{currentClass.type}</p>
              </div>
              <div className="flex items-center gap-2 text-md text-blue-500">
                <MapPin size={20} />
                <p className="text-md">{currentClass.room}</p>
              </div>
              <div className="w-fit">
                <p className="text-green-500 text-sm border border-foreground/10 rounded-full bg-green-500/10 px-2 py-0.5">
                  {current?.timeslot}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center flex-col gap-6 ">
              <CalendarClock size={50} className="stroke-blue-500" />
              <p className="text-blue-500">No class in progress right now</p>
            </div>
          )}
        </div>
        <div className="h-[270px] p-6 border border-foreground/5 shadow-inner shadow-foreground/20 rounded-lg flex flex-col bg-background-muted/15 backdrop-blur-3xl">
          <div className="flex items-center gap-4 ">
            {" "}
            <ChevronRight size={30} className="stroke-orange-300" />
            <p className="text-2xl text-orange-300 font-semibold">Next Class</p>
          </div>
          {nextClass ? (
            <div className="h-full flex flex-col gap-3 mt-4  ">
              <p className="text-lg ">{nextClass.title}</p>
              <div className="flex items-center gap-2 text-md text-foreground/50">
                <p>{nextClass.code}</p>
                <span>-</span>
                <p>{nextClass.type}</p>
              </div>
              <div className="flex items-center gap-2 text-md text-blue-500">
                <MapPin size={20} />
                <p className="text-md">{nextClass.room}</p>
              </div>
              <div className=" w-fit  ">
                <p className="text-green-500 text-sm border border-foreground/10 rounded-full bg-green-500/10 px-2 py-0.5">
                  {next?.timeslot}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center  justify-center flex-col gap-6 ">
              <CalendarClock size={50} className="stroke-blue-500" />
              <p className="text-blue-500">There is no next class</p>
            </div>
          )}
        </div>
        <div className="h-[270px] p-6 border border-foreground/5  shadow-inner shadow-foreground/20 rounded-lg flex flex-col bg-background-muted/15 backdrop-blur-3xl">
          <div className="flex items-center gap-4 ">
            <BookOpen size={30} className="stroke-orange-300" />
            <p className="text-2xl text-orange-300 font-semibold">Day Order</p>
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
      className={`mt-10  flex gap-6 px-5 py-5 items-center justify-center rounded-lg ${mount ? "translate-x-0 scale-100 opacity-100" : " translate-y-20 scale-75 opacity-0"} transition-all duration-500 delay-200`}
    >
      {timetable &&
        Object.keys(timetable).map((item, i) => {
          return (
            <button
              key={i}
              onClick={() => setDay(item)}
              className={`px-4 py-2 rounded-lg shadow-inner shadow-foreground/5 border border-foreground/5   cursor-pointer hover:scale-90 duration-300 transition-transform ${
                day === item
                  ? "bg-blue-500 text-white"
                  : "bg-background-muted/15 text-orange-500"
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
      className={`mt-10  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${mount ? "translate-x-0 opacity-100" : " translate-y-20 opacity-0"} transition-all duration-500 delay-400`}
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
              className={`flex flex-col gap-6  p-4 rounded-lg  justify-between bg-background-muted/15 ${current === classItem ? "border-red-500 border" : "border-l-4 border-orange-200/20 "}`}
            >
              <div className="flex justify-between items-center gap-4">
                <p className="text-orange-300 text-sm border border-foreground/10 rounded-full bg-background-muted/15 px-3 py-0.5">
                  {classItem?.type}
                </p>
                <p className="text-green-500 text-sm border border-foreground/10 rounded-full bg-green-500/10 px-2 py-0.5">
                  {item}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-foreground">{classItem?.title}</p>
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
