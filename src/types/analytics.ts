import { ActivityLogDto } from './activity';

export interface DashboardStats {
  totalImages: number;
  imagesByCategory: CategoryStats[];
  totalSubmissions: number;
  unreadSubmissions: number;
  recentActivities: ActivityLogDto[];
}

export interface CategoryStats {
  categoryName: string;
  count: number;
}
