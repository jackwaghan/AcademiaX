import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';

const geistSans = Geist({
  variable: '--font-geist-sans',
  weight: '400',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AcademiaX',
  description: 'Academia wrapper',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistMono.variable} ${geistSans.variable} font-geist-sans bg-background text-black antialiased`}
      >
        <ThemeProvider defaultTheme='light' attribute='data-theme'>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
