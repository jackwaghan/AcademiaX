import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';

import GoogleAnalytics from './googleAnalytics';

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
      {/* <head>
        <link
          rel='icon'
          type='image/png'
          href='%PUBLIC_URL%/favicon-96x96.png'
          sizes='96x96'
        />
        <link rel='icon' type='image/svg+xml' href='%PUBLIC_URL%/favicon.svg' />
        <link rel='shortcut icon' href='%PUBLIC_URL%/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='%PUBLIC_URL%/apple-touch-icon.png'
        />
        <meta name='apple-mobile-web-app-title' content='AcademiaX' />
        <link rel='manifest' href='%PUBLIC_URL%/site.webmanifest' />
      </head> */}
      <body
        className={`${geistMono.variable} ${geistSans.variable} font-geist-sans bg-background text-black antialiased`}
      >
        <GoogleAnalytics />

        <ThemeProvider defaultTheme='light' attribute='data-theme'>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
