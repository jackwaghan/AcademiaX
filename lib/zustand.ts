import {
  Attendance,
  Marks,
  Sidebar,
  TimetableData,
  User,
  UserInfo,
} from "@/Types/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSidebar = create<Sidebar>()(
  persist(
    (set) => ({
      isOpen: true,
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: "sidebar" }
  )
);

export const useUser = create<UserInfo>()((set) => ({
  user: null,
  marks: null,
  attendance: null,
  timetable: null,
  dayorder: null,
  day: "0",
  loading: true,
  clearing: false,
  logout: async () => {
    set({
      user: null,
      marks: null,
      attendance: null,
      timetable: null,
      dayorder: null,
    });
    localStorage.removeItem("sidebar");
    await fetch("/api/logout", {
      method: "GET",
      credentials: "include",
    });
    window.location.href = "/auth/login";
  },
  setUser: (data: User) => set({ user: data }),
  setMarks: (data: Marks) => set({ marks: data }),
  setAttendance: (data: Attendance) => set({ attendance: data }),
  setTimetable: (data: TimetableData) => set({ timetable: data }),
  setLoading: (data: boolean) => set({ loading: data }),
  setDay: (data: string) => set({ day: data }),
}));
