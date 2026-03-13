import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesApi } from '@/lib/api/categories';
import { CreateCategoryDto, UpdateCategoryDto } from '@/types/image';
import { toast } from '@/hooks/use-toast';

/**
 * Hook for fetching all categories
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.listCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes - categories don't change often
  });
};

/**
 * Hook for fetching a single category
 */
export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => categoriesApi.getCategory(id),
    enabled: !!id,
  });
};

/**
 * Hook for creating a new category
 */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryDto) => categoriesApi.createCategory(data),
    onSuccess: () => {
      // Invalidate categories cache to refetch the list
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Success',
        description: 'Category created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create category',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook for updating a category
 */
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryDto }) =>
      categoriesApi.updateCategory(id, data),
    onSuccess: (_, variables) => {
      // Invalidate both the list and the specific category
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['categories', variables.id] });
      toast({
        title: 'Success',
        description: 'Category updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to update category',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook for deleting a category
 */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoriesApi.deleteCategory(id),
    onSuccess: () => {
      // Invalidate categories cache to refetch the list
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Success',
        description: 'Category deleted successfully',
      });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || error.response?.data?.error || 'Failed to delete category';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    },
  });
};
