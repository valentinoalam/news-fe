'use client'
import { useEffect } from 'react';
import React from 'react';
import { Article } from '@/types/article';
import { Category } from '@/types/category';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import { useRouter } from "next/navigation";
// import { ArrowLeft } from "lucide-react";
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import PlateEditor from '@/components/plateEditor';
import ImageUploader from '@/components/imageUploader';
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
// import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Tags from '../tags';

const formSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(100, { message: "Title cannot exceed 100 characters" }),
    excerpt: z
        .string()
        .max(150, { message: "Excerpt cannot exceed 150 characters" }),
    content: z
        .array(z.any()).min(1, {message: "Content cannot be empty." }),
    status: z.string(),
    categoryId: z
        .string()
        .min(1,{ message: "Category is required" }),
    tags: z.array(z.string()).optional(), // Optional tags field as an array of strings
    // isHeadline: z
    //     .boolean(),
});

export default function CreateorEditArticles({ articleData }: { articleData?: Article | null }) {
  const { categories } = useSelector((state: RootState) => state.category);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: articleData?.title || "",
      excerpt: articleData?.excerpt || "",
      content: articleData?.content,
      status: articleData?.status || 'draft',
      categoryId: articleData?.categoryId || '',
      tags: articleData?.tags || [],
    },
  });

  useEffect(() => {
    if (articleData) {
      form.reset({
        title: articleData.title,
        excerpt: articleData.excerpt,
        content: articleData.content,
        status: articleData.status,
        categoryId: articleData.categoryId || '',
        tags: articleData?.tags || [],
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
    <div className="container mx-auto max-w-4xl py-4">
      <Card className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 space-y-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            {articleData ? 'Edit Article' : 'Create New Article'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 z-50">
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
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Brief description"
                      />
                    </FormControl>
                    <FormDescription>
                      A short summary that appears in article previews.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ImageUploader/>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <PlateEditor
                        initialValue={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Headline Toggle */}
              {/* <FormField
                control={form.control}
                name="isHeadline"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <Switch {...field}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Set as Headline</FormLabel>
                  </FormItem>
                )}
              /> */}
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
              <Button type='submit'>
                {articleData ? 'Save Article' : 'Create Article'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
