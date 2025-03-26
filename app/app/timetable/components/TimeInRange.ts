import { TimetableData } from "@/Types/type";

export function getCurrentAndNextTimeslot(
  schedule: TimetableData,
  dayOrder: string
) {
  const daySchedule = schedule[dayOrder];
  if (!daySchedule) return { current: null, next: null };

  const now = getCurrentTime(); // Get current time in 24-hour format
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

  // If no current class is found, check the next available class
  if (!current) {
    for (let i = 0; i < timeslots.length; i++) {
      if (currentMinutes < timeslots[i].startMinutes) {
        next = { timeslot: timeslots[i].timeslot, ...timeslots[i].details };
        break;
      }
    }
  }

  return { current, next };
}

function convertTo24Hour(timeStr: string) {
  const [hourStr, minuteStr] = timeStr.split(":");
  let hour = Number(hourStr);
  const minute = Number(minuteStr);

  // Convert 12-hour format to 24-hour format based on logical sequence
  if (hour === 12) {
    hour = 0; // 12:XX should be treated as 0:XX in 24-hour time
  }
  if (hour < 7) {
    hour += 12; // Assume times before 7 are PM (e.g., "1:00" should be 13:00)
  }

  return { hour, minute };
}

function getCurrentTime() {
  const time = new Date();
  return { hour: time.getHours(), minute: time.getMinutes() };
}
