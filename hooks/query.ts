import {
  attendanceType,
  calendarType,
  courseType,
  marksType,
  timetableType,
  userInfoType,
} from '@/Types/fetchTypes';
import { fetchWithCredentials } from '@/utils/fetch';
import { useQuery } from '@tanstack/react-query';

export function useTimetableQuery() {
  return useQuery({
    queryKey: ['timetable'],
    queryFn: async () => {
      const response: timetableType = await fetchWithCredentials(
        `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/timetable`,
      );
      return response;
    },
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    retry: 0,
  });
}

export function useAttendanceQuery() {
  return useQuery({
    queryKey: ['attendance'],
    queryFn: async () => {
      const response: attendanceType = await fetchWithCredentials(
        `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/attendance`,
      );
      // const response: attendanceType = await res.json();
      return response;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 0,
  });
}

export function useMarksQuery() {
  return useQuery({
    queryKey: ['marks'],
    queryFn: async () => {
      const response: marksType = await fetchWithCredentials(
        `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/marks`,
      );
      // const response: marksType = await res.json();
      return response;
    },
    staleTime: 1000 * 60 * 30 * 24, // 1 day
    retry: 0,
  });
}

export function useCourseQuery() {
  return useQuery({
    queryKey: ['course'],
    queryFn: async () => {
      const response: courseType = await fetchWithCredentials(
        `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/course`,
      );
      return response;
    },
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    retry: 0,
  });
}

export function useCalendarQuery() {
  return useQuery({
    queryKey: ['calendar'],
    queryFn: async () => {
      const response: calendarType = await fetchWithCredentials(
        `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/calendar`,
      );
      return response;
    },
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    retry: 0,
  });
}

export function useUserInfoQuery() {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const response: userInfoType = await fetchWithCredentials(
        `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/userinfo`,
      );
      return response;
    },
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    retry: 0,
  });
}
