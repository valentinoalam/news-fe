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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 border-b">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          
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
                <DropdownMenuItem>Sign In</DropdownMenuItem>
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
          <h1 className="text-5xl font-serif mb-4">The New York Times</h1>
          <nav className="hidden md:block">
            <ul className="flex justify-center space-x-6 text-sm">
              <li><Button variant="link">World</Button></li>
              <li><Button variant="link">U.S.</Button></li>
              <li><Button variant="link">Politics</Button></li>
              <li><Button variant="link">N.Y.</Button></li>
              <li><Button variant="link">Business</Button></li>
              <li><Button variant="link">Opinion</Button></li>
              <li><Button variant="link">Science</Button></li>
              <li><Button variant="link">Arts</Button></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}