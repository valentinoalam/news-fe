"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Users, FileText, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const viewsData = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2024, i).toLocaleString('default', { month: 'short' }),
  views: Math.floor(Math.random() * 15000) + 5000,
}));

const categoryData = [
  { name: "Technology", value: 35 },
  { name: "Design", value: 25 },
  { name: "Development", value: 20 },
  { name: "Business", value: 20 },
];

const engagementData = Array.from({ length: 7 }, (_, i) => ({
  day: new Date(2024, 2, 14 + i).toLocaleString('default', { weekday: 'short' }),
  comments: Math.floor(Math.random() * 50) + 10,
  likes: Math.floor(Math.random() * 100) + 20,
}));

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128.4K</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              12% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,850</div>
            <div className="flex items-center text-sm text-red-500">
              <ArrowDownRight className="mr-1 h-4 w-4" />
              3% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">482</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              8% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-8 space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Views</CardTitle>
              <CardDescription>
                Article views over the past 12 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={viewsData}>
                    <defs>
                      <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="hsl(var(--chart-1))"
                      fillOpacity={1}
                      fill="url(#viewsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>
                  Articles by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {categoryData.map((category, index) => (
                    <div key={category.name} className="flex items-center">
                      <div
                        className="mr-2 h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{category.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Authors</CardTitle>
                <CardDescription>
                  Most active contributors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "John Doe", articles: 45 },
                        { name: "Jane Smith", articles: 38 },
                        { name: "Alex Johnson", articles: 32 },
                        { name: "Sarah Wilson", articles: 28 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="articles" fill="hsl(var(--chart-2))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Engagement</CardTitle>
              <CardDescription>
                Comments and likes over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="comments" fill="hsl(var(--chart-3))" />
                    <Bar dataKey="likes" fill="hsl(var(--chart-4))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
  
}
// import { useState } from "react";
// import { v4 as uuidv4 } from 'uuid';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
// import PlateEditor from "@/components/plate-ui/plateEditor";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import CategoryAdmin from "./category/page";
// import { Value } from "@udecode/plate-common";
// interface Article {
//   id: string;
//   title: string;
//   excerpt: string;
//   content: object[];
//   image: string;
//   isHeadline: boolean;
//   author: string;
//   publishedAt: string;
// }

// export default function AdminPage() {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
//   const [isEditing, setIsEditing] = useState(false);

//   const handleCreateArticle = () => {
//     const newArticle: Article = {
//       id: uuidv4(),
//       title: "",
//       excerpt: "",
//       content: [{ type: "p", children: [{ text: "" }] }],
//       image: "",
//       isHeadline: false,
//       author: "",
//       publishedAt: new Date().toISOString(),
//     };
//     setSelectedArticle(newArticle);
//     setIsEditing(true);
//   };

//   const handleSaveArticle = () => {
//     // async function savePlateContent(content: object) {
//     //   // Assuming images are stored separately and image URLs are embedded in `content`
//     //   try {
//     //     const response = await axios.post('/api/content', { content });
//     //     console.log('Content saved successfully:', response.data);
//     //   } catch (error) {
//     //     console.error('Error saving content:', error);
//     //   }
//     // }
    
//     // Function to handle image upload and return the URL
//     // async function uploadImage(file: string | Blob) {
//     //   const formData = new FormData();
//     //   formData.append('file', file);
    
//     //   try {
//     //     const response = await axios.post('/api/content/upload-image', formData, {
//     //       headers: { 'Content-Type': 'multipart/form-data' },
//     //     });
//     //     return response.data.imageUrl; // URL to be embedded in Plate.js content
//     //   } catch (error) {
//     //     console.error('Error uploading image:', error);
//     //     return null;
//     //   }
//     // }
//     // async function handleImageBase64(file: Blob) {
//     //   return new Promise((resolve) => {
//     //     const reader = new FileReader();
//     //     reader.onloadend = () => resolve(reader.result);
//     //     reader.readAsDataURL(file); // Base64-encoded image
//     //   });
//     // }
    
//     // Example function to add Base64 image to Plate.js content
//     // async function addImageToContent(file: Blob, content: { images: { src: unknown; }[]; }) {
//     //   const base64Image = await handleImageBase64(file);
//     //   content.images.push({ src: base64Image }); // Modify according to Plate.js format
//     //   savePlateContent(content);
//     // }

//     if (selectedArticle) {
//       const articleIndex = articles.findIndex((a) => a.id === selectedArticle.id);
//       if (articleIndex === -1) {
//         setArticles([...articles, selectedArticle]);
//       } else {
//         const updatedArticles = [...articles];
//         updatedArticles[articleIndex] = selectedArticle;
//         setArticles(updatedArticles);
//       }
//       setIsEditing(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//         {/* <Button onClick={handleCreateArticle}>Create New Article</Button> */}
//       </div>

//       <Tabs defaultValue="articles">
//         <TabsList>
//           <TabsTrigger value="articles">Articles</TabsTrigger>
//           <TabsTrigger value="headlines">Headlines</TabsTrigger>
//           <TabsTrigger value="categories">Categories</TabsTrigger>
//         </TabsList>

//         <TabsContent value="articles">
//           <div className="p-4 space-y-4">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-bold">Articles</h2>
//               <Button onClick={handleCreateArticle}>Create New Article</Button>
//             </div>
//             </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <Card className="md:col-span-1">
//               <CardHeader>
//                 {/* <CardTitle>Articles</CardTitle> */}
//                 <CardDescription>Manage your articles</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ScrollArea className="h-[600px]">
//                   {articles.map((article) => (
//                     <div
//                       key={article.id}
//                       className="p-4 border-b cursor-pointer hover:bg-accent"
//                       onClick={() => {
//                         setSelectedArticle(article);
//                         setIsEditing(true);
//                       }}
//                     >
//                       <h3 className="font-semibold">{article.title}</h3>
//                       <p className="text-sm text-muted-foreground">
//                         {new Date(article.publishedAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   ))}
//                 </ScrollArea>
//               </CardContent>
//             </Card>

//             <Card className="md:col-span-2">
//               <CardHeader>
//                 <CardTitle>{isEditing ? "Edit Article" : "Article Details"}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {selectedArticle && isEditing ? (
//                   <div className="space-y-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="title">Title</Label>
//                       <Input
//                         id="title"
//                         value={selectedArticle.title}
//                         onChange={(e) =>
//                           setSelectedArticle({ ...selectedArticle, title: e.target.value })
//                         }
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="excerpt">Excerpt</Label>
//                       <Input
//                         id="excerpt"
//                         value={selectedArticle.excerpt}
//                         onChange={(e) =>
//                           setSelectedArticle({ ...selectedArticle, excerpt: e.target.value })
//                         }
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="image">Image URL</Label>
//                       <Input
//                         id="image"
//                         value={selectedArticle.image}
//                         onChange={(e) =>
//                           setSelectedArticle({ ...selectedArticle, image: e.target.value })
//                         }
//                       />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="content">Content</Label>
//                       <PlateEditor
//                         initialValue={selectedArticle.content as Value}
//                         onChange={(value: Value) =>
//                           setSelectedArticle({ ...selectedArticle, content: value })
//                         }
//                       />
//                     </div>

//                     <div className="flex items-center space-x-2">
//                       <Switch
//                         checked={selectedArticle.isHeadline}
//                         onCheckedChange={(checked) =>
//                           setSelectedArticle({ ...selectedArticle, isHeadline: checked })
//                         }
//                       />
//                       <Label>Set as Headline</Label>
//                     </div>

//                     <div className="flex justify-end space-x-2">
//                       <Button variant="outline" onClick={() => setIsEditing(false)}>
//                         Cancel
//                       </Button>
//                       <Button onClick={handleSaveArticle}>Save Article</Button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center text-muted-foreground">
//                     Select an article to edit or create a new one
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="headlines">
//           <Card>
//             <CardHeader>
//               <CardTitle>Headline Management</CardTitle>
//               <CardDescription>Manage your headline articles</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ScrollArea className="h-[400px]">
//                 {articles
//                   .filter((article) => article.isHeadline)
//                   .map((article) => (
//                     <div
//                       key={article.id}
//                       className="flex items-center justify-between p-4 border-b"
//                     >
//                       <div>
//                         <h3 className="font-semibold">{article.title}</h3>
//                         <p className="text-sm text-muted-foreground">
//                           {new Date(article.publishedAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <Switch
//                         checked={article.isHeadline}
//                         onCheckedChange={(checked) => {
//                           const updatedArticle = { ...article, isHeadline: checked };
//                           const updatedArticles = articles.map((a) =>
//                             a.id === article.id ? updatedArticle : a
//                           );
//                           setArticles(updatedArticles);
//                         }}
//                       />
//                     </div>
//                   ))}
//               </ScrollArea>
//             </CardContent>
//           </Card>
//         </TabsContent>
//         <TabsContent value="categories">
//           <CategoryAdmin />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }