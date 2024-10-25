"use client";

import React from 'react';
import { ChevronRight, ChevronDown, FolderOpen, Folder } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Sample category data structure
const sampleCategories = [
  {
    id: 1,
    name: 'Technology',
    count: 15,
    children: [
      {
        id: 2,
        name: 'Programming',
        count: 8,
        children: [
          { id: 3, name: 'JavaScript', count: 4 },
          { id: 4, name: 'Python', count: 3 },
        ],
      },
      { id: 5, name: 'Hardware', count: 7 },
    ],
  },
  {
    id: 6,
    name: 'Design',
    count: 10,
    children: [
      { id: 7, name: 'UI/UX', count: 5 },
      { id: 8, name: 'Graphic Design', count: 5 },
    ],
  },
];

const CategoryItem = ({ category, level = 0 }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div className="w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div
          className={cn(
            "flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md cursor-pointer",
            level > 0 && "ml-6"
          )}
        >
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
        </div>

        {hasChildren && (
          <CollapsibleContent>
            <div className="border-l-2 border-slate-200 ml-4">
              {category.children.map((child: { id: React.Key | null | undefined; }) => (
                <CategoryItem
                  key={child.id}
                  category={child}
                  level={level + 1}
                />
              ))}
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  );
};

const NestedCategories = ({ categories = sampleCategories }) => {
  return (
    <div className="w-full max-w-md border rounded-lg p-4 space-y-2">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default NestedCategories;