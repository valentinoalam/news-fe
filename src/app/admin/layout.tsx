"use client"
import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  Image,
  MessageSquare,
  PlusCircle,
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarNav } from '@/components/sidebar-nav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '#' },
    { icon: FileText, label: 'Posts', href: '#' },
    { icon: Image, label: 'Media', href: '#' },
    { icon: MessageSquare, label: 'Comments', href: '#' },
    { icon: Users, label: 'Users', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ];
  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-4 fixed w-full z-50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl">Admin Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-white h-[calc(100vh-4rem)] fixed border-r transition-all duration-300 z-50",
            collapsed ? "w-16" : "w-64"
          )}
        >
          <div className="p-4 flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
          <SidebarNav menuItems={menuItems} collapsed={collapsed} />
        </aside>

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 p-6 transition-all duration-300",
            collapsed ? "ml-16" : "ml-64"
          )}
        >
        {children}
        </main>
      </div>
    </div>
    
  );
}