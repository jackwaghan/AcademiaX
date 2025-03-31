import { useUser } from "@/lib/zustand";
import { TimetableData } from "@/Types/type";
import { getCurrentMonth } from "../../planner/components/CurrentMonth";
import { getCurrentDate } from "../../planner/components/CurrentDay";

export const countCoursePresence = (
  dayOrder: number[],
  timetable: TimetableData
) => {
  const courseData: Record<string, { classes: number; type: string }> = {};

  for (const day of dayOrder) {
    const adjustedDay = day - 1; // Decrease day by 1
    const dayData = timetable[String(adjustedDay)]; // Convert day to string since keys are strings

    if (dayData) {
      for (const timeslot in dayData) {
        const course = dayData[timeslot];
        if (course) {
          if (!courseData[course.code]) {
            courseData[course.code] = { classes: 0, type: course.type };
          }
          courseData[course.code].classes += 1;
        }
      }
    }
  }

  return Object.entries(courseData).map(([code, data]) => ({
    code,
    classes: data.classes,
    category: data.type,
  }));
};

export function GetmonthIndex(month: string): number {
  const { planner } = useUser();
  if (!planner) return 0;
  const Index = Object.keys(planner).findIndex((m) => m === month) + 1;
  return Index;
}

export function isPast(
  startMonth: string,
  startDay: string,
  endMonth: string,
  endDay: string
): boolean {
  const currentMonth = getCurrentMonth(); // Example: "Mar '25"
  const currentDay = parseInt(getCurrentDate(), 10); // Example: "15"

  const startMonthIndex = GetmonthIndex(startMonth);
  const endMonthIndex = GetmonthIndex(endMonth);
  const currentMonthIndex = GetmonthIndex(currentMonth);

  // If the start month is before the current month, it's Past
  if (startMonthIndex < currentMonthIndex) {
    return true;
  }

  // If the start month is the current month but the end month is the next month, it's Future
  if (
    startMonthIndex === currentMonthIndex &&
    endMonthIndex === currentMonthIndex + 1
  ) {
    return false;
  }

  // If the start month is the current month, but the start day is before today, it's Past
  if (
    startMonthIndex === currentMonthIndex &&
    parseInt(startDay, 10) < currentDay
  ) {
    return true;
  }

  // If the end month is before the current month, it's Past
  if (endMonthIndex < currentMonthIndex) {
    return true;
  }

  // If the end month is the current month, but the end day is before today, it's Past
  if (
    endMonthIndex === currentMonthIndex &&
    parseInt(endDay, 10) < currentDay
  ) {
    return true;
  }

  return false; // Otherwise, it's Future
}
export function getClassMargin(
  attended: number,
  conducted: number,
  minRequired: number = 75
) {
  // console.log("Attended:", attended);
  // console.log("Conducted:", conducted);
  if (
    typeof attended !== "number" ||
    typeof conducted !== "number" ||
    conducted === 0
  ) {
    throw new Error(
      "Invalid input: Numbers expected and conducted classes cannot be zero."
    );
  }

  // Calculate required attendance count to meet the minimum percentage
  const requiredAttendance = (minRequired / 100) * conducted;

  // Classes margin left (negative if below required, positive if above)
  const classMargin = attended - requiredAttendance;

  return Math.floor(classMargin); // Round down to avoid overestimation
}
