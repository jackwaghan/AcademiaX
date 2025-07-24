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
import { CheckIcon, InfoIcon, Loader2Icon } from 'lucide-react';
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
    <div className='flex h-full flex-col gap-20 p-4 text-black'>
      <h1 className='mt-14 flex w-full animate-pulse items-center justify-center p-2 text-xl font-medium text-gray-600'>
        {progress}
      </h1>
      <ul className='flex flex-col gap-4 rounded-lg border border-neutral-500/30 bg-orange-100 p-3'>
        <li className='flex items-center justify-between'>
          <h1>TimeTable</h1>
          <span>
            {TimetableLoading ? (
              <Loader2Icon className='h-4 w-4 animate-spin' />
            ) : TimetableSuccess ? (
              <CheckIcon className='h-4 w-4 text-green-500' />
            ) : (
              <InfoIcon className='h-4 w-4 text-red-500' />
            )}
          </span>
        </li>
        <li className='flex items-center justify-between'>
          <h1>Attendance</h1>
          <span>
            {AttendanceLoading ? (
              <Loader2Icon className='h-4 w-4 animate-spin' />
            ) : AttendanceSuccess ? (
              <CheckIcon className='h-4 w-4 text-green-500' />
            ) : (
              <InfoIcon className='h-4 w-4 text-red-500' />
            )}
          </span>
        </li>
        <li className='flex items-center justify-between'>
          <h1>Marks</h1>
          <span>
            {MarksLoading ? (
              <Loader2Icon className='h-4 w-4 animate-spin' />
            ) : MarksSuccess ? (
              <CheckIcon className='h-4 w-4 text-green-500' />
            ) : (
              <InfoIcon className='h-4 w-4 text-red-500' />
            )}
          </span>
        </li>
        <li className='flex items-center justify-between'>
          <h1>Course</h1>
          <span>
            {CourseLoading ? (
              <Loader2Icon className='h-4 w-4 animate-spin' />
            ) : CourseSuccess ? (
              <CheckIcon className='h-4 w-4 text-green-500' />
            ) : (
              <InfoIcon className='h-4 w-4 text-red-500' />
            )}
          </span>
        </li>
        <li className='flex items-center justify-between'>
          <h1>Calendar</h1>
          <span>
            {CalendarLoading ? (
              <Loader2Icon className='h-4 w-4 animate-spin' />
            ) : CalendarSuccess ? (
              <CheckIcon className='h-4 w-4 text-green-500' />
            ) : (
              <InfoIcon className='h-4 w-4 text-red-500' />
            )}
          </span>
        </li>
        <li className='flex items-center justify-between'>
          <h1>User Info</h1>
          <span>
            {UserInfoLoading ? (
              <Loader2Icon className='h-4 w-4 animate-spin' />
            ) : UserInfoSuccess ? (
              <CheckIcon className='h-4 w-4 text-green-500' />
            ) : (
              <InfoIcon className='h-4 w-4 text-red-500' />
            )}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Progress;
