"use client";

import { useState } from "react";
import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import Link from "next/link";
import NavBar from "./topNavbar";
import { User as UserType } from "@/types/user";

export default function Header({ user }: { user: UserType }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const appName = process.env.NEXT_PUBLIC_APP_NAME;
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 border-b">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          <h1>Welcome, {user ? user.name : "Guest"}!</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href="/signup">
                  <DropdownMenuItem>Sign Up</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Create Account</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4 text-center">
          <div className="text-xs uppercase tracking-wider mb-2">
            {format(new Date(), "EEEE, MMMM d, yyyy")}
          </div>
          <h1 className="text-5xl font-serif mb-4">{ appName }</h1>
          <NavBar />
        </div>
      </div>
    </header>
  );
}