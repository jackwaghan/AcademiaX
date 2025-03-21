export type Sidebar = {
  isOpen: boolean;
  toggle: () => void;
};

export type UserInfo = {
  user: User | null;
  marks: Marks | null;
  attendance: Attendance | null;
  timetable: TimetableData | null;
  dayorder: Dayorder | null;
  loading: boolean;
  clearing: boolean;
  setUser: (data: User) => void;
  setMarks: (data: Marks) => void;
  setAttendance: (data: Attendance) => void;
  setTimetable: (data: TimetableData) => void;
  setLoading: (data: boolean) => void;
  logout: () => void;
};

export type Course = {
  title: string;
  code: string;
  type: string;
  credit: string;
  room: string;
  category: string;
};

export type TimetableData = {
  [key: string]: {
    [Timeslot: string]: Course;
  };
};

export type User = {
  roll: string;
  name: string;
  program: string;
  department: string;
  specialisation: string;
  semester: string;
  batch: string;
  section: string;
};

export type Marks = {
  name: string;
  code: string;
  type: string;
  marks: {
    name: string;
    mark: string;
    total: string;
  }[];
  credit: string;
  total: string | null;
}[];

export type Attendance = {
  code: string;
  title: string;
  category: string;
  faculty: string;
  slot: string;
  conducted: string;
  absent: string;
  percetage: string;
  margin: number;
}[];

export type Dayorder = {
  do: string | null;
};
