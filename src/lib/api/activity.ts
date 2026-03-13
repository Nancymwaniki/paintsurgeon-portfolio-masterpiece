import { apiClient } from './client';
import { ActivityLogDto } from '@/types/activity';

export const activityApi = {
  /**
   * List recent activities (admin only)
   */
  listActivities: async (limit?: number): Promise<ActivityLogDto[]> => {
    const response = await apiClient.get<ActivityLogDto[]>('/activity', {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Get a single activity by ID (admin only)
   */
  getActivity: async (id: string): Promise<ActivityLogDto> => {
    const response = await apiClient.get<ActivityLogDto>(`/activity/${id}`);
    return response.data;
  },
};
