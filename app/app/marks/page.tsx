'use client';
import { useCourseQuery, useMarksQuery } from '@/hooks/query';
import React from 'react';
import { Loading } from '../Components/global';

const Page = () => {
  const { data, isLoading, isError } = useMarksQuery();
  const courseInfo = useCourseQuery().data;
  const markList = data?.markList;
  const courseTitle = (idx: string) =>
    courseInfo && courseInfo.courseList.find((item) => item.courseCode === idx);

  if (!isError && !isLoading && markList?.length === 0) {
    return <Loading data='No marks available' />;
  }
  if (isLoading) {
    return <Loading data='Fetching Marks' />;
  }

  return (
    <div className='text-black'>
      <div className='flex flex-col gap-4 px-4 py-6'>
        {markList?.map((item, i) => {
          const courseDetails = courseTitle(item.course);
          if (!courseDetails) {
            return null;
          }
          return (
            <div
              key={i}
              className='flex flex-col rounded-lg border border-neutral-500/30 bg-orange-100 text-xs'
            >
              <div className='flex items-center justify-between rounded-t-lg border-b border-neutral-500/30 bg-orange-200 p-2'>
                <div className='flex w-[70%] flex-col gap-1'>
                  <h1 className='text-sm'>{courseDetails?.courseTitle}</h1>
                  <h2 className='text-gray-600'>
                    {courseDetails?.courseCode} - {courseDetails?.courseType}
                  </h2>
                </div>
                <div className='flex items-center gap-2 rounded border border-neutral-500/30 bg-orange-100 py-0.5 pr-0.5 pl-2 text-center font-medium'>
                  Credit{' '}
                  <span className='rounded border border-neutral-500/30 bg-orange-300 px-2 py-0.5'>
                    {courseDetails?.courseCredit || '0'}
                  </span>
                </div>
              </div>
              <div className='flex flex-col gap-2 p-3'>
                {item.marks.map((item, i) => {
                  return (
                    <div key={i} className='flex items-center justify-between'>
                      <div className='w-[60%] font-medium text-gray-700'>
                        {item.exam}
                      </div>
                      <div className='flex items-center gap-2 rounded border border-neutral-500/30 bg-orange-200 py-0.5 pr-0.5 pl-2 font-medium text-gray-700'>
                        {item.obtained}{' '}
                        <span className='rounded border border-neutral-500/30 bg-orange-100 p-1 py-0.5 font-medium text-black'>
                          {item.maxMark}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {item.marks.length === 0 && (
                  <h1 className='flex min-h-20 items-center justify-center text-sm text-black/50'>
                    No marks Available
                  </h1>
                )}
              </div>
              {item.marks.length > 0 && totalMarks(item.total)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;

const totalMarks = (marks: { obtained: number; maxMark: number }) => {
  return (
    <div className='flex items-center justify-between p-3'>
      <div className='w-[60%] text-sm font-medium text-gray-700'>Total</div>
      <div className='flex items-center gap-2 rounded border border-neutral-500/30 bg-orange-200 py-0.5 pr-0.5 pl-2 font-medium text-gray-700'>
        {marks.obtained}
        <span className='rounded border border-neutral-500/30 bg-orange-100 p-1 py-0.5 font-medium text-black'>
          {marks.maxMark}
        </span>
      </div>
    </div>
  );
};
