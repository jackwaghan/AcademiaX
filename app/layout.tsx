import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import PWAInstaller from "./components/PwaInstaller";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AcademiaX SRM",
  description:
    "Academix SRM helps you manage your attendance, marks, timetable, and more, all in one beautifully designed platform tailored for SRM students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="AcademiaX" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${poppins.variable} ${geistMono.variable} antialiased  `}
      >
        <ThemeProvider
          enableSystem={false}
          defaultTheme="dark"
          attribute="class"
        >
          <PWAInstaller />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
