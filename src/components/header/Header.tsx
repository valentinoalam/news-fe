"use client";

import { useState } from "react";

import { Menu, Search  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import NavBar from "./topNavbar";
import { User as UserType } from "@/types/user";
import UserDropdownMenu from "./userMenu";


export default function Header({ user }: { user: UserType }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const appName = process.env.NEXT_PUBLIC_APP_NAME;
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 border-b">
          <Button className="flex lg:hidden" variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          <Button className="hidden lg:flex" variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <h1>Welcome, {user ? user.name : "Guest"}!</h1>
          <div className="flex items-center space-x-4">
            <UserDropdownMenu user={user} />
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