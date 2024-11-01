import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryParams, CreateCategoryDTO, UpdateCategoryDTO } from '@/types/category';
import { categoryService } from '@/services/categoryService';

export const QUERY_KEYS = {
  categories: 'categories',
};

export function useCategories(params?: CategoryParams) {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: [QUERY_KEYS.categories, params],
    queryFn: () => categoryService.getCategories(params),
  });

  const createMutation = useMutation({
    mutationFn: (newCategory: CreateCategoryDTO) => 
      categoryService.createCategory(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.categories] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedCategory: UpdateCategoryDTO) =>
      categoryService.updateCategory(updatedCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.categories] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => categoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.categories] });
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: (ids: number[]) => categoryService.bulkDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.categories] });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: (orderedIds: { id: number; position: number }[]) =>
      categoryService.reorderCategories(orderedIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.categories] });
    },
  });

  return {
    categories: data?.records ?? [],
    meta: data?.meta,
    isLoading,
    error,
    refetch,
    createCategory: createMutation.mutateAsync,
    updateCategory: updateMutation.mutateAsync,
    deleteCategory: deleteMutation.mutateAsync,
    bulkDeleteCategories: bulkDeleteMutation.mutateAsync,
    reorderCategories: reorderMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isBulkDeleting: bulkDeleteMutation.isPending,
    isReordering: reorderMutation.isPending,
  };
}