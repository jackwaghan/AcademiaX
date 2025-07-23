'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import path from 'path';
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
      <h1 className='capitalize'>{path.basename(pathname)}</h1>
      <span className='rounded-lg border border-neutral-500/30 bg-orange-300 p-0.5'>
        <ArrowDownRightSquareIcon className='h-5 w-5' />
        {toggle && (
          <MenuCard setToggle={setToggle} path={path.basename(pathname)} />
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
