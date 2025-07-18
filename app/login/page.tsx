import React from 'react';

const page = () => {
  return (
    <div className='flex h-dvh w-dvw flex-col items-center justify-center p-5 lg:p-0'>
      <div className='bg-muted-background relative flex h-1/2 w-full max-w-6xl flex-col rounded-3xl border border-neutral-500/20 shadow-sm'>
        <div className='grid h-full w-full grid-cols-1 rounded-3xl lg:grid-cols-2'>
          <div className='font-geist-mono m-5 flex items-center justify-center rounded-xl text-2xl lg:rounded-3xl lg:text-5xl'>
            Login
          </div>
          <LoginComponent />
        </div>
      </div>
    </div>
  );
};

export default page;

export const LoginComponent = () => {
  return (
    <form
      action=''
      className='m-5 flex flex-col justify-center gap-6 rounded-3xl py-5 lg:px-10'
    >
      <input
        type='name'
        id='email'
        name='email'
        placeholder='Email'
        required
        className='bg-background rounded-xl border border-neutral-500/20 px-5 py-3 text-xl shadow-sm focus:ring-2 focus:ring-neutral-500 focus:outline-none'
      />

      <input
        type='password'
        id='password'
        name='password'
        placeholder='Password'
        required
        className='bg-background rounded-xl border border-neutral-500/20 px-5 py-3 text-xl shadow-sm focus:ring-2 focus:ring-neutral-500 focus:outline-none'
      />
      <button
        type='submit'
        className='mt-5 rounded-xl bg-black px-4 py-3 text-xl text-white shadow-lg hover:cursor-pointer lg:mt-10'
      >
        Authenticate
      </button>
    </form>
  );
};
