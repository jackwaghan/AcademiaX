'use client';
import { useCalendarQuery } from '@/hooks/query';

export function Dayorder() {
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
  const today = new Date().getMonth();
  const currentDate = new Date().getDate();
  const currentMonth = `${monthNames[today]} '${String(
    new Date().getFullYear(),
  ).slice(-2)}`;
  const { data, isLoading } = useCalendarQuery();

  const currentMonthData = data?.calendar
    .find((month) => month.month === currentMonth)
    ?.days.filter((day) => parseInt(day.date) === currentDate);
  return {
    currentMonthData,
    isLoading,
  };
}
