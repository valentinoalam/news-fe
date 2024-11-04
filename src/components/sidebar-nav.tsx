"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "./ui/button"
import React from "react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  collapsed: boolean
  menuItems: {
    href: string
    label: string
    icon: React.ElementType
  }[]
}

export function SidebarNav({ className, menuItems, collapsed, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 px-2 flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      <TooltipProvider>
        {menuItems.map((item) => (
          <Tooltip key={item.label} delayDuration={0}>

            <TooltipTrigger asChild>
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors", // Static classes
                  pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
                  "hover:bg-gray-100", // Hover style
                  collapsed ? "justify-center" : "justify-start" // Conditional alignment based on `collapsed`
                )}
                
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
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
  )
}