import { ActivityLogDto } from '@/types/activity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { 
  FileEdit, 
  Image as ImageIcon, 
  Trash2, 
  Upload, 
  Tag,
  Activity as ActivityIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecentActivityProps {
  activities: ActivityLogDto[];
  limit?: number;
}

const getActionIcon = (action: string) => {
  const actionLower = action.toLowerCase();
  
  if (actionLower.includes('upload')) return Upload;
  if (actionLower.includes('delete')) return Trash2;
  if (actionLower.includes('edit') || actionLower.includes('update')) return FileEdit;
  if (actionLower.includes('image')) return ImageIcon;
  if (actionLower.includes('category')) return Tag;
  
  return ActivityIcon;
};

const getActionColor = (action: string) => {
  const actionLower = action.toLowerCase();
  
  if (actionLower.includes('delete')) return 'text-red-600 bg-red-50';
  if (actionLower.includes('upload') || actionLower.includes('create')) return 'text-green-600 bg-green-50';
  if (actionLower.includes('edit') || actionLower.includes('update')) return 'text-blue-600 bg-blue-50';
  
  return 'text-gray-600 bg-gray-50';
};

export const RecentActivity = ({ activities, limit = 10 }: RecentActivityProps) => {
  const displayActivities = activities.slice(0, limit);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Link 
          to="/admin/activity" 
          className="text-sm text-primary hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        {displayActivities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <ActivityIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayActivities.map((activity) => {
              const Icon = getActionIcon(activity.action);
              const colorClass = getActionColor(activity.action);
              
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">
                        {activity.userEmail}
                      </p>
                      <span className="text-xs text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">
                        {activity.entityType}
                      </p>
                    </div>
                    {activity.details && (
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {activity.details}
                      </p>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
