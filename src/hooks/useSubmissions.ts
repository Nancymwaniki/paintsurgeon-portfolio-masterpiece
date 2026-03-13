import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { submissionsApi } from '@/lib/api/submissions';
import { CreateSubmissionDto } from '@/types/submission';
import { toast } from '@/hooks/use-toast';

/**
 * Hook for fetching submissions with optional filtering
 */
export const useSubmissions = (params?: { read?: boolean }) => {
  return useQuery({
    queryKey: ['submissions', params],
    queryFn: () => submissionsApi.listSubmissions(params),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

/**
 * Hook for fetching a single submission
 */
export const useSubmission = (id: string) => {
  return useQuery({
    queryKey: ['submissions', id],
    queryFn: () => submissionsApi.getSubmission(id),
    enabled: !!id,
  });
};

/**
 * Hook for creating a submission (public contact form)
 */
export const useCreateSubmission = () => {
  return useMutation({
    mutationFn: (data: CreateSubmissionDto) => submissionsApi.createSubmission(data),
    onSuccess: () => {
      toast({
        title: 'Message sent!',
        description: "We'll get back to you soon.",
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to send message. Please try WhatsApp instead.',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook for marking a submission as read
 */
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => submissionsApi.markAsRead(id),
    onSuccess: (updatedSubmission) => {
      // Invalidate submissions list to refetch
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      // Update the specific submission in cache
      queryClient.setQueryData(['submissions', updatedSubmission.id], updatedSubmission);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to mark as read',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Hook for deleting a submission
 */
export const useDeleteSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => submissionsApi.deleteSubmission(id),
    onSuccess: () => {
      // Invalidate submissions list to refetch
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      toast({
        title: 'Success',
        description: 'Submission deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete submission',
        variant: 'destructive',
      });
    },
  });
};
