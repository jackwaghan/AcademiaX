import React from 'react';

const Navbar = () => {
  return (
    <div className='flex h-full w-full items-center justify-between rounded-xl border border-neutral-500/30 bg-orange-100 px-3 py-1'>
      <div className='flex gap-2 text-lg font-medium'>
        AcademiaX{' '}
        <span className='text-sm text-gray-500 antialiased'>
          V
          <span className='text-xs'>
            2 <span>(Beta)</span>
          </span>
        </span>
      </div>
      <div className='text-md rounded-lg border border-neutral-500/30 bg-orange-300 px-3 py-1.5 font-medium text-black'>
        Back
      </div>
    </div>
  );
};

export default Navbar;
