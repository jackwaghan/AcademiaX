import { Course, TimetableData } from "@/Types/type";

export default function mergeSameTitleTimeslots(
  schedule: TimetableData,
  dayOrder: string
) {
  const daySchedule = schedule[dayOrder];
  if (!daySchedule) return null; // No schedule for this day

  const mergedSchedule = new Map<string, Course>(); // Use Map to maintain order
  let prevSlot: Course | null = null;
  let prevStart: string | null = null;
  let prevEnd: string | null = null;

  // Convert keys (timeslots) to an array and sort them based on start time
  const sortedTimeslots = Object.keys(daySchedule).sort((a, b) => {
    const getMinutes = (time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    return getMinutes(a.split(" - ")[0]) - getMinutes(b.split(" - ")[0]);
  });

  for (const timeslot of sortedTimeslots) {
    const { title, code, type, credit, room, category } = daySchedule[timeslot];
    const [start, end] = timeslot.split(" - ");

    if (prevSlot && prevSlot.title === title && prevSlot.code === code) {
      // Extend the previous timeslot range
      prevEnd = end;
    } else {
      // Save the previous merged slot before starting a new one
      if (prevSlot) {
        mergedSchedule.set(`${prevStart} - ${prevEnd}`, prevSlot);
      }

      // Start a new timeslot
      prevSlot = { title, code, type, credit, room, category };
      prevStart = start;
      prevEnd = end;
    }
  }

  // Save the last merged timeslot
  if (prevSlot) {
    mergedSchedule.set(`${prevStart} - ${prevEnd}`, prevSlot);
  }

  // Convert Map to Object (preserving order)
  return Object.fromEntries(mergedSchedule);
}
