export const TimeInRange = (startTime: string, endTime: string): boolean => {
  // Get current time
  const now = new Date();

  // Extract current hours and minutes
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert current time to minutes

  // Parse start and end times and convert them to minutes
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startTimeInMinutes = startHour * 60 + startMinute; // Convert start time to minutes
  const endTimeInMinutes = endHour * 60 + endMinute; // Convert end time to minutes

  // Check if current time is within the range
  return currentTime >= startTimeInMinutes && currentTime <= endTimeInMinutes;
};
