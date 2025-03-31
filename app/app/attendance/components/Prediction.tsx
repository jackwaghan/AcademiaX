"use client";
import { useUser } from "@/lib/zustand";
import React from "react";
import { getCurrentMonth } from "../../planner/components/CurrentMonth";
import { getCurrentDate } from "../../planner/components/CurrentDay";
import { countCoursePresence, isPast } from "./Predictfunction";
import { ArrowBigUpDash, Loader2 } from "lucide-react";

const Prediction = () => {
  const { planner } = useUser();
  const [startmonth, setstartMonth] = React.useState(getCurrentMonth());
  const [endmonth, setendMonth] = React.useState(getCurrentMonth());
  const [startday, setstartDay] = React.useState(getCurrentDate());
  const [endday, setendDay] = React.useState(getCurrentDate());
  const [dayorder, setdayOrder] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState(false);
  if (!planner)
    return <div className="text-white text-center mt-10">Loading...</div>;
  const method = isPast(startmonth, startday, endmonth, endday)
    ? "Past"
    : "Future";

  const handlePredict = () => {
    setLoading(true);
    {
      let dayOrder = [];

      if (startmonth === endmonth) {
        dayOrder = planner[startmonth]
          .filter(
            (day) =>
              Number(day.date) >= Number(startday) &&
              Number(day.date) <= Number(endday)
          )
          .map((day) => Number(day.dayo))
          .filter((dayo) => !isNaN(dayo));
      } else {
        const startDays = planner[startmonth]
          .filter((day) => Number(day.date) >= Number(startday))
          .map((day) => Number(day.dayo))
          .filter((dayo) => !isNaN(dayo));

        const endDays = planner[endmonth]
          .filter((day) => Number(day.date) <= Number(endday))
          .map((day) => Number(day.dayo))
          .filter((dayo) => !isNaN(dayo));

        dayOrder = [...startDays, ...endDays];
      }

      setdayOrder(dayOrder);
      // Delay setting loading false to ensure re-render
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };
  return (
    <div className="h-full w-full mt-5 flex flex-col">
      <div className="grid grid-cols-2 md:grid-cols-4 max-w-7xl  items-center gap-3  justify-center ">
        <SelectionBox
          title="From"
          month={startmonth}
          setMonth={setstartMonth}
          day={startday}
          setDay={setstartDay}
          planner={planner}
        />
        <SelectionBox
          title="To"
          month={endmonth}
          setMonth={setendMonth}
          day={endday}
          setDay={setendDay}
          planner={planner}
        />
      </div>
      <div className="flex justify-center w-full mt-10 ">
        <button
          className="px-3 py-1.5 bg-orange-500 transition-all hover:scale-98 cursor-pointer duration-300 rounded shadow-lg "
          onClick={() => handlePredict()}
        >
          {method === "Past" ? "Predict Past" : "Predict Future"}
        </button>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="flex justify-center items-center h-full w-full ">
            <Loader2 className="animate-spin" />
          </div>
        ) : dayorder.length !== 0 ? (
          <PredictedItems
            dayorder={dayorder}
            startday={startday}
            method={method}
          />
        ) : (
          <div className="text-center">No class found</div>
        )}
      </div>
    </div>
  );
};

const SelectionBox = ({
  title,
  month,
  setMonth,
  day,
  setDay,
  planner,
}: {
  title: string;
  month: string;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
  day: string;
  setDay: React.Dispatch<React.SetStateAction<string>>;
  planner: Record<string, { date: string; dayo: string }[]>;
}) => {
  return (
    <div className="p-6  bg-foreground/5 rounded-lg shadow-inner shadow-foreground/10 border border-foreground/10 md:w-[200px]">
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">{title}</p>
        <select
          className="px-3 py-1.5 bg-foreground/10 rounded shadow-inner shadow-foreground/10  focus:outline-none cursor-pointer"
          value={month}
          onChange={(e) => {
            const newMonth = e.target.value;
            setMonth(newMonth);

            // Reset the day to the first available date in the new month
            const firstAvailableDay = planner[newMonth][0]?.date || "01";
            setDay(firstAvailableDay);
          }}
        >
          {Object.keys(planner).map((m, i) => (
            <option key={i} value={m} className="bg-background">
              {m}
            </option>
          ))}
        </select>
        <select
          className="px-3 py-1.5 bg-foreground/10 rounded shadow-inner shadow-foreground/10   focus:outline-none cursor-pointer"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          {planner[month].map((m, i) => (
            <option key={i} value={m.date} className="bg-background">
              {m.date}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const PredictedItems = ({
  dayorder,
  method,
}: {
  dayorder: number[];
  startday: string;
  method: "Past" | "Future";
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [dayorder]);

  const { attendance, timetable } = useUser();
  if (!timetable || !attendance)
    return <div className="text-white text-center mt-10">Loading...</div>;
  const presence = countCoursePresence(dayorder, timetable);
  const items = presence
    .map((item) => ({
      code: item.code,
      classes: item.classes,
      category: item.category,
    }))
    .map((item) => {
      const course = attendance.find(
        (course) => course.code === item.code || course.slot === item.category
      );
      return {
        title: course?.title,
        code: course?.code,
        classes: item.classes,
        percentage: course?.percetage,
        absent: course?.absent,
        category: course?.category,
        conducted: course?.conducted,
      };
    });

  if (items.length === 0)
    return (
      <div className="text-white text-center mt-10">
        No classes found for the selected dates.
      </div>
    );

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-4 py-6 gap-6 h-full p-4 border-red-600 border-dotted border-2 rounded-lg mx-2"
    >
      {items.map((item, i) => {
        const pastAbsent = Number(item.absent) - Number(item.classes);
        const pastPredict =
          ((Number(item.conducted) - pastAbsent) / Number(item.conducted)) *
          100;
        const futureAbsent = Number(item.absent) + Number(item.classes);
        const futurePredict =
          ((Number(item.conducted) + item.classes - futureAbsent) /
            (Number(item.conducted) + item.classes)) *
          100;

        return (
          <div
            key={i}
            className="flex flex-col border border-foreground/10 shadow-inner shadow-foreground/20 rounded-lg p-4 bg-foreground/5 backdrop-blur-3xl h-full justify-between"
          >
            <div className="flex gap-2 items-center justify-between">
              <div className="flex gap-2 ">
                <p className="text-3xl font-semibold text-blue-500">
                  {item.classes}
                </p>
                <p className="text-foreground/60 ">Class</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="px-2 py-1 text-sm border border-foreground/10 flex gap-1 rounded-full bg-background shadow-2xl text-center">
                  <span
                    className={`${method === "Past" ? "text-green-500" : "text-red-500"} flex items-center gap-1`}
                  >
                    {method === "Past" ? (
                      <ArrowBigUpDash className="text-green-500" size={16} />
                    ) : (
                      <ArrowBigUpDash
                        className="text-red-500 rotate-180"
                        size={16}
                      />
                    )}
                    {method === "Past"
                      ? `${Math.min(100, Math.abs(Number(item.percentage) - Number(pastPredict.toFixed(2)))).toFixed(2)}`
                      : `${Math.min(100, Math.abs(Number(item.percentage) - Number(futurePredict.toFixed(2)))).toFixed(2)}`}{" "}
                    %
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-between border-b pb-5  border-foreground/10 w-full gap-2 mt-3">
              <div className="flex flex-col gap-2 w-full">
                <p>{item.title}</p>
                <div className="text-sm text-foreground/50 flex gap-2 ">
                  <p className="">{item.code}</p>
                  <span>-</span>
                  <p>{item.category}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4 text-sm  ">
              <p className="px-2 py-1 rounded-full border border-foreground/10 text-sm text-orange-200  bg-background">
                {item.percentage} %
              </p>
              <span>---{">"}</span>
              <p className="px-2 py-1 rounded-full border border-foreground/10 text-sm text-orange-400 bg-background">
                {method === "Past"
                  ? Number(pastPredict.toFixed(2)) > 100
                    ? 100
                    : pastPredict.toFixed(2)
                  : Number(futurePredict.toFixed(2)) > 100
                    ? 100
                    : futurePredict.toFixed(2)}{" "}
                %
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Prediction;
