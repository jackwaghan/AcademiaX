import { TimetableData } from "@/Types/type";

export function getCurrentAndNextTimeslot(
  schedule: TimetableData,
  dayOrder: string
) {
  const daySchedule = schedule[dayOrder];
  if (!daySchedule) return { current: null, next: null }; // No schedule for this day

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const timeslots = Object.keys(daySchedule).map((timeslot) => {
    const [startStr, endStr] = timeslot.split(" - ");
    const [startHour, startMinute] = startStr.split(":").map(Number);
    const [endHour, endMinute] = endStr.split(":").map(Number);

    return {
      timeslot,
      startMinutes: startHour * 60 + startMinute,
      endMinutes: endHour * 60 + endMinute,
    };
  });

  // Sort timeslots by start time
  timeslots.sort((a, b) => a.startMinutes - b.startMinutes);

  let current = null;
  let next = null;

  for (let i = 0; i < timeslots.length; i++) {
    const slot = timeslots[i];

    if (
      currentMinutes >= slot.startMinutes &&
      currentMinutes <= slot.endMinutes
    ) {
      current = slot.timeslot;
      next = timeslots[i + 1] ? timeslots[i + 1].timeslot : null;
      break;
    }
  }

  return { current, next };
}
