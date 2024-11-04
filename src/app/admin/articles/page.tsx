'use client'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from 'axios';
import { Article } from '@/types/article';

export default function ArticlePage( articleData: Article ) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Articles</CardTitle>
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
  );
}
