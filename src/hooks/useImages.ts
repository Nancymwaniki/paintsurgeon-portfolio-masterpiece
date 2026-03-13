import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { imagesApi } from '@/lib/api/images';
import { UploadImageDto, UpdateImageDto } from '@/types/image';

/**
 * Hook for fetching images with optional filters
 */
export const useImages = (params?: {
  categoryId?: string;
  featured?: boolean;
  artistPortrait?: boolean;
  published?: boolean;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['images', params],
    queryFn: () => imagesApi.listImages(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook for fetching a single image
 */
export const useImage = (id: string) => {
  return useQuery({
    queryKey: ['images', id],
    queryFn: () => imagesApi.getImage(id),
    enabled: !!id,
  });
};

/**
 * Hook for uploading images
 */
export const useUploadImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, data }: { file: File; data: UploadImageDto }) =>
      imagesApi.uploadImage(file, data),
    onSuccess: () => {
      // Invalidate all image queries to refetch
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });
};

/**
 * Hook for updating image metadata
 */
export const useUpdateImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateImageDto }) =>
      imagesApi.updateImage(id, data),
    onSuccess: (updatedImage) => {
      // Invalidate all image queries
      queryClient.invalidateQueries({ queryKey: ['images'] });
      // Update the specific image in cache
      queryClient.setQueryData(['images', updatedImage.id], updatedImage);
    },
  });
};

/**
 * Hook for deleting images
 */
export const useDeleteImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => imagesApi.deleteImage(id),
    onSuccess: () => {
      // Invalidate all image queries to refetch
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });
};

/**
 * Hook for reordering images
 */
export const useReorderImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, order }: { id: string; order: number }) =>
      imagesApi.reorderImage(id, order),
    onSuccess: () => {
      // Invalidate all image queries to refetch with new order
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });
};
