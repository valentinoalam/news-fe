import "./globals.css";
import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
// If you want to use local fonts later, uncomment the following
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
// ${geistSans.variable} ${geistMono.variable}
export const metadata: Metadata = {
  title: 'The New York Times Clone - Breaking News, World News & Multimedia',
  description: 'Live news, investigations, opinion, photos and video by the journalists of The New York Times Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` ${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
