import { ActivityLogDto } from '@/types/activity';
import { formatDistanceToNow } from 'date-fns';
import { 
  FileEdit, 
  Image as ImageIcon, 
  Trash2, 
  Upload, 
  Tag,
  Activity as ActivityIcon,
  Mail,
  User
} from 'lucide-react';

interface ActivityItemProps {
  activity: ActivityLogDto;
}

const getActionIcon = (action: string, entityType: string) => {
  const actionLower = action.toLowerCase();
  const entityLower = entityType.toLowerCase();
  
  if (actionLower.includes('upload')) return Upload;
  if (actionLower.includes('delete')) return Trash2;
  if (actionLower.includes('edit') || actionLower.includes('update')) return FileEdit;
  if (entityLower.includes('image')) return ImageIcon;
  if (entityLower.includes('category')) return Tag;
  if (entityLower.includes('submission')) return Mail;
  if (entityLower.includes('user')) return User;
  
  return ActivityIcon;
};

const getActionColor = (action: string) => {
  const actionLower = action.toLowerCase();
  
  if (actionLower.includes('delete')) return 'text-red-600 bg-red-50';
  if (actionLower.includes('upload') || actionLower.includes('create')) return 'text-green-600 bg-green-50';
  if (actionLower.includes('edit') || actionLower.includes('update')) return 'text-blue-600 bg-blue-50';
  
  return 'text-gray-600 bg-gray-50';
};

export const ActivityItem = ({ activity }: ActivityItemProps) => {
  const Icon = getActionIcon(activity.action, activity.entityType);
  const colorClass = getActionColor(activity.action);
  
  return (
    <div className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors">
      <div className={`p-3 rounded-full ${colorClass} flex-shrink-0`}>
        <Icon className="h-5 w-5" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              {activity.action}
            </p>
            
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-muted-foreground">
                {activity.userEmail}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {activity.entityType}
              </span>
              {activity.entityId && (
                <>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground font-mono">
                    ID: {activity.entityId.substring(0, 8)}...
                  </span>
                </>
              )}
            </div>
            
            {activity.details && (
              <p className="text-xs text-muted-foreground mt-2 break-words">
                {activity.details}
              </p>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
            {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  );
};
