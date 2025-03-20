import { timetable } from "@/lib/data";
import { Course, TimetableData } from "@/Types/type";

const data: TimetableData = timetable;

// Function to convert time string to minutes
const convertToMinutes = (time: string): number => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

// Function to get the current time in minutes
const getCurrentTimeInMinutes = (): number => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

// Function to find the next class based on the current time
export const getNextClass = (): Course | null => {
  const currentTime = getCurrentTimeInMinutes();

  // Create an array of time slots and their corresponding courses
  const timeSlots = Object.keys(data);

  // Sort the time slots based on their start time (ascending)
  const sortedTimeSlots = timeSlots.sort((a, b) => {
    const startA = convertToMinutes(a.split(" - ")[0]);
    const startB = convertToMinutes(b.split(" - ")[0]);
    return startA - startB;
  });

  // Loop through sorted time slots and find the next class
  for (const timeSlot of sortedTimeSlots) {
    const [startTime] = timeSlot.split(" - ");
    const startTimeInMinutes = convertToMinutes(startTime);

    // If the start time of the current class is greater than the current time, return the class
    if (startTimeInMinutes > currentTime) {
      return data[timeSlot] as unknown as Course;
    }
  }

  // If no more classes are found, return null
  return null;
};
