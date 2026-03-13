import { apiClient } from './client';
import { DashboardStats } from '@/types/analytics';

export const analyticsApi = {
  /**
   * Get dashboard statistics (admin only)
   */
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>('/analytics/dashboard');
    return response.data;
  },
};
