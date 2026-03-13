import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { activityApi } from '@/lib/api/activity';
import { ActivityLogDto } from '@/types/activity';

/**
 * Hook for fetching activity logs with pagination and automatic refresh
 * Implements data caching with TanStack Query
 * Automatically refreshes every 30 seconds
 * 
 * @param limit - Number of activities to fetch (default: 20)
 */
export const useActivity = (limit: number = 20): UseQueryResult<ActivityLogDto[], Error> => {
  return useQuery({
    queryKey: ['activity', limit],
    queryFn: () => activityApi.listActivities(limit),
    staleTime: 30000, // Consider data fresh for 30 seconds
    refetchInterval: 30000, // Auto-refresh every 30 seconds
    refetchOnWindowFocus: true, // Refresh when window regains focus
    retry: 2, // Retry failed requests twice
  });
};
