import type { Metadata } from "next";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/theme-provider';

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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
  );
}
