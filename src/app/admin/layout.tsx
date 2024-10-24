import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - NYT Clone",
  description: "Admin dashboard for managing articles and headlines",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}