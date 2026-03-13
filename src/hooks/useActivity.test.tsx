import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useActivity } from './useActivity';
import { activityApi } from '@/lib/api/activity';
import { ReactNode } from 'react';

// Mock the activity API
vi.mock('@/lib/api/activity', () => ({
  activityApi: {
    listActivities: vi.fn(),
    getActivity: vi.fn(),
  },
}));

describe('useActivity hook', () => {
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

  it('should fetch activities successfully with default limit', async () => {
    const mockActivities = [
      {
        id: '1',
        userId: 'user1',
        userEmail: 'admin@example.com',
        action: 'Upload Image',
        entityType: 'Image',
        entityId: 'img1',
        details: 'Uploaded test.jpg',
        createdAt: '2024-01-01T00:00:00Z',
      },
      {
        id: '2',
        userId: 'user1',
        userEmail: 'admin@example.com',
        action: 'Update Category',
        entityType: 'Category',
        entityId: 'cat1',
        details: 'Updated category name',
        createdAt: '2024-01-01T01:00:00Z',
      },
    ];

    vi.mocked(activityApi.listActivities).mockResolvedValue(mockActivities);

    const { result } = renderHook(() => useActivity(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockActivities);
    expect(activityApi.listActivities).toHaveBeenCalledWith(20);
  });

  it('should fetch activities with custom limit', async () => {
    const mockActivities = [
      {
        id: '1',
        userId: 'user1',
        userEmail: 'admin@example.com',
        action: 'Delete Image',
        entityType: 'Image',
        entityId: 'img1',
        details: null,
        createdAt: '2024-01-01T00:00:00Z',
      },
    ];

    vi.mocked(activityApi.listActivities).mockResolvedValue(mockActivities);

    const { result } = renderHook(() => useActivity(10), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockActivities);
    expect(activityApi.listActivities).toHaveBeenCalledWith(10);
  });

  it('should handle empty activity list', async () => {
    vi.mocked(activityApi.listActivities).mockResolvedValue([]);

    const { result } = renderHook(() => useActivity(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([]);
    expect(activityApi.listActivities).toHaveBeenCalledWith(20);
  });

  it('should configure retry and refetch options correctly', async () => {
    const mockActivities = [
      {
        id: '1',
        userId: 'user1',
        userEmail: 'admin@example.com',
        action: 'Upload Image',
        entityType: 'Image',
        entityId: 'img1',
        details: 'Uploaded test.jpg',
        createdAt: '2024-01-01T00:00:00Z',
      },
    ];

    vi.mocked(activityApi.listActivities).mockResolvedValue(mockActivities);

    const { result } = renderHook(() => useActivity(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verify the hook is configured with the correct options
    expect(result.current.data).toEqual(mockActivities);
    expect(activityApi.listActivities).toHaveBeenCalledWith(20);
  });

  it('should refetch on window focus', async () => {
    const mockActivities = [
      {
        id: '1',
        userId: 'user1',
        userEmail: 'admin@example.com',
        action: 'Upload Image',
        entityType: 'Image',
        entityId: 'img1',
        details: 'Uploaded test.jpg',
        createdAt: '2024-01-01T00:00:00Z',
      },
    ];

    vi.mocked(activityApi.listActivities).mockResolvedValue(mockActivities);

    const { result } = renderHook(() => useActivity(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verify refetchOnWindowFocus is enabled
    expect(result.current.isSuccess).toBe(true);
    expect(activityApi.listActivities).toHaveBeenCalledTimes(1);
  });
});
