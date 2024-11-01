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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { Metadata } from "next";
// import { SidebarNav } from "@/components/sidebar-nav";

// export const metadata: Metadata = {
//   title: "Admin Dashboard - NYT Clone",
//   description: "Admin dashboard for managing articles and headlines",
// };

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
          <span className="font-semibold text-xl">Admin Panel</span>
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
            "bg-white h-[calc(100vh-4rem)] fixed border-r transition-all duration-300",
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

          <nav className="space-y-2 px-2">
            <TooltipProvider>
              {menuItems.map((item) => (
                <Tooltip key={item.label} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <a
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors",
                        collapsed ? "justify-center" : ""
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.label}</span>}
                    </a>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </TooltipProvider>
          </nav>
        </aside>
        {/* <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <SidebarNav items={[{ href: 'string', title: 'string' },]} /> */}
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