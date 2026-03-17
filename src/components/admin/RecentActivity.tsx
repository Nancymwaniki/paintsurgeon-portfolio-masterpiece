import { ActivityLogDto } from '@/types/activity';
import { formatDistanceToNow } from 'date-fns';
import { FileEdit, Image as ImageIcon, Trash2, Upload, Tag, Activity as ActivityIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecentActivityProps {
  activities: ActivityLogDto[];
  limit?: number;
}

const getActionIcon = (action: string) => {
  const a = action.toLowerCase();
  if (a.includes('upload')) return Upload;
  if (a.includes('delete')) return Trash2;
  if (a.includes('edit') || a.includes('update')) return FileEdit;
  if (a.includes('image')) return ImageIcon;
  if (a.includes('category')) return Tag;
  return ActivityIcon;
};

const getActionColor = (action: string) => {
  const a = action.toLowerCase();
  if (a.includes('delete')) return 'text-destructive bg-destructive/10';
  if (a.includes('upload') || a.includes('create')) return 'text-green-500 bg-green-500/10';
  if (a.includes('edit') || a.includes('update')) return 'text-accent bg-accent/10';
  return 'text-muted-foreground bg-muted';
};

export const RecentActivity = ({ activities, limit = 10 }: RecentActivityProps) => {
  const display = activities.slice(0, limit);

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-xl uppercase text-foreground">Recent Activity</h2>
        <Link to="/admin/activity" className="text-sm text-primary hover:text-primary/80 font-ui transition-colors">
          View all →
        </Link>
      </div>

      {display.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <ActivityIcon className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="font-display text-lg uppercase">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-4">
          {display.map((activity) => {
            const Icon = getActionIcon(activity.action);
            const colorClass = getActionColor(activity.action);
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-lg flex-shrink-0 ${colorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-ui text-foreground">{activity.action}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-muted-foreground font-body">{activity.userEmail}</p>
                    <span className="text-xs text-muted-foreground">·</span>
                    <p className="text-xs text-muted-foreground font-body">{activity.entityType}</p>
                  </div>
                  {activity.details && (
                    <p className="text-xs text-muted-foreground font-body mt-0.5 truncate">{activity.details}</p>
                  )}
                </div>
                <div className="text-xs text-muted-foreground font-body whitespace-nowrap">
                  {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
