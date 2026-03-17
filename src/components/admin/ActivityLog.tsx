import { useState } from 'react';
import { ActivityLogDto } from '@/types/activity';
import { ActivityItem } from './ActivityItem';
import { Button } from '@/components/ui/button';
import { Activity as ActivityIcon, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

interface ActivityLogProps {
  activities: ActivityLogDto[];
  isRefetching?: boolean;
  onRefresh?: () => void;
}

const ITEMS_PER_PAGE = 20;

export const ActivityLog = ({ activities, isRefetching, onRefresh }: ActivityLogProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentActivities = activities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-xl uppercase text-foreground flex items-center gap-2">
            <ActivityIcon className="h-5 w-5 text-primary" />
            Activity Log
          </h2>
          <p className="text-xs text-muted-foreground font-body mt-1">Recent administrative actions and changes</p>
        </div>
        {onRefresh && (
          <Button variant="outline" size="sm" onClick={onRefresh} disabled={isRefetching} className="font-ui">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        )}
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <ActivityIcon className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <p className="font-display text-xl uppercase">No activity yet</p>
          <p className="text-sm font-body mt-2">Administrative actions will appear here</p>
        </div>
      ) : (
        <>
          <div className="divide-y divide-border">
            {currentActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground font-body">
                {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, activities.length)} of {activities.length}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="font-ui">
                  <ChevronLeft className="h-4 w-4 mr-1" />Previous
                </Button>
                <span className="text-xs text-muted-foreground font-body px-2">{currentPage} / {totalPages}</span>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="font-ui">
                  Next<ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
