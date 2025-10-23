"use client";
import { useCourse, useMarks } from "@/hooks/query";
import React from "react";
import { CourseDetail, MarkDetail } from "@jackwaghan/srm-academia-api";
import { GlobalLoader } from "../components/loader";

const Page = () => {
  const { data, isPending } = useMarks();
  if (isPending) return <GlobalLoader className="h-10 w-10 text-blue-400" />;
  if (!data || data.length === 0)
    return (
      <div className="flex h-full w-full justify-center items-center">
        No data found
      </div>
    );

  return (
    <div className="flex flex-col gap-4 py-2 ">
      <h1 className="text-2xl text-blue-400 ">Theory</h1>
      <Data data={data} category="theory" />
      <h1 className="text-2xl text-blue-400">Practical</h1>
      <Data data={data} category="practical" />
    </div>
  );
};

export default Page;

const Data = ({ data, category }: { data: MarkDetail[]; category: string }) => {
  const course = useCourse().data;
  const filteredData = data.filter(
    (i) => i.category.toLowerCase() === category
  );

  function getMarks(grade: string) {
    if (grade === "O") return 91;
    if (grade === "A+") return 81;
    if (grade === "A") return 71;
    if (grade === "B+") return 61;
    if (grade === "B") return 56;
    if (grade === "C") return 50;
    return 91;
  }

  // Function to calculate required marks out of 75 to achieve a specific grade
  function calculateRequiredMarks(
    grade: string,
    internalMarks: number
  ): number {
    // Formula: (total marks needed - internal marks) * 75 / 40
    const totalNeeded = getMarks(grade);
    const requiredSemesterMarks = ((totalNeeded - internalMarks) * 75) / 40;
    return parseFloat(requiredSemesterMarks.toFixed(2));
  }

  return (
    <div className="py-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full grid gap-4 px-2 lg:px-5">
      {filteredData.map((item, i) => {
        const courseList = course?.find((i) => i.courseCode === item.course);
        return (
          <CourseItem
            key={i}
            item={item}
            courseList={courseList as CourseDetail}
            calculateRequiredMarks={calculateRequiredMarks}
            getMarks={getMarks}
          />
        );
      })}
    </div>
  );
};

// Separate component for each course item to properly use React hooks
const CourseItem = ({
  item,
  courseList,
  calculateRequiredMarks,
}: {
  item: MarkDetail;
  courseList: CourseDetail;
  calculateRequiredMarks: (grade: string, internalMarks: number) => number;
  getMarks: (grade: string) => number;
}) => {
  const [selectedGrade, setSelectedGrade] = React.useState("O");
  const [obtainedMarks, setObtainedMarks] = React.useState(item.total.obtained);

  // Calculate required marks out of 75 to achieve the selected grade
  const requiredMarks = calculateRequiredMarks(selectedGrade, obtainedMarks);

  // Determine if required marks exceed 75
  const isRequiredMarksExceeded = requiredMarks > 75;

  // Handle grade change
  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGrade(e.target.value);
  };

  // Handle obtained marks change
  const handleObtainedMarksChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value) || 0;
    if (courseList?.courseCode?.endsWith("P")) {
      setObtainedMarks(value > 100 ? 100 : value);
    } else {
      setObtainedMarks(value > 60 ? 60 : value);
    }
  };

  return (
    <div className=" flex flex-col items-center gap-3 rounded-xl apply-border-md bg-[#16171b] min-h-50 shadow-2xl  ">
      <div className="w-full h-full text-white/70  flex flex-col gap-4 ">
        <div className="flex justify-between w-full px-2 min-h-14 items-center border-b border-white/5 gap-4 ">
          <div className="flex gap-1  px-1 py-0.5  text-sm items-center w-[60%]">
            {courseList?.courseTitle}
          </div>

          <div className="flex gap-1.5 bg-white/5  px-1 py-0.5 rounded-lg text-sm apply-border-sm pl-2">
            <h1 className="flex items-center  text-sm  ">Credit</h1>
            <span className="px-2 rounded-lg text-sm  apply-border-sm  bg-black text-green-400">
              {courseList?.courseCredit}
            </span>
          </div>
        </div>
        <div className=" flex items-center justify-center w-full h-full mx-auto  ">
          {item.marks.length === 0 ? (
            <div className="text-red-400">No Marks</div>
          ) : (
            <MarkData data={item} />
          )}
        </div>
        <div className="flex justify-between w-full px-2 min-h-12 items-center  border-white/5">
          <div className="flex bg-white/5  px-2 py-0.5 rounded-lg text-sm apply-border-sm items-center">
            <h1 className="capitalize">{courseList?.courseCode}</h1>
          </div>
          <div className="flex bg-white/5 pl-1.5 pr-1 py-0.5 rounded-lg text-sm apply-border-sm items-center gap-2">
            <h1 className="capitalize">{item.total.obtained}</h1>
            <span
              className={`rounded-lg px-1  text-sm apply-border-sm bg-black text-blue-400`}
            >
              {item.total.maxMark}
            </span>
          </div>
        </div>
      </div>
      {item.marks.length > 0 && (
        <div className="w-full text-sm items-center flex flex-wrap md:flex-nowrap justify-between p-2 bg-blue-400/10 border-b border-l border-r rounded-bl-xl rounded-br-xl border-dotted border-blue-500 gap-2">
          {courseList?.courseCode?.endsWith("P") ? (
            // For practical courses (ending with P)
            <div className="w-full flex flex-wrap md:flex-nowrap justify-between items-center">
              <div className="flex items-center gap-2">
                <input
                  value={obtainedMarks}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setObtainedMarks(value > 100 ? 100 : value);
                  }}
                  className="w-14 bg-white/5 px-2 py-1 rounded-lg text-sm apply-border-sm items-center touch-manipulation text-center"
                />
                <span className="text-white/50">|</span>
                <span>100</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-medium">Grade: </span>
                <span className="bg-white/5 px-3 py-1 rounded-lg text-sm apply-border-sm">
                  {obtainedMarks >= 91
                    ? "O"
                    : obtainedMarks >= 81
                    ? "A+"
                    : obtainedMarks >= 71
                    ? "A"
                    : obtainedMarks >= 61
                    ? "B+"
                    : obtainedMarks >= 56
                    ? "B"
                    : obtainedMarks >= 50
                    ? "C"
                    : "F"}
                </span>
              </div>
            </div>
          ) : (
            // For theory courses (not ending with P)
            <>
              <div className="flex items-center gap-2">
                <input
                  value={obtainedMarks}
                  onChange={handleObtainedMarksChange}
                  className="w-14 bg-white/5 px-2 py-1 rounded-lg text-sm apply-border-sm items-center touch-manipulation text-center"
                />
                <span className="text-white/50">|</span>
                <span>60</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={
                    isRequiredMarksExceeded ? "text-red-400" : "text-green-400"
                  }
                >
                  {requiredMarks}
                </span>
                <span className="text-white/50">|</span>
                <span>75</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-medium ">Grade: </span>
                <select
                  className="bg-white/5 px-2 py-1 rounded-lg text-sm apply-border-sm items-center appearance-none text-center touch-manipulation"
                  onChange={handleGradeChange}
                  value={selectedGrade}
                >
                  <option value="O">O</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const MarkData = ({ data }: { data: MarkDetail }) => {
  return (
    <div className="w-full h-full flex flex-col px-2 text-sm text-white/50 justify-center">
      {data.marks.map((item, i) => {
        return (
          <div key={i} className="flex gap-2 items-center justify-center ">
            <div className="w-0.5 h-full bg-green-300/80 " />
            <div className="flex items-center justify-between p-2 w-full  first:pt-0">
              <h1 className="w-[60%]">{item.exam}</h1>
              <div className="flex gap-2 text-white/80">
                {" "}
                <h1>{item.obtained}</h1>
                <span className="text-white/50">|</span>
                <h1>{item.maxMark}</h1>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
