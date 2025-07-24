'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
// import path from 'path'; // Removed, not available in browser
import { ArrowDownRightSquareIcon } from 'lucide-react';
import Link from 'next/link';

const Menu = () => {
  const pathname = usePathname();
  const [toggle, setToggle] = React.useState(false);
  return (
    <div
      onClick={() => setToggle((prev) => !prev)}
      className='text-md relative flex items-center justify-center gap-2 rounded-lg border border-neutral-500/30 bg-orange-100 px-2 py-1'
    >
      <h1 className='capitalize'>{pathname.split('/').pop()}</h1>
      <span className='rounded-lg border border-neutral-500/30 bg-orange-300 p-0.5'>
        <ArrowDownRightSquareIcon className='h-5 w-5' />
        {toggle && (
          <MenuCard
            setToggle={setToggle}
            path={pathname.split('/').pop() ?? ''}
          />
        )}
        {toggle && (
          <div
            className=''
            onMouseDown={(e) => {
              e.stopPropagation(); // Prevent parent onClick
              if (e.target === e.currentTarget) setToggle(false);
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
      </span>
    </div>
  );
};

export default Menu;

const MenuCard = ({
  path,
  setToggle,
}: {
  path: string;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const items = [
    {
      name: 'timetable',
      url: '/app/timetable',
    },

    {
      name: 'attendance',
      url: '/app/attendance',
    },
    {
      name: 'marks',
      url: '/app/marks',
    },
    {
      name: 'calendar',
      url: '/app/calendar',
    },
    {
      name: 'course',
      url: '/app/course',
    },
  ];
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='absolute top-10 left-0 z-50 flex h-fit flex-col rounded-lg border border-neutral-500/30 bg-orange-100'
    >
      {items.map((item, i) => {
        if (path === item.name) return null;
        return (
          <Link
            key={i}
            href={item.url}
            className='flex items-center border-b border-neutral-500/30 px-3.5 py-1.5 capitalize last:border-0'
            onClick={() => setToggle(false)}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export const IconMenuCard = () => {
  const items = [
    {
      name: 'profile',
      url: '',
    },
    {
      name: 'smart fetch',
      url: '/app/attendance',
    },
    {
      name: 'bugs',
      url: '/app/',
    },
    {
      name: 'logout',
      url: '/logout',
    },
  ];

  return (
    <div className='absolute top-14 right-5 z-50 flex w-38 flex-col rounded-xl border border-neutral-500/30'>
      {items.map((item, i) => (
        <a
          key={i}
          href={item.url}
          className={`items-center px-3.5 py-1.5 text-black capitalize first:rounded-t-xl last:rounded-b-xl ${item.name === 'logout' ? 'bg-red-400 text-white' : 'bg-green-100'}`}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};
