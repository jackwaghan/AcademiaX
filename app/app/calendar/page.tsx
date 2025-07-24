'use client';
import { useCalendarQuery } from '@/hooks/query';
import { Minus, Plus } from 'lucide-react';
import React from 'react';
import { Loading } from '../Components/global';

const Page = () => {
  const { data } = useCalendarQuery();
  const calendar = data?.calendar;
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const currentDate = new Date();
  const [month, setMonth] = React.useState(currentDate.getMonth());
  const currentMonth = `${monthNames[month]} '${String(currentDate.getFullYear()).slice(-2)}`;
  const currentCalendar = calendar?.find((item) => item.month === currentMonth);
  if (!calendar || !currentCalendar) {
    return <Loading data='No Calendar Data Found' />;
  }
  return (
    <div className='flex flex-col gap-4 text-black'>
      <div className='bg-muted-background sticky top-0 z-10 p-4'>
        <div className='relative z-20 flex h-[150px] items-center justify-center rounded-xl border border-neutral-500/30 bg-orange-300 text-2xl'>
          {currentMonth}
          <button
            disabled={
              calendar.findIndex((item) => item.month === currentMonth) === 0
            }
            onClick={() => {
              const prevIndex = calendar.findIndex(
                (item) => item.month === currentMonth,
              );
              if (prevIndex > 0) {
                setMonth((prev) => prev - 1);
              }
            }}
            className='absolute top-15 left-14 flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-500/30 bg-orange-100'
          >
            <Minus className='h-5 w-5' />
          </button>
          <button
            disabled={
              calendar.findIndex((item) => item.month === currentMonth) ===
              calendar.length - 1
            }
            onClick={() => {
              const nextIndex = calendar.findIndex(
                (item) => item.month === currentMonth,
              );
              if (nextIndex < calendar.length - 1) {
                setMonth((prev) => prev + 1);
              }
            }}
            className='absolute top-15 right-14 flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-500/30 bg-orange-100'
          >
            <Plus className='h-5 w-5' />
          </button>
        </div>
      </div>

      <div className='mx-4 mb-4 flex flex-col rounded-lg border border-neutral-500/30'>
        {currentCalendar?.days.map((event, i) => (
          <div
            key={i}
            className={`flex flex-col gap-2 border-b border-neutral-500/30 p-4 first:rounded-t-lg last:rounded-b-lg ${event.dayOrder !== '-' ? 'bg-orange-300' : 'bg-orange-200'}`}
          >
            <div className='flex items-center justify-between'>
              <p className='flex flex-col items-center gap-2 text-xl font-medium'>
                {event.date}{' '}
                <span className='text-sm font-medium text-gray-700'>
                  {event.day}
                </span>
              </p>
              {event.event.length > 0 ? (
                <div className='w-[70%]'>
                  <p className='rounded-lg border border-neutral-500/30 bg-orange-100 px-2 py-1 text-sm text-gray-600'>
                    {event.event}
                  </p>
                </div>
              ) : null}
              <p className='text-2xl'>{event.dayOrder}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
