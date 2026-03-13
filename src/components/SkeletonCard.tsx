import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
}

/**
 * Skeleton card for loading states
 * Validates: Requirements 5.3, 18.1
 */
export const SkeletonCard: React.FC<SkeletonCardProps> = ({ className }) => {
  return (
    <div className={cn('bg-card border border-border rounded-lg p-4 space-y-3', className)}>
      <Skeleton className="h-48 w-full rounded-md" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
};

/**
 * Skeleton for image gallery loading
 */
export const ImageGallerySkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

/**
 * Skeleton for stats card loading
 */
export const StatsCardSkeleton: React.FC = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
};

/**
 * Skeleton for list items loading
 */
export const ListItemSkeleton: React.FC = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
};

/**
 * Skeleton for table rows loading
 */
export const TableRowSkeleton: React.FC<{ columns?: number }> = ({ columns = 4 }) => {
  return (
    <tr className="border-b border-border">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="p-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
};
