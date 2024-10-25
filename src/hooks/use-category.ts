// hooks/useCategories.ts
import { useState, useEffect } from 'react';
import { Category, CreateCategoryDTO, UpdateCategoryDTO } from '@/types/category';
import { categoryService } from '@/services/categoryService';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch categories'));
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (data: CreateCategoryDTO) => {
    try {
      const newCategory = await categoryService.createCategory(data);
      await fetchCategories(); // Refresh the list
      return newCategory;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create category');
    }
  };

  const updateCategory = async (data: UpdateCategoryDTO) => {
    try {
      const updatedCategory = await categoryService.updateCategory(data);
      await fetchCategories(); // Refresh the list
      return updatedCategory;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update category');
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await categoryService.deleteCategory(id);
      await fetchCategories(); // Refresh the list
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete category');
    }
  };

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refreshCategories: fetchCategories,
  };
}