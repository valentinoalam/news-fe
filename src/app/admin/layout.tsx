import { Metadata } from "next";
import { ThemeProvider } from '@/components/theme-provider';
// import { SidebarNav } from "@/components/sidebar-nav";

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
        {/* <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <SidebarNav items={[{ href: 'string', title: 'string' },]} /> */}
        {children}
      </div>
    </ThemeProvider>
  );
}