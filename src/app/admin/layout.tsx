import { Metadata } from "next";
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: "Admin Dashboard - NYT Clone",
  description: "Admin dashboard for managing articles and headlines",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </ThemeProvider>
  );
}