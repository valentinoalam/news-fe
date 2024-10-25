"use client";

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChevronRight, ChevronDown, FolderOpen, Folder, Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
//   Form,
  FormControl,
//   FormField,
  FormItem,
  FormLabel,
//   FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const initialCategories = [
  {
    id: 1,
    name: 'Technology',
    slug: 'technology',
    count: 15,
    children: [
      {
        id: 2,
        name: 'Programming',
        slug: 'programming',
        count: 8,
        children: [
          { id: 3, name: 'JavaScript', slug: 'javascript', count: 4 },
          { id: 4, name: 'Python', slug: 'python', count: 3 },
        ],
      },
      { id: 5, name: 'Hardware', slug: 'hardware', count: 7 },
    ],
  },
  {
    id: 6,
    name: 'Design',
    slug: 'design',
    count: 10,
    children: [
      { id: 7, name: 'UI/UX', slug: 'ui-ux', count: 5 },
      { id: 8, name: 'Graphic Design', slug: 'graphic-design', count: 5 },
    ],
  },
];

const CategoryForm = ({ category, onSubmit, parentOptions }) => {
  const [name, setName] = useState(category?.name || '');
  const [parentId, setParentId] = useState(category?.parentId || '');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    onSubmit({ name, slug, parentId: parentId || null });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormItem>
        <FormLabel>Category Name</FormLabel>
        <FormControl>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            required
          />
        </FormControl>
      </FormItem>

      <FormItem>
        <FormLabel>Parent Category</FormLabel>
        <Select value={parentId} onValueChange={setParentId}>
          <SelectTrigger>
            <SelectValue placeholder="Select parent category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">None</SelectItem>
            {parentOptions.map((option: { id: string; name: string; }) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItem>

      <Button type="submit">
        {category ? 'Update Category' : 'Create Category'}
      </Button>
    </form>
  );
};

const CategoryItem = ({ category, level = 0, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div className="w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div
          className={cn(
            "flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md group",
            level > 0 && "ml-6"
          )}
        >
          <GripVertical className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 cursor-move" />
          
          <CollapsibleTrigger className="flex items-center gap-2">
            {hasChildren ? (
              isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            ) : (
              <span className="w-4" />
            )}
            {isOpen ? (
              <FolderOpen className="h-4 w-4 text-blue-500" />
            ) : (
              <Folder className="h-4 w-4 text-blue-500" />
            )}
            <span className="text-sm font-medium">{category.name}</span>
          </CollapsibleTrigger>

          <Badge variant="secondary" className="ml-auto text-xs">
            {category.count}
          </Badge>

          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(category)}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(category.id)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {hasChildren && (
          <CollapsibleContent>
            <div className="border-l-2 border-slate-200 ml-4">
              {category.children.map((child: { id: React.Key | null | undefined; }) => (
                <CategoryItem
                  key={child.id}
                  category={child}
                  level={level + 1}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  );
};

const CategoryAdmin = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const flattenCategories = (cats: [], result = []) => {
    cats.forEach((cat: { id: string; name: string; children: string | string[]; }) => {
      result.push({ id: cat.id, name: cat.name });
      if (cat.children?.length) {
        flattenCategories(cat.children, result);
      }
    });
    return result;
  };

  const handleCreateCategory = (data: object) => {
    const newCategory = {
      id: uuidv4(),
      ...data,
      count: 0,
      children: [],
    };
    setCategories(prev => [...prev, newCategory]);
    setIsDialogOpen(false);
  };

  const handleEditCategory = (category: React.SetStateAction<null>) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleUpdateCategory = (data: object) => {
    // Update category logic here
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId: object) => {
    // Delete category logic here
    // You should probably show a confirmation dialog first
  };

  const parentOptions = flattenCategories(categories);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </DialogTitle>
            </DialogHeader>
            <CategoryForm
              category={editingCategory}
              onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}
              parentOptions={parentOptions}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryAdmin;