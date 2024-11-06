"use client";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { columns } from "@/components/articles/admin/columns";
import { DataTable } from "@/components/data-table/data-table";
import { Article } from "@/types/article";

// Mock data with categories
const MOCK_ARTICLES = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Article ${i + 1}`,
  description: `This is the detailed description for article ${i + 1}. It provides in-depth insights and information on the topic.`,
  status: i % 2 === 0 ? "Published" : "Draft",
  category: ["Technology", "Design", "Development", "Business"][i % 4],
  viewCount: Math.floor(Math.random() * 1000), // Random view count for each article
  createdAt: new Date(2024, 2, 20 - i).toISOString(),
  updatedAt: new Date(2024, 2, 21 - i).toISOString(),
  author: ["John Doe", "Jane Smith", "Alex Johnson", "Sarah Wilson"][i % 4],
}));


export default function ArticlesPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <div>
            <CardTitle className="text-2xl font-bold">Users Management</CardTitle>
            <CardDescription>
              See and Manage all your subscribers.
            </CardDescription>
          </div>
          <Button
            onClick={() => router.push("articles/create")}
            className="bg-primary hover:bg-primary/90"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Admin
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={MOCK_ARTICLES as unknown as Article[]} />
        </CardContent>
      </Card>
    </div>
  );
}