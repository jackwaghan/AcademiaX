'use client';
import { useCourseQuery } from '@/hooks/query';
import React from 'react';

const Page = () => {
  const { data } = useCourseQuery();
  const courseList = data?.courseList;
  return (
    <div className='flex flex-col gap-4 p-4 text-black'>
      {courseList?.map((item, i: number) => {
        return (
          <div
            key={i}
            className='flex flex-col gap-2 rounded-lg border border-neutral-500/30 bg-orange-200 p-3'
          >
            <div className='flex items-center justify-between text-sm'>
              <h1 className='w-[70%]'>{item.courseTitle}</h1>
              <div className='flex items-center gap-2 rounded border border-neutral-500/30 bg-orange-100 py-0.5 pr-0.5 pl-2 text-center text-sm font-medium'>
                credit{' '}
                <span className='flex rounded border border-neutral-500/30 bg-orange-300 px-1.5'>
                  {item.courseCredit}
                </span>
              </div>
            </div>
            <div className='mt-1 flex flex-col rounded-xl border-2 border-dotted border-neutral-500 bg-orange-100 py-2 text-sm'>
              {[
                {
                  label: 'Course Code',
                  value: item.courseCode,
                },
                {
                  label: 'Faculty Name',
                  value: item.courseFaculty,
                },
                {
                  label: 'Course Type',
                  value: item.courseType,
                },
                {
                  label: 'Course Room No',
                  value: item.courseRoomNo,
                },
              ].map(({ label, value }) => (
                <div
                  className='flex items-center justify-between px-3 py-1.5'
                  key={label}
                >
                  <span className='text-xs font-medium text-gray-700'>
                    {label}
                  </span>
                  <span className='text-xs font-medium text-gray-700'>
                    {value.includes('(') ? value.split('(')[0].trim() : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
