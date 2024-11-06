"use client";

import { Row } from "@tanstack/react-table";
import { Eye, Edit2, Trash2, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/plate-ui/dropdown-menu";
import { Article } from "@/types/article";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const article = row.original as Article;

  return (
    <>
        <div className="hidden lg:flex text-right">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(`/articles/${article.id}`)}
            >
                <Eye className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(`/articles/edit/${article.id}`)}
            >
                <Edit2 className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive/90"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
        <div className="flex lg:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem onClick={() => router.push(`/articles/${article.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.push(`/articles/edit/${article.id}`)}
                    >
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    </>
  );
}