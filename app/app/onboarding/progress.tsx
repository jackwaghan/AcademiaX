'use client';
import {
  useAttendanceQuery,
  useCalendarQuery,
  useCourseQuery,
  useMarksQuery,
  useTimetableQuery,
  useUserInfoQuery,
} from '@/hooks/query';
import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
const Progress = () => {
  const router = useRouter();
  const [progress, setProgress] = React.useState('Parsing Data');
  const { isLoading: TimetableLoading, isSuccess: TimetableSuccess } =
    useTimetableQuery();
  const { isLoading: AttendanceLoading, isSuccess: AttendanceSuccess } =
    useAttendanceQuery();
  const { isLoading: MarksLoading, isSuccess: MarksSuccess } = useMarksQuery();
  const { isLoading: CourseLoading, isSuccess: CourseSuccess } =
    useCourseQuery();
  const { isLoading: CalendarLoading, isSuccess: CalendarSuccess } =
    useCalendarQuery();
  const { isLoading: UserInfoLoading, isSuccess: UserInfoSuccess } =
    useUserInfoQuery();

  React.useEffect(() => {
    if (
      TimetableSuccess &&
      AttendanceSuccess &&
      MarksSuccess &&
      CourseSuccess &&
      CalendarSuccess &&
      UserInfoSuccess
    ) {
      setProgress('Redirecting to Timetable');
      Cookies.set('onboarding', 'true', { expires: 365 });
      return router.push('/app/timetable');
    }
  }, [
    TimetableSuccess,
    AttendanceSuccess,
    MarksSuccess,
    CourseSuccess,
    CalendarSuccess,
    UserInfoSuccess,
    router,
  ]);

  return (
    <div className='flex h-full flex-col gap-28 p-4 text-black'>
      <h1 className='mt-32 flex w-full animate-pulse items-center justify-center p-2 text-xl font-medium text-gray-600'>
        {progress}
      </h1>
      <ul className='flex flex-col gap-4 rounded-lg border border-neutral-500/30 bg-orange-200 p-3'>
        <li className='flex items-center justify-between'>
          <h1>TimeTable</h1>
          <span>
            {TimetableLoading
              ? 'Loading...'
              : TimetableSuccess
                ? 'Loaded'
                : 'Error'}
          </span>
        </li>
        <li className='flex items-center justify-between'>
          <h1>Attendance</h1>
          <span>
            {AttendanceLoading
              ? 'Loading...'
              : AttendanceSuccess
                ? 'Loaded'
                : 'Error'}
          </span>
        </li>
        <li className='flex items-center justify-between'>
          <h1>Marks</h1>
          <span>
            {MarksLoading ? 'Loading...' : MarksSuccess ? 'Loaded' : 'Error'}
          </span>
        </li>
        <li className='flex items-center justify-between'>
          <h1>Course</h1>
          <span>
            {CourseLoading ? 'Loading...' : CourseSuccess ? 'Loaded' : 'Error'}
          </span>
        </li>
        <li className='flex items-center justify-between'>
          <h1>Calendar</h1>
          <span>
            {CalendarLoading
              ? 'Loading...'
              : CalendarSuccess
                ? 'Loaded'
                : 'Error'}
          </span>
        </li>
        <li className='flex items-center justify-between'>
          <h1>User Info</h1>
          <span>
            {UserInfoLoading
              ? 'Loading...'
              : UserInfoSuccess
                ? 'Loaded'
                : 'Error'}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Progress;
