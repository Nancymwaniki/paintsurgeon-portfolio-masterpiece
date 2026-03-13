import { useState } from 'react';
import { ActivityLogDto } from '@/types/activity';
import { ActivityItem } from './ActivityItem';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Activity as ActivityIcon,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

interface ActivityLogProps {
  activities: ActivityLogDto[];
  isRefetching?: boolean;
  onRefresh?: () => void;
}

const ITEMS_PER_PAGE = 20;

export const ActivityLog = ({ activities, isRefetching, onRefresh }: ActivityLogProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate pagination
  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentActivities = activities.slice(startIndex, endIndex);
  
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ActivityIcon className="h-5 w-5" />
              Activity Log
            </CardTitle>
            <CardDescription className="mt-1">
              Recent administrative actions and changes
            </CardDescription>
          </div>
          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isRefetching}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <ActivityIcon className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No activity yet</p>
            <p className="text-sm mt-1">Administrative actions will appear here</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {currentActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(endIndex, activities.length)} of {activities.length} activities
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
