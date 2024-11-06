import type { Metadata } from "next";
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from "@/lib/session";
import { User } from "@/types/user";

export const metadata: Metadata = {
  title: 'The Muslim News - Good and Bad News for Dunya and Akhira',
  description: 'Live news, investigations, opinion, photos and video by the journalists of The New York Times Clone',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser()
  console.log(user)
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/")
  }
  return (
    <>
      <Header user={user as User} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
