'use client';

import React from 'react';
import { useTimetableQuery } from '@/hooks/query';
import { Minus, Plus } from 'lucide-react';
import { Loading } from '../Components/global';
import { Dayorder } from '@/utils/dayOrder';

const Page = () => {
  const { data, isLoading: timetableLoading } = useTimetableQuery();
  const timetable = data?.timetable;
  const [day, setDay] = React.useState(false);
  const [dayOrder, setDayOrder] = React.useState<number>(1);
  const { currentMonthData, isLoading } = Dayorder();

  React.useEffect(() => {
    if (currentMonthData && currentMonthData[0].dayOrder !== '-' && !day) {
      setDayOrder(Number(currentMonthData[0].dayOrder));
      setDay(true);
    }
  }, [currentMonthData, day]);

  if (timetableLoading || isLoading) {
    return <Loading data='Fetching Timetable' />;
  }
  if (!timetable || timetable.length === 0) {
    return <Loading data='No timetable data available' />;
  }

  return (
    <div className='text-white'>
      <div className='bg-muted-background sticky top-0 z-10 p-4'>
        <div className='relative z-20 flex h-[170px] items-center justify-center rounded-xl border border-neutral-500/30 bg-orange-300 text-4xl text-black'>
          {dayOrder}
          <button
            disabled={dayOrder === 1}
            onClick={() => dayOrder > 1 && setDayOrder(dayOrder - 1)}
            className='absolute top-17 left-14 flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-500/30 bg-orange-100'
          >
            <Minus className='h-5 w-5' />
          </button>
          <button
            disabled={dayOrder === 5}
            onClick={() => dayOrder !== 5 && setDayOrder(dayOrder + 1)}
            className='absolute top-17 right-14 flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-500/30 bg-orange-100'
          >
            <Plus className='h-5 w-5' />
          </button>
          <div
            onClick={() => {
              if (currentMonthData && currentMonthData[0].dayOrder !== '-') {
                setDayOrder(Number(currentMonthData[0].dayOrder));
              }
            }}
            className='absolute top-2 flex items-center gap-2 rounded border border-neutral-500/30 bg-orange-200 py-0.5 pr-0.5 pl-2 text-sm font-medium text-gray-700'
          >
            Today
            <span className='rounded border border-neutral-500/30 bg-orange-100 px-2 py-0.5 font-medium text-black'>
              {currentMonthData && currentMonthData[0].dayOrder !== '-'
                ? currentMonthData[0].dayOrder
                : 'Holiday'}
            </span>
          </div>
        </div>
      </div>
      <div className='-z-10 mx-4 my-2 flex flex-col rounded-xl border border-neutral-500/30 text-black'>
        {timetable[dayOrder - 1].class.map((item, i) => {
          return (
            <div
              key={i}
              className={`flex min-h-12 flex-col gap-3 border-b border-neutral-500/30 px-4 py-2 first:rounded-t-xl last:rounded-b-xl ${item.isClass ? 'bg-orange-200' : 'bg-orange-100'} }`}
            >
              <div className='flex items-center justify-between text-sm font-medium'>
                <div
                  className={`flex ${item.isClass ? 'flex w-[80%]' : 'w-full text-gray-500'}`}
                >
                  {item.isClass ? item.courseTitle : 'Break'}
                </div>
                {item.isClass && (
                  <div className='flex h-5 w-5 items-center justify-center rounded-full border border-neutral-500/30 bg-orange-100 text-center text-sm text-black'>
                    {item.courseType?.charAt(0)}
                  </div>
                )}
              </div>
              <div className='flex items-center justify-between text-sm text-gray-600'>
                <div>{item.courseRoomNo}</div>
                <div>{item.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
