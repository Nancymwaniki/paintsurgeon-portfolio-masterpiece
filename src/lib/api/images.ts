import { apiClient } from './client';
import { Image, ImageResponseDto, UploadImageDto, UpdateImageDto } from '@/types/image';

export const imagesApi = {
  /**
   * Upload a new image (admin only)
   */
  uploadImage: async (file: File, data: UploadImageDto): Promise<ImageResponseDto> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('categoryId', data.categoryId);
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.featured !== undefined) formData.append('featured', String(data.featured));
    if (data.artistPortrait !== undefined) formData.append('artistPortrait', String(data.artistPortrait));

    const response = await apiClient.post<ImageResponseDto>('/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * List all images with optional filters (public)
   */
  listImages: async (params?: {
    categoryId?: string;
    featured?: boolean;
    artistPortrait?: boolean;
    published?: boolean;
    limit?: number;
  }): Promise<ImageResponseDto[]> => {
    const response = await apiClient.get<ImageResponseDto[]>('/images', { params });
    return response.data;
  },

  /**
   * Get a single image by ID (public)
   */
  getImage: async (id: string): Promise<ImageResponseDto> => {
    const response = await apiClient.get<ImageResponseDto>(`/images/${id}`);
    return response.data;
  },

  /**
   * Update image metadata (admin only)
   */
  updateImage: async (id: string, data: UpdateImageDto): Promise<ImageResponseDto> => {
    const response = await apiClient.put<ImageResponseDto>(`/images/${id}`, data);
    return response.data;
  },

  /**
   * Delete an image (admin only)
   */
  deleteImage: async (id: string): Promise<void> => {
    await apiClient.delete(`/images/${id}`);
  },

  /**
   * Update image order (admin only)
   */
  reorderImage: async (id: string, order: number): Promise<ImageResponseDto> => {
    const response = await apiClient.put<ImageResponseDto>(`/images/${id}/reorder`, { order });
    return response.data;
  },
};
