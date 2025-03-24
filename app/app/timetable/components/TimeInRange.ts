import { TimetableData } from "@/Types/type";

export function getCurrentAndNextTimeslot(
  schedule: TimetableData,
  dayOrder: string
) {
  const daySchedule = schedule[dayOrder];
  if (!daySchedule) return { current: null, next: null };
  const now = getcurrentTime(); // 12-hour format
  const currentMinutes = now.hour * 60 + now.minute;

  const timeslots = Object.keys(daySchedule).map((timeslot) => {
    const [startStr, endStr] = timeslot.split(" - ");
    const startTime = convertTo24Hour(startStr);
    const endTime = convertTo24Hour(endStr);

    return {
      timeslot,
      startMinutes: startTime.hour * 60 + startTime.minute,
      endMinutes: endTime.hour * 60 + endTime.minute,
      details: daySchedule[timeslot],
    };
  });

  // Ensure timeslots are sorted in ascending order of start time
  timeslots.sort((a, b) => a.startMinutes - b.startMinutes);

  let current = null;
  let next = null;

  for (let i = 0; i < timeslots.length; i++) {
    const slot = timeslots[i];

    if (
      currentMinutes >= slot.startMinutes &&
      currentMinutes < slot.endMinutes
    ) {
      current = { timeslot: slot.timeslot, ...slot.details };
      next = timeslots[i + 1]
        ? { timeslot: timeslots[i + 1].timeslot, ...timeslots[i + 1].details }
        : null;
      break;
    }
  }

  // If no current class is found, set the first class as next
  if (!current) {
    next =
      timeslots.length > 0
        ? { timeslot: timeslots[0].timeslot, ...timeslots[0].details }
        : null;
  }

  return { current, next };
}

function convertTo24Hour(timeStr: string) {
  const [hour, minute] = timeStr.split(":").map(Number);
  let currentHour = hour;
  if (1 <= currentHour && currentHour <= 5) {
    currentHour = currentHour + 12;
  }

  return { hour, minute };
}

function getcurrentTime() {
  const time = new Date();
  const minute = time.getMinutes();
  let hour = time.getHours();
  hour = hour >= 13 ? hour - 12 : hour;
  return { hour, minute };
}
