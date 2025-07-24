'use client';
import React from 'react';
import Cookies from 'js-cookie';
import { fetchWithCredentials } from '@/utils/fetch';
const Page = () => {
  const [success, setsuccess] = React.useState(false);
  React.useEffect(() => {
    logout();
  }, []);

  async function logout() {
    try {
      if (Cookies.get('isAuthenticated')) {
        await fetchWithCredentials('http://localhost:3001/api/logout');
      }
      window.localStorage.clear();
      Object.keys(Cookies.get()).forEach((cookieName) =>
        Cookies.remove(cookieName),
      );
      setsuccess(true);
    } catch (error) {
      console.error('Error during logout:', error);
      window.localStorage.clear();
      Object.keys(Cookies.get()).forEach((cookieName) =>
        Cookies.remove(cookieName),
      );
      setsuccess(true);
    }
  }

  if (!success) {
    return (
      <div className='flex h-screen w-screen items-center justify-center text-xl text-black'>
        Logging out
      </div>
    );
  }
  window.location.href = '/login';
};

export default Page;
