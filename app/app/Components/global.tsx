import React from 'react';

export const Loading = ({ data }: { data: string }) => {
  return (
    <div className='flex h-full w-full items-center justify-center text-lg font-medium text-gray-500'>
      {data}
    </div>
  );
};
