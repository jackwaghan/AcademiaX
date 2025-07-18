'use client';
import { useTheme } from 'next-themes';
import React from 'react';
export default function Home() {
  const { themes } = useTheme();
  console.log('Available themes:', themes);
  return <div className=''>{themes}</div>;
}
