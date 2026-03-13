import { useActivity } from '@/hooks/useActivity';
import { ActivityLog } from '@/components/admin/ActivityLog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';

export const ActivityPage = () => {
  const { data: activities, isLoading, isError, error, refetch, isRefetching } = useActivity(20);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Activity Log</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track all administrative actions and changes
          </p>
        </div>

        {/* Error State */}
        {isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading activity log</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>{error?.message || 'Failed to load activities'}</span>
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
            <span className="ml-2 text-muted-foreground">Loading activity log...</span>
          </div>
        )}

        {/* Activity Log */}
        {!isLoading && activities && (
          <ActivityLog 
            activities={activities} 
            isRefetching={isRefetching}
            onRefresh={() => refetch()}
          />
        )}
      </div>
    </div>
  );
};
