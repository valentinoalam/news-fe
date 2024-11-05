/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { PlusCircle, Edit2, Trash2, Eye, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data with categories
const MOCK_ARTICLES = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Article ${i + 1}`,
  excerpt: `This is the excerpt for article ${i + 1}`,
  status: i % 2 === 0 ? "Published" : "Draft",
  category: ["Technology", "Design", "Development", "Business"][i % 4],
  date: new Date(2024, 2, 20 - i).toISOString().split("T")[0],
}));

const ITEMS_PER_PAGE = 10;

export default function ArticlesPage() {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter articles based on status, category, and search query
  const filteredArticles = MOCK_ARTICLES.filter((article) => {
    const matchesStatus =
      statusFilter === "all" || article.status.toLowerCase() === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || article.category === categoryFilter;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleSelectAll = () => {
    if (selectedRows.length === paginatedArticles.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedArticles.map((article) => article.id));
    }
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <div>
            <CardTitle className="text-2xl font-bold">Articles</CardTitle>
            <CardDescription>
              Manage your articles and blog posts
            </CardDescription>
          </div>
          <Button
            onClick={() => router.push("/articles/create")}
            className="bg-primary hover:bg-primary/90"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Article
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center gap-4">
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={40}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30px]">
                      <Checkbox
                        checked={selectedRows.length === paginatedArticles.length}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedArticles.map((article) => (
                    <TableRow
                      key={article.id}
                      className={
                        selectedRows.includes(article.id)
                          ? "bg-muted/50"
                          : undefined
                      }
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.includes(article.id)}
                          onCheckedChange={() => toggleRowSelection(article.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {article.title}
                      </TableCell>
                      <TableCell>{article.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={60}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Excerpt</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedArticles.map((article) => (
                    <TableRow
                      key={article.id}
                      className={
                        selectedRows.includes(article.id)
                          ? "bg-muted/50"
                          : undefined
                      }
                    >
                      <TableCell>{article.excerpt}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            article.status === "Published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {article.status}
                        </span>
                      </TableCell>
                      <TableCell>{article.date}</TableCell>
                      <TableCell className="text-right">
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
                          onClick={() =>
                            router.push(`/articles/edit/${article.id}`)
                          }
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ResizablePanel>
          </ResizablePanelGroup>

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((p) => Math.max(1, p - 1))
                    }
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}