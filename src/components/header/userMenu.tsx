import React from 'react'
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/plate-ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { User, User2, LogOut  } from "lucide-react";
import { User as UserType } from "@/types/user";
import { usePathname  } from 'next/navigation';

export default function UserDropdownMenu({ user }: { user: UserType }) {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith('/admin');
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" size={user?'avatar':'icon'} className="rounded-full">
                { user ?
                <Avatar>
                    <AvatarImage src={user.image || ""} alt={user.name as string || ""} />
                    <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>: <User className="h-5 w-5" /> }
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56" forceMount>
            { user?
            <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name as string}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                    </p>
                </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                <Link href="/profile">
                    <User2 className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                {isAdminRoute ? (
                    <Link href="/">
                        <span>Home</span>
                    </Link> ) : (
                    <Link href="/admin">
                    <span>Dashboard</span>
                    </Link> )}
                </DropdownMenuItem>
            </DropdownMenuGroup> :
            <DropdownMenuGroup>
                <DropdownMenuItem>
                <Link href="/signin"><span>Sign In</span></Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link href="/signup"><span>Create Account</span></Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>  }
            
            <DropdownMenuSeparator />
            { user && 
            <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={() => signOut()}
            >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
            </DropdownMenuItem> }
            </DropdownMenuContent>
    </DropdownMenu>
    )
}
