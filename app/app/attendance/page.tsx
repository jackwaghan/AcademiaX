'use client';
import { useAttendanceQuery } from '@/hooks/query';
import { attendanceStatus } from '@/utils/attendanceStatus';
import React from 'react';

const Page = () => {
  const { data } = useAttendanceQuery();
  const attendance = data?.attendance;
  if (attendance?.length === 0) {
    return (
      <div className='flex h-full w-full items-center justify-center text-lg font-medium text-gray-500'>
        No attendance data available
      </div>
    );
  }
  return (
    <div className='m-4 flex flex-col rounded-xl border border-neutral-500/30 bg-orange-200 text-sm text-black'>
      {attendance?.map((item, i) => {
        const data =
          item.courseConducted > 0 &&
          attendanceStatus({
            conducted: item.courseConducted,
            absent: item.courseAbsent,
          });

        return (
          <div
            key={i}
            className={`flex flex-col gap-3 border-neutral-500/30 p-3 ${i !== attendance.length - 1 && 'border-b'} `}
          >
            <div className='flex items-center justify-between'>
              <div className='flex w-[70%] flex-col gap-1'>
                <h1 className=''>{item.courseTitle}</h1>
                <h1 className='text-sm text-gray-500'>
                  {item.courseCode} - {item.courseCategory}
                </h1>
              </div>
              <div
                className={`rounded border border-neutral-500/30 bg-orange-100 px-2 py-1 text-center text-lg font-bold ${
                  item.courseAttendance.length === 0
                    ? 'text-gray-500'
                    : Number(item.courseAttendance) >= 75
                      ? 'text-green-600'
                      : 'text-red-600'
                } `}
              >
                {item.courseAttendance ? `${item.courseAttendance}%` : 'N/A'}
              </div>
            </div>
            {data && (
              <div className='flex gap-4 text-xs'>
                <div className='flex items-center gap-3 rounded border border-neutral-500/30 bg-orange-100 py-1 pr-3 pl-1.5'>
                  <span className='flex rounded border border-neutral-500/30 bg-orange-300 px-2 py-1 text-center'>
                    {item.courseConducted}
                  </span>
                  {item.courseConducted - item.courseAbsent}
                </div>

                <div className='flex items-center gap-2 rounded border border-neutral-500/30 bg-orange-100 py-1 pr-1.5 pl-2 capitalize'>
                  {data.status}
                  <span
                    className={`flex rounded px-2 py-1 text-center ${data.status === 'required' ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'} `}
                  >
                    {data.classes}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Page;
