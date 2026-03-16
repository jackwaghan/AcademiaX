import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
// import { TallyModalRoot } from "./TallyModalRoot";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
        className={`${geistMono.variable} ${spaceGrotesk.variable} antialiased overflow-x-hidden`}
      >
        {/* <TallyModalRoot /> */}

        {children}
      </body>
    </html>
  );
}
