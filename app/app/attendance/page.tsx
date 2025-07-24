'use client';
import { useAttendanceQuery } from '@/hooks/query';
import React from 'react';

const Page = () => {
  const { data } = useAttendanceQuery();
  const attendance = data?.attendance;
  if (!attendance || attendance.length === 0) {
    return (
      <div className='flex h-full w-full items-center justify-center text-lg font-medium text-gray-500'>
        No attendance data available
      </div>
    );
  }
  return (
    <div className='m-4 flex flex-col rounded-xl border border-neutral-500/30 bg-orange-200 text-sm text-black'>
      {attendance?.map((item, i) => (
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
          {item.courseConducted > 0 && (
            <div className='flex gap-4 text-xs'>
              <div className='flex items-center gap-2 rounded border border-neutral-500/30 bg-orange-100 py-1 pr-2 pl-1'>
                <span className='flex rounded border border-neutral-500/30 bg-orange-300 px-1.5 py-1 text-center'>
                  {item.courseConducted}
                </span>
                {item.courseConducted - item.courseAbsent}
              </div>
              <div className='flex items-center gap-2 rounded border border-neutral-500/30 bg-orange-100 py-1 pr-1 pl-2'>
                Margin
                <span className='flex rounded border border-neutral-500/30 bg-orange-300 px-2 py-1 text-center'>
                  1
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Page;
