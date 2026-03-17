import { motion } from 'framer-motion';
import { useActivity } from '@/hooks/useActivity';
import { ActivityLog } from '@/components/admin/ActivityLog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';

export const ActivityPage = () => {
  const { data: activities, isLoading, isError, error, refetch, isRefetching } = useActivity(20);

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20 pb-16 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground uppercase">
            Activity Log
          </h1>
          <p className="mt-2 text-muted-foreground font-body text-sm">
            Track all administrative actions and changes
          </p>
        </motion.div>

        {isError && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading activity log</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>{error?.message || 'Failed to load activities'}</span>
              <Button variant="outline" size="sm" onClick={() => refetch()}>Retry</Button>
            </AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground font-body">Loading activity log...</span>
          </div>
        )}

        {!isLoading && activities && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <ActivityLog activities={activities} isRefetching={isRefetching} onRefresh={() => refetch()} />
          </motion.div>
        )}
      </div>
    </div>
  );
};
