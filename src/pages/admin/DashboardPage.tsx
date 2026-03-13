import { useAuth } from '@/contexts/AuthContext';
import { useAnalytics } from '@/hooks/useAnalytics';
import { StatsCard } from '@/components/admin/StatsCard';
import { RecentActivity } from '@/components/admin/RecentActivity';
import { 
  Image as ImageIcon, 
  Mail, 
  Tag, 
  TrendingUp,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { data: stats, isLoading, isError, error, refetch } = useAnalytics();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back, {user?.name || user?.email}
          </p>
        </div>

        {/* Error State */}
        {isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading dashboard data</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>{error?.message || 'Failed to load analytics'}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => refetch()}
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading dashboard...</span>
          </div>
        )}

        {/* Stats Cards */}
        {!isLoading && stats && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <StatsCard
                title="Total Images"
                value={stats.totalImages}
                icon={ImageIcon}
                description="Across all categories"
              />
              
              <StatsCard
                title="Unread Submissions"
                value={stats.unreadSubmissions}
                icon={Mail}
                description={`${stats.totalSubmissions} total submissions`}
              />
              
              <StatsCard
                title="Categories"
                value={stats.imagesByCategory.length}
                icon={Tag}
                description="Active categories"
              />
              
              <StatsCard
                title="Recent Activity"
                value={stats.recentActivities.length}
                icon={TrendingUp}
                description="Last 10 actions"
              />
            </div>

            {/* Images by Category */}
            {stats.imagesByCategory.length > 0 && (
              <div className="mb-8">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Images by Category
                    </h2>
                    <Link 
                      to="/admin/categories" 
                      className="text-sm text-primary hover:underline"
                    >
                      Manage categories
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stats.imagesByCategory.map((category) => (
                      <div 
                        key={category.categoryName}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded">
                            <Tag className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium text-gray-900">
                            {category.categoryName}
                          </span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">
                          {category.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mb-8">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link to="/portfolio">
                    <Button variant="outline" className="w-full justify-start">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Manage Images
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      View Submissions
                    </Button>
                  </Link>
                  <Link to="/admin/activity">
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Activity Log
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <RecentActivity activities={stats.recentActivities} limit={10} />
          </>
        )}
      </div>
    </div>
  );
};
