'use client';
import {
  useAttendanceQuery,
  useCalendarQuery,
  useCourseQuery,
  useMarksQuery,
  useTimetableQuery,
  useUserInfoQuery,
} from '@/hooks/query';
import { usePathname } from 'next/navigation';
// import path from 'path'; // Removed, not available in browser
import React from 'react';
import { RotateCcw } from 'lucide-react';
import Menu, { IconMenuCard } from './menu';
const Header = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  type RouteKey =
    | 'timetable'
    | 'attendance'
    | 'marks'
    | 'course'
    | 'calendar'
    | 'userinfo';
  const [route, setRoute] = React.useState<RouteKey>('timetable');
  const [iconMenuOpen, setIconMenuOpen] = React.useState(false);
  const [time, setTime] = React.useState('');

  const query = {
    timetable: useTimetableQuery(),
    attendance: useAttendanceQuery(),
    marks: useMarksQuery(),
    course: useCourseQuery(),
    calendar: useCalendarQuery(),
    userinfo: useUserInfoQuery(),
  };

  const queryResult = query[route];
  const dataUpdatedAt = queryResult?.dataUpdatedAt;
  const refetch = queryResult?.refetch;
  const isRefetching = queryResult?.isRefetching;
  const error = queryResult?.error;
  const isError = queryResult?.isError;

  React.useEffect(() => {
    const updateTime = () => {
      if (!dataUpdatedAt) return;
      const diff = Date.now() - dataUpdatedAt;
      const minutes = Math.round(diff / 60000);
      if (minutes < 60) {
        setTime(`${minutes} min ago`);
      } else if (minutes < 1440) {
        setTime(`${Math.floor(minutes / 60)} hr ago`);
      } else {
        if (isError) {
          setTime('Error fetching ');
        } else {
          setTime(`${Math.floor(minutes / 1440)} day ago`);
        }
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(interval);
  }, [dataUpdatedAt, isError]);

  React.useEffect(() => {
    const base = (pathname.split('/').pop() ?? '') as RouteKey;
    setRoute(base);
  }, [pathname]);

  return (
    <div className='bg-background flex h-dvh w-screen flex-col overflow-hidden'>
      
      <div className='p-1.5 bg-green-200 flex items-center justify-between gap-6 font-semibold px-5'>
        <h1>Introducing - <span >SRM-Academia-API</span></h1>
        <a className='font-medium text-sm bg-green-300 px-2 py-0.5 border border-neutral-500/30 rounded' href="https://www.linkedin.com/posts/jackwaghan_nodejs-npm-typescript-activity-7356467923122622464-uGo4?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEIFUxQB_U0Ipu6dfGQXMNbpSXcz0iiWLL8" target='_blank'>
        View</a>
      </div>
      <header className='flex h-14 w-full items-center justify-between px-4'>
        <div>
          <h1 className='text-xl font-medium text-black'>AcademiaX</h1>
        </div>
        <div className='flex items-center justify-center gap-6'>
          <Menu />
          <a
            onClick={() => setIconMenuOpen((prev) => !prev)}
            className='flex h-10 w-10 items-center justify-center rounded-full border border-neutral-500/30 bg-green-100 text-xl font-bold text-black capitalize'
          >
            {useUserInfoQuery().data?.userInfo.name?.charAt(0)}
          </a>
          {iconMenuOpen && (
            <div
              className=''
              onMouseDown={(e) => {
                // Only close if click is outside the menu/avatar
                if (e.target === e.currentTarget) setIconMenuOpen(false);
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          )}
          {iconMenuOpen && <IconMenuCard />}
        </div>
      </header>
      <div className='mx-3 mb-1 flex h-10 items-center justify-between px-2 text-sm font-medium text-gray-500'>
        {!isRefetching ? (
          <span>Last updated {time}</span>
        ) : (
          <span>Fetching...</span>
        )}
        <button
          onClick={() => {
            refetch();
          }}
          className='flex h-6 w-6 items-center justify-center'
        >
          <RotateCcw
            className={`h-4 w-4 ${isRefetching ? 'animate-spin' : 'text-black'}`}
          />
        </button>
      </div>
      {isError && (
        <div className='mx-3 mb-1 flex items-center justify-center rounded-lg border border-red-500 bg-red-200 p-1'>
          {error?.message}
        </div>
      )}
      <div className='bg-muted-background mx-3 mb-3 flex-1 overflow-auto rounded-xl border border-neutral-500/30'>
        {children}
      </div>
    </div>
  );
};

export default Header;
