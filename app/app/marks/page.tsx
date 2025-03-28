"use client";

import { useUser } from "@/lib/zustand";
import { GraduationCap, School } from "lucide-react";
import React, { useState, useEffect } from "react";
import Error from "../components/Error";
import { predictMarks } from "./components/GradeX";
import { Grade } from "@/Types/type";

const Page = () => {
  const [mount, setMount] = useState(false);
  const [grades, setGrades] = useState<{ [subject: string]: Grade }>({});
  const [manualInternal, setmanualInternals] = useState<{
    [subject: string]: number;
  }>({});
  const { marks, attendance, user } = useUser();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMount(true);
  }, []);

  if (marks === null) return <Error error="Marks not found" />;
  if (user === null) return <Error error="User not found" />;
  if (attendance === null) return <Error error="Attendance not found" />;

  return (
    <div className="mx-auto max-w-7xl py-10 md:px-4">
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-0 ${
          mount ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        } transition-all duration-500`}
      >
        <div className="h-[150px] justify-center px-5 rounded-lg bg-foreground/5 shadow-inner shadow-foreground/20 border border-foreground/5 flex flex-col gap-4">
          <p className="text-xl text-blue-500 font-semibold">
            Current Semester
          </p>
          <div className="flex items-center justify-between">
            <p className="text-4xl font-semibold">{user.semester}</p>
            <div className="bg-blue-200 rounded-full p-2">
              <GraduationCap size={30} className="stroke-blue-500" />
            </div>
          </div>
        </div>
        <div>
          <div className="h-[150px] justify-center px-5 rounded-lg bg-foreground/5 shadow-inner shadow-foreground/20 border border-foreground/5 flex flex-col gap-4">
            <p className="text-2xl text-blue-500 font-semibold">Section</p>
            <div className="flex items-center justify-between">
              <p className="text-4xl font-semibold">{user.section}</p>
              <div className="p-2 bg-blue-200 rounded-full">
                <School className="stroke-blue-500" size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marks Section */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-4 md:px-0 ${
          mount ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        } delay-200 transition-all duration-500`}
      >
        {marks.map((mark, i) => {
          const getMark = mark.marks.map((item) => item);
          const value = getMark.map((item) => ({
            name: item.name,
            mark: item.mark,
            total: item.total,
          }));

          const totalMarks = getMark
            .map((item) => item.total)
            .map(Number)
            .reduce((a, b) => a + b, 0);

          const total = getMark
            .map((item) => item.mark)
            .map(Number)
            .reduce((a, b) => a + b, 0);

          const subjectGrades = grades[mark.code] || "O"; // Default grade is "O"

          const gradeX = predictMarks(manualInternal[mark.code], subjectGrades);

          const getFaculty = attendance.find((item) => item.code === mark.code);

          return (
            <div
              key={i}
              className="p-4 border-orange-200/20 border-l-4 rounded-lg bg-foreground/5 flex flex-col gap-3"
            >
              <div className="flex justify-between gap-2">
                <p className="text-md">{mark.name}</p>
                <div className="flex gap-2 text-green-500">
                  <p>Credit</p>
                  <span>-</span>
                  <p>{mark.credit}</p>
                </div>
              </div>

              <div className="flex gap-2 items-center text-foreground/50 text-sm">
                <p>{mark.code}</p>
                <span>-</span>
                <p>{mark.type}</p>
              </div>

              <div className="flex gap-2 items-center text-blue-500">
                <p>Faculty</p>
                <span>-</span>
                <p>{getFaculty?.faculty}</p>
              </div>

              <div className="mt-2 flex flex-col gap-2 justify-center h-full border-t border-foreground/10 pt-4">
                {value.length !== 0 ? (
                  <div>
                    {value.map((item, i) => (
                      <div key={i} className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <p className="p-2">{item.name}</p>
                          <div className="flex gap-1 items-center bg-orange-200/80 px-2 py-0.5 text-background font-bold rounded-full text-sm">
                            <p>{item.mark}</p>
                            <span>/</span>
                            <p>{item.total}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between p-2">
                      <p>Total</p>
                      <div className="px-3 py-0.5 bg-orange-200/80 text-background font-bold rounded-full text-sm flex gap-1">
                        <p>{total}</p>
                        <span>/</span>
                        <p>{totalMarks}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-red-500 flex items-center justify-center h-full w-full">
                    <p>No Marks</p>
                  </div>
                )}
              </div>

              {value.length !== 0 ? (
                <div className="w-full border-t pt-2">
                  {/* <p className="py-2 text-orange-500">
                    Predicted Theory Marks{" "}
                  </p>
                  <div className=" flex items-center justify-between ">
                    <select
                      name="grade"
                      id={`${mark.code}`}
                      value={subjectGrades}
                      aria-label="grade"
                      onChange={(e) => {
                        setGrades((prevGrades) => ({
                          ...prevGrades,
                          [mark.code]: e.target.value as Grade,
                        }));
                      }}
                      className="cursor-pointer hover:scale-95 duration-300 bg-foreground/10 backdrop-blur-3xl shadow-inner shadow-foreground/25 rounded h-fit pl-3 p-1 focus:outline-none"
                    >
                      {["O", "A+", "A", "B+", "B", "C"].map((item, i) => (
                        <option key={i} value={item} className="bg-background ">
                          {item}
                        </option>
                      ))}
                    </select>

                    <div className="flex gap-1 items-center px-2 py-0.5 rounded-full text-foreground/50">
                      <p
                        className={`text-lg font-semibold ${gradeX.requiredTheoryMarks > 75 ? "text-red-700" : "text-green-600"}`}
                      >
                        {Number(gradeX.requiredTheoryMarks).toFixed(2)}
                      </p>
                      <span className="text-3xl">/</span>
                      <p className="text-xl">75</p>
                    </div>
                  </div> */}
                  <div>
                    <div className="grid grid-cols-3 gap-2 w-full">
                      <div className="flex flex-col gap-1 items-center ">
                        <p className="py-2 text-orange-400 text-center">
                          Internals
                        </p>
                        <div className="flex items-center border border-foreground/10 rounded-full px-2 py-1 text-sm w-fit bg-background">
                          <input
                            type="text"
                            id={`${mark.code}`}
                            placeholder="0"
                            autoComplete="off"
                            value={manualInternal[mark.code]}
                            onChange={(e) =>
                              setmanualInternals((prev) => ({
                                ...prev,
                                [mark.code]: Number(e.target.value),
                              }))
                            }
                            className="w-7 focus:outline-none text-orange-300"
                          />
                          <p className="text-foreground/60">/ 60</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 items-center ">
                        <p className="py-2 text-orange-400 text-center">
                          Theory
                        </p>
                        <div
                          className={`flex items-center border border-foreground/10 rounded-full px-2 py-1 text-sm w-fit bg-background ${gradeX.requiredTheoryMarks > 75 ? "text-red-700" : "text-green-600"}`}
                        >
                          <p className="w-7 focus:outline-none font-semibold">
                            {isNaN(gradeX.requiredTheoryMarks)
                              ? 0
                              : gradeX.requiredTheoryMarks.toFixed(0)}
                          </p>
                          <p className="text-foreground/60">/ 75</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 items-center ">
                        <p className="py-2 text-orange-400 text-center">
                          Grade
                        </p>
                        <div className="flex items-center  text-sm ">
                          <select
                            name="grade"
                            id={`${mark.code}`}
                            value={subjectGrades}
                            aria-label="grade"
                            onChange={(e) => {
                              setGrades((prevGrades) => ({
                                ...prevGrades,
                                [mark.code]: e.target.value as Grade,
                              }));
                            }}
                            className="cursor-pointer hover:scale-95 duration-300 bg-foreground/10 backdrop-blur-3xl shadow-inner shadow-foreground/25 rounded pl-2.5 p-1 appearance-none focus:outline-none"
                          >
                            {["O", "A+", "A", "B+", "B", "C"].map((item, i) => (
                              <option
                                key={i}
                                value={item}
                                className="bg-background "
                              >
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
