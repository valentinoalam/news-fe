"use client";

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import PlateEditor from "@/components/plateEditor";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoryAdmin from "./category/page";
interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  isHeadline: boolean;
  author: string;
  publishedAt: string;
}

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateArticle = () => {
    const newArticle: Article = {
      id: uuidv4(),
      title: "",
      excerpt: "",
      content: "",
      image: "",
      isHeadline: false,
      author: "",
      publishedAt: new Date().toISOString(),
    };
    setSelectedArticle(newArticle);
    setIsEditing(true);
  };

  const handleSaveArticle = () => {
    // async function savePlateContent(content: object) {
    //   // Assuming images are stored separately and image URLs are embedded in `content`
    //   try {
    //     const response = await axios.post('/api/content', { content });
    //     console.log('Content saved successfully:', response.data);
    //   } catch (error) {
    //     console.error('Error saving content:', error);
    //   }
    // }
    
    // Function to handle image upload and return the URL
    // async function uploadImage(file: string | Blob) {
    //   const formData = new FormData();
    //   formData.append('file', file);
    
    //   try {
    //     const response = await axios.post('/api/content/upload-image', formData, {
    //       headers: { 'Content-Type': 'multipart/form-data' },
    //     });
    //     return response.data.imageUrl; // URL to be embedded in Plate.js content
    //   } catch (error) {
    //     console.error('Error uploading image:', error);
    //     return null;
    //   }
    // }
    // async function handleImageBase64(file: Blob) {
    //   return new Promise((resolve) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => resolve(reader.result);
    //     reader.readAsDataURL(file); // Base64-encoded image
    //   });
    // }
    
    // Example function to add Base64 image to Plate.js content
    // async function addImageToContent(file: Blob, content: { images: { src: unknown; }[]; }) {
    //   const base64Image = await handleImageBase64(file);
    //   content.images.push({ src: base64Image }); // Modify according to Plate.js format
    //   savePlateContent(content);
    // }

    if (selectedArticle) {
      const articleIndex = articles.findIndex((a) => a.id === selectedArticle.id);
      if (articleIndex === -1) {
        setArticles([...articles, selectedArticle]);
      } else {
        const updatedArticles = [...articles];
        updatedArticles[articleIndex] = selectedArticle;
        setArticles(updatedArticles);
      }
      setIsEditing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {/* <Button onClick={handleCreateArticle}>Create New Article</Button> */}
      </div>

      <Tabs defaultValue="articles">
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="headlines">Headlines</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Articles</h2>
              <Button onClick={handleCreateArticle}>Create New Article</Button>
            </div>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                {/* <CardTitle>Articles</CardTitle> */}
                <CardDescription>Manage your articles</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className="p-4 border-b cursor-pointer hover:bg-accent"
                      onClick={() => {
                        setSelectedArticle(article);
                        setIsEditing(true);
                      }}
                    >
                      <h3 className="font-semibold">{article.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{isEditing ? "Edit Article" : "Article Details"}</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedArticle && isEditing ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={selectedArticle.title}
                        onChange={(e) =>
                          setSelectedArticle({ ...selectedArticle, title: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Input
                        id="excerpt"
                        value={selectedArticle.excerpt}
                        onChange={(e) =>
                          setSelectedArticle({ ...selectedArticle, excerpt: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={selectedArticle.image}
                        onChange={(e) =>
                          setSelectedArticle({ ...selectedArticle, image: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <PlateEditor
                        initialValue={selectedArticle.content}
                        onChange={(value: string) =>
                          setSelectedArticle({ ...selectedArticle, content: value })
                        }
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={selectedArticle.isHeadline}
                        onCheckedChange={(checked) =>
                          setSelectedArticle({ ...selectedArticle, isHeadline: checked })
                        }
                      />
                      <Label>Set as Headline</Label>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveArticle}>Save Article</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    Select an article to edit or create a new one
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="headlines">
          <Card>
            <CardHeader>
              <CardTitle>Headline Management</CardTitle>
              <CardDescription>Manage your headline articles</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {articles
                  .filter((article) => article.isHeadline)
                  .map((article) => (
                    <div
                      key={article.id}
                      className="flex items-center justify-between p-4 border-b"
                    >
                      <div>
                        <h3 className="font-semibold">{article.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Switch
                        checked={article.isHeadline}
                        onCheckedChange={(checked) => {
                          const updatedArticle = { ...article, isHeadline: checked };
                          const updatedArticles = articles.map((a) =>
                            a.id === article.id ? updatedArticle : a
                          );
                          setArticles(updatedArticles);
                        }}
                      />
                    </div>
                  ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories">
          <CategoryAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
}