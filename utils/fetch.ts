'use client';
import axios from 'axios';

export const fetchWithCredentials = async (url: string) => {
  try {
    let token: string | null = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.error('Unauthorized access - redirecting to login');
        if (typeof window !== 'undefined') {
          return (window.location.href = '/logout');
        }
        return;
      }
      throw new Error(
        `${error.response?.data.error} - ${error.response?.status}`,
      );
    } else {
      console.log(error);
    }
  }
};
