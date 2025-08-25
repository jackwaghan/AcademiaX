import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Discover a sleek and modern way to manage your academics - no clutter, just clarity.";
export const metadata: Metadata = {
  title: "AcademiaX SRM",
  description,
  authors: [{ name: "jackwaghan", url: "https://jackwaghan.com" }],
  keywords: ["SRM", "Academia", "AcademiaX", "AcademiaX SRM", "SRM Academia"],
  openGraph: {
    title: "AcademiaX",
    description,
    url: "https://academiax.in",
    siteName: "AcademiaX",
    images: [
      {
        url: "https://academiax.in/Landing/BigScreen.png",
        width: 1200,
        height: 630,
        alt: "AcademiaX",
        type: "image/png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@academiax",
    title: "AcademiaX",
    description,
    creator: "@jackwaghan",
    images: [
      {
        url: "https://academiax.in/Landing/BigScreen.png",
        width: 1200,
        height: 630,
        alt: "AcademiaX",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiase overflow-hidden`}
      >
        {children}
      </body>

      {/* <GoogleAnalytics gaId={process.env.GA_TRACKING_CODE!} /> */}
    </html>
  );
}
