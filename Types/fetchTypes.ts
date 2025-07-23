export type timetableType = {
  timetable: {
    dayOrder: string;
    class: TimetableClassType;
  }[];
  status: number;
};

export type TimetableClassType = {
  slot: string;
  isClass: boolean;
  courseTitle?: string;
  courseCode?: string;
  courseType?: string;
  courseCategory?: string;
  courseRoomNo?: string;
  time: string;
}[];

export type attendanceType = {
  attendance: attendanceDataType;
  status: number;
};

export type attendanceDataType = {
  courseCode: string;
  courseType: string;
  courseTitle: string;
  courseCategory: string;
  courseFaculty: string;
  courseSlot: string;
  courseAttendance: string;
}[];

export type marksType = {
  markList: marksDataType;
  status: number;
};

export type marksDataType = {
  course: string;
  category: string;
  marks: {
    exam: string;
    obtained: string;
    maxMark: string;
  }[];
  total: {
    obtained: number;
    maxMark: number;
  };
}[];

export type courseType = {
  courseList: courseDataType;
  batch: string;
  status: number;
};

export type courseDataType = {
  courseCode: string;
  courseTitle: string;
  courseCredit: string;
  courseCategory: string;
  courseType: string;
  courseFaculty: string;
  courseSlot: string[];
  courseRoomNo: string;
}[];

export type calendarType = {
  calendar: calendarDataType;
  status: number;
};

export type calendarDataType = {
  month: string;
  days: {
    date: string;
    day: string;
    dayOrder: string;
    event: string;
  }[];
}[];
