import {
  attendance,
  Calendar,
  Course,
  marks,
  timetable,
  userInfo,
} from "@/server/action";
import { useQuery } from "@tanstack/react-query";
import {
  DaySchedule,
  AttendanceDetail,
  MarkDetail,
  UserInfo,
  CourseDetail,
  Month,
} from "srm-academia-api";
import { getCookie } from "@/utils/getCookieClient";

export function useTimetable() {
  return useQuery({
    queryKey: ["timetable"],
    queryFn: async () => {
      const { data } = await timetable(getCookie());
      if (data.error) throw new Error(data.error);
      return data.timetable as DaySchedule[];
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: !!getCookie(), // Only fetch if user is authenticated
  });
}

export function useAttendance() {
  return useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const { data } = await attendance(getCookie());
      if (data.error) throw new Error(data.error);
      return data.attendance as AttendanceDetail[];
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!getCookie(), // Only fetch if user is authenticated
  });
}

export function useMarks() {
  return useQuery({
    queryKey: ["marks"],
    queryFn: async () => {
      const { data } = await marks(getCookie());
      if (data.error) throw new Error(data.error);
      return data.markList as MarkDetail[];
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!getCookie(), // Only fetch if user is authenticated
  });
}

export function useUserInfo() {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const { data } = await userInfo(getCookie());
      if (data.error) throw new Error(data.error);
      return data.userInfo as UserInfo;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: !!getCookie(), // Only fetch if user is authenticated
  });
}

export function useCourse() {
  return useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const { data } = await Course(getCookie());
      if (data.error) throw new Error(data.error);
      return data.courseList as CourseDetail[];
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: !!getCookie(), // Only fetch if user is authenticated
  });
}

export function useCalendar() {
  return useQuery({
    queryKey: ["calendar"],
    queryFn: async () => {
      const { data } = await Calendar(getCookie());
      if (data.error) throw new Error(data.error);
      return data.calendar as Month[];
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: !!getCookie(), // Only fetch if user is authenticated
  });
}
