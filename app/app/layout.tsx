import React from 'react';
import Header from './Components/header';
import { Providers } from './Components/providers';
import { Metadata } from 'next';

const description =
  'AcademiaX helps you manage your attendance, marks, timetable, and more, all in one beautifully designed platform tailored for SRM students.';
export const metadata: Metadata = {
  title: 'AcademiaX',
  description,
  authors: [{ name: 'jackwaghan', url: 'https://jackwaghan.com' }],
  keywords: ['SRM', 'Academia', 'AcademiaX', 'AcademiaX SRM', 'SRM Academia'],
  openGraph: {
    title: 'AcademiaX',
    description,
    url: 'https://academiax.in',
    siteName: 'AcademiaX',
    images: [
      {
        url: 'https://academiax.in/screenshots/Desktop.png',
        width: 1920,
        height: 1080,
        alt: 'AcademiaX',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@academiax',
    title: 'AcademiaX',
    description,
    creator: '@jackwaghan',
    images: ['https://academiax.in/screenshots/Desktop.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body className='antialiased'>
        <Providers>
          <Header>{children}</Header>
        </Providers>
      </body>
    </html>
  );
}
