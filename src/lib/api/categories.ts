import { apiClient } from './client';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '@/types/image';

export const categoriesApi = {
  /**
   * Create a new category (admin only)
   */
  createCategory: async (data: CreateCategoryDto): Promise<Category> => {
    const response = await apiClient.post<Category>('/categories', data);
    return response.data;
  },

  /**
   * List all categories (public)
   */
  listCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/categories');
    return response.data;
  },

  /**
   * Get a single category by ID (public)
   */
  getCategory: async (id: string): Promise<Category> => {
    const response = await apiClient.get<Category>(`/categories/${id}`);
    return response.data;
  },

  /**
   * Update a category (admin only)
   */
  updateCategory: async (id: string, data: UpdateCategoryDto): Promise<Category> => {
    const response = await apiClient.put<Category>(`/categories/${id}`, data);
    return response.data;
  },

  /**
   * Delete a category (admin only)
   */
  deleteCategory: async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`);
  },
};
