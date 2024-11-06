"use client"

import { Article } from "@/types/article"
import { formatDate } from "@/utils/dateFormat.util";
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Article>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => <span>{info.getValue() === "published" ? "✅" : "📝"}</span>,
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "viewCount",
      header: "Views",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: (info) => formatDate(new Date(info.getValue() as Date)),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: (info) => formatDate(new Date(info.getValue() as Date)),
    },
];