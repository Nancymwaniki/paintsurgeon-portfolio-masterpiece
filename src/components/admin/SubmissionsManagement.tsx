import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';
import { SubmissionList } from './SubmissionList';
import { SubmissionDetail } from './SubmissionDetail';
import { SubmissionFilters } from './SubmissionFilters';
import { useSubmissions, useMarkAsRead, useDeleteSubmission } from '@/hooks/useSubmissions';
import { SubmissionResponseDto } from '@/types/submission';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const SubmissionsManagement = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionResponseDto | null>(null);
  const [submissionToDelete, setSubmissionToDelete] = useState<string | null>(null);

  // Fetch submissions based on filter
  const filterParams = useMemo(() => {
    if (activeFilter === 'all') return undefined;
    return { read: activeFilter === 'read' };
  }, [activeFilter]);

  const { data: submissions = [], isLoading, error } = useSubmissions(filterParams);
  const markAsReadMutation = useMarkAsRead();
  const deleteSubmissionMutation = useDeleteSubmission();

  // Calculate counts for filters
  const counts = useMemo(() => {
    const all = submissions.length;
    const unread = submissions.filter((s) => !s.read).length;
    const read = submissions.filter((s) => s.read).length;
    return { all, unread, read };
  }, [submissions]);

  // Mark as read when viewing a submission
  const handleSubmissionClick = (submission: SubmissionResponseDto) => {
    setSelectedSubmission(submission);
    
    // Mark as read if it's unread
    if (!submission.read) {
      markAsReadMutation.mutate(submission.id);
    }
  };

  const handleDeleteClick = (id: string) => {
    setSubmissionToDelete(id);
  };

  const handleDeleteConfirm = () => {
    if (submissionToDelete) {
      deleteSubmissionMutation.mutate(submissionToDelete, {
        onSuccess: () => {
          setSubmissionToDelete(null);
          setSelectedSubmission(null);
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <Inbox className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
            Contact Submissions
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and respond to contact form submissions
          </p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <SubmissionFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={counts}
        />
      </motion.div>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading submissions...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">
            Failed to load submissions. Please try again.
          </p>
        </div>
      )}

      {/* Submissions List */}
      {!isLoading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SubmissionList
            submissions={submissions}
            onSubmissionClick={handleSubmissionClick}
          />
        </motion.div>
      )}

      {/* Submission Detail Modal */}
      <SubmissionDetail
        submission={selectedSubmission}
        isOpen={!!selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        onDelete={handleDeleteClick}
        isDeleting={deleteSubmissionMutation.isPending}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!submissionToDelete} onOpenChange={() => setSubmissionToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this submission? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleteSubmissionMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteSubmissionMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
