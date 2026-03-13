import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useImages, useUploadImage, useUpdateImage, useDeleteImage } from './useImages';
import { imagesApi } from '@/lib/api/images';
import { ReactNode } from 'react';

// Mock the images API
vi.mock('@/lib/api/images', () => ({
  imagesApi: {
    listImages: vi.fn(),
    uploadImage: vi.fn(),
    updateImage: vi.fn(),
    deleteImage: vi.fn(),
    reorderImage: vi.fn(),
  },
}));

describe('useImages hooks', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  describe('useImages', () => {
    it('should fetch images successfully', async () => {
      const mockImages = [
        {
          id: '1',
          title: 'Test Image',
          description: 'Test description',
          filename: 'test.jpg',
          filepath: '/uploads/test.jpg',
          thumbnailPath: '/uploads/test_thumb.jpg',
          mimeType: 'image/jpeg',
          fileSize: 1024,
          width: 800,
          height: 600,
          categoryId: 'cat1',
          featured: false,
          order: 0,
          published: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ];

      vi.mocked(imagesApi.listImages).mockResolvedValue(mockImages);

      const { result } = renderHook(() => useImages(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockImages);
      expect(imagesApi.listImages).toHaveBeenCalledWith(undefined);
    });

    it('should fetch images with filters', async () => {
      const mockImages = [
        {
          id: '1',
          title: 'Test Image',
          description: 'Test description',
          filename: 'test.jpg',
          filepath: '/uploads/test.jpg',
          thumbnailPath: '/uploads/test_thumb.jpg',
          mimeType: 'image/jpeg',
          fileSize: 1024,
          width: 800,
          height: 600,
          categoryId: 'cat1',
          featured: true,
          order: 0,
          published: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
        },
      ];

      vi.mocked(imagesApi.listImages).mockResolvedValue(mockImages);

      const { result } = renderHook(
        () => useImages({ categoryId: 'cat1', featured: true }),
        { wrapper }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockImages);
      expect(imagesApi.listImages).toHaveBeenCalledWith({
        categoryId: 'cat1',
        featured: true,
      });
    });
  });

  describe('useUploadImage', () => {
    it('should upload image successfully', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const mockData = {
        categoryId: 'cat1',
        title: 'Test Image',
      };
      const mockResponse = {
        id: '1',
        title: 'Test Image',
        description: null,
        filename: 'test.jpg',
        filepath: '/uploads/test.jpg',
        thumbnailPath: '/uploads/test_thumb.jpg',
        mimeType: 'image/jpeg',
        fileSize: 1024,
        width: 800,
        height: 600,
        categoryId: 'cat1',
        featured: false,
        order: 0,
        published: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      vi.mocked(imagesApi.uploadImage).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useUploadImage(), { wrapper });

      result.current.mutate({ file: mockFile, data: mockData });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockResponse);
      expect(imagesApi.uploadImage).toHaveBeenCalledWith(mockFile, mockData);
    });
  });

  describe('useUpdateImage', () => {
    it('should update image successfully', async () => {
      const mockData = {
        title: 'Updated Title',
        featured: true,
      };
      const mockResponse = {
        id: '1',
        title: 'Updated Title',
        description: null,
        filename: 'test.jpg',
        filepath: '/uploads/test.jpg',
        thumbnailPath: '/uploads/test_thumb.jpg',
        mimeType: 'image/jpeg',
        fileSize: 1024,
        width: 800,
        height: 600,
        categoryId: 'cat1',
        featured: true,
        order: 0,
        published: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };

      vi.mocked(imagesApi.updateImage).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useUpdateImage(), { wrapper });

      result.current.mutate({ id: '1', data: mockData });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockResponse);
      expect(imagesApi.updateImage).toHaveBeenCalledWith('1', mockData);
    });
  });

  describe('useDeleteImage', () => {
    it('should delete image successfully', async () => {
      vi.mocked(imagesApi.deleteImage).mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteImage(), { wrapper });

      result.current.mutate('1');

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(imagesApi.deleteImage).toHaveBeenCalledWith('1');
    });
  });
});
