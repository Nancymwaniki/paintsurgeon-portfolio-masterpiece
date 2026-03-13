import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { analyticsApi } from '@/lib/api/analytics';
import { DashboardStats } from '@/types/analytics';

/**
 * Hook for fetching dashboard analytics
 * Implements data caching with TanStack Query
 * Automatically refreshes on data changes
 */
export const useAnalytics = (): UseQueryResult<DashboardStats, Error> => {
  return useQuery({
    queryKey: ['analytics', 'dashboard'],
    queryFn: analyticsApi.getDashboardStats,
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchInterval: 60000, // Auto-refresh every 60 seconds
    refetchOnWindowFocus: true, // Refresh when window regains focus
    retry: 2, // Retry failed requests twice
  });
};
