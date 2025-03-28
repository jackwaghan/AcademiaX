import { TimetableData } from "@/Types/type";

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
