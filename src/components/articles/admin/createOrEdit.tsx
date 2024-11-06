'use client'
import { useEffect } from 'react';
import React from 'react';
import { useRouter } from "next/navigation";
import { Article } from '@/types/article';
import { Category } from '@/types/category';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import ContentEditor from '@/components/plate-ui/plateEditor';
import ImageUploader from '@/components/articles/admin/imageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Tags from './tags';
import { Textarea } from '../../ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { countWords } from '@/utils/metadata.util';

const formSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(75, { message: "Title cannot exceed 100 characters" }),
    description: z
        .string()
        .max(165, { message: "Excerpt cannot exceed 150 characters" })
        .optional(),
    excerpt: z
        .string()
        .min(10, { message: "Excerpt must be at least 10 characters."})
        .max(650, { message: "Excerpt cannot exceed 150 characters" }),
    content: z
        .array(z.any()).min(1, {message: "Content cannot be empty." }),
    status: z.string(),
    categoryId: z
        .string()
        .min(1,{ message: "Category is required" }),
    tags: z.array(z.string()).optional(), // Optional tags field as an array of strings
    isFeatured: z
        .boolean().default(false).optional(),
});

export default function CreateorEditArticles({ articleData }: { articleData?: Article | null }) {
  const router = useRouter();
  const { categories } = useSelector((state: RootState) => state.category);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: articleData?.title || "",
      description: articleData?.description || "",
      excerpt: articleData?.excerpt || "",
      content: articleData?.content,
      status: articleData?.status || 'draft',
      categoryId: articleData?.categoryId || '',
      tags: articleData?.tags || [],
      isFeatured: articleData?.isFeatured || false,
    },
  });

  useEffect(() => {
    if (articleData) {
      form.reset({
        title: articleData.title,
        description: articleData?.description,
        excerpt: articleData.excerpt,
        content: articleData.content,
        status: articleData.status,
        categoryId: articleData.categoryId || '',
        tags: articleData?.tags || [],
        isFeatured: articleData?.isFeatured,
      });
    }
  }, [form, articleData]);

  // Recursive function to render categories and subcategories
  const renderCategoryOptions = (categories: Category[], level = 0) => {
    return categories.map((category) => (
      <React.Fragment key={category.id || category.name}>
        {/* Option for current category with indentation based on level */}
        <SelectItem value={category.id} className="pl-4" style={{ paddingLeft: `${level * 1.5}rem` }}>
          {category.name}
        </SelectItem>
        {/* Recursively render subcategories if they exist */}
        {category.children && renderCategoryOptions(category.children, level + 1)}
      </React.Fragment>
    ));
  };
  
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form data submitted:", data);
    const wordCount = countWords();
    const readingTime = wordCount / 200;
    console.log("Read Time:", readingTime)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-1 w-[340px] rounded-md bg-slate-950 p-1">
          <code className="text-white text-xs leading-none overflow-y-auto whitespace-normal">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return (
    <div className="container mx-auto max-w-4xl py-3">
      { articleData && <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push("/articles")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Articles
      </Button> }

      <Card className="bg-white border border-gray-200 rounded-lg min-h-96 shadow-lg p-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 z-50">
              <CardHeader className='justify-between'>
                <CardTitle className="text-2xl w-max font-semibold text-gray-800">
                  {articleData ? 'Edit Article' : 'Create New Article'}
                </CardTitle>
                {/* Headline Toggle */}
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex shrink items-center space-x-3">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Set as Headline</FormLabel>
                    </FormItem>
                  )}
                />
              </CardHeader>
              <CardContent className='space-y-3'>
              <Tabs defaultValue="editor">
                <TabsList>
                  <TabsTrigger value="editor">Content Form</TabsTrigger>
                  <TabsTrigger value="uploader">Upload Images</TabsTrigger>
                </TabsList>
                <TabsContent value="editor">
                {/* Title Field */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Article Title"
                        />
                      </FormControl>
                      <FormDescription>
                        This will be the main title of your article.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category Field */}
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select {...field} value={field.value} onValueChange={(value: string) => field.onChange(value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>{renderCategoryOptions(categories)}</SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Tags Input Field */}
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Tags tagsData={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Excerpt Field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Brief description"
                        />
                      </FormControl>
                      <FormDescription>
                        A sub title that explain more about the title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a brief summary"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A short summary that appears in article previews.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <ContentEditor
                          initialValue={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select article status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Set the current status of your article.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("admin/articles")}
                  >
                    Cancel
                  </Button>
                  <Button type='submit'>
                    {articleData ? 'Save Article' : 'Create Article'}
                  </Button>
                </div>
                </TabsContent>
                <TabsContent value="uploader">
                  <ImageUploader/>
                </TabsContent>
              </Tabs>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
