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
      if (typeof window !== 'undefined') {
        window.localStorage.clear();
      }
      Object.keys(Cookies.get()).forEach((cookieName) =>
        Cookies.remove(cookieName),
      );
      setsuccess(true);
    } catch (error) {
      console.error('Error during logout:', error);
      if (typeof window !== 'undefined') {
        window.localStorage.clear();
      }
      Object.keys(Cookies.get()).forEach((cookieName) =>
        Cookies.remove(cookieName),
      );
      setsuccess(true);
    }
  }

  if (!success) {
    return (
      <div className='flex h-screen w-screen animate-pulse items-center justify-center text-xl font-medium text-black'>
        Logging you out...
      </div>
    );
  }
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
  return null;
};

export default Page;
