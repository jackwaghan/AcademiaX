type Course = {
  title: string;
  code: string;
  type: string;
  credit: string;
  room: string;
  category: string;
};

type TimetableData = {
  [key: string]: {
    [timeSlot: string]: Course;
  };
};

export const combineConsecutiveClasses = (
  data: TimetableData
): TimetableData => {
  const combinedData: TimetableData = {};

  let lastClass: string | null = null;
  let lastStartTime: string = "";
  let lastEndTime: string = "";

  // Iterate through the time slots to combine consecutive classes
  for (const timeSlot in data) {
    const [startTime, endTime] = timeSlot.split(" - ");

    if (lastClass && data[timeSlot] === data[lastClass]) {
      // If the current class matches the previous class, extend the end time
      lastEndTime = endTime;
    } else {
      // If it's a new class, store the last class and reset
      if (lastClass) {
        combinedData[`${lastStartTime} - ${lastEndTime}`] = data[lastClass];
      }
      lastClass = timeSlot;
      lastStartTime = startTime;
      lastEndTime = endTime;
    }
  }

  // Ensure to add the last class if any
  if (lastClass) {
    combinedData[`${lastStartTime} - ${lastEndTime}`] = data[lastClass];
  }

  return combinedData;
};
