import { apiClient } from './client';
import { ContactSubmission, CreateSubmissionDto, SubmissionResponseDto } from '@/types/submission';

export const submissionsApi = {
  /**
   * Submit a contact form (public)
   */
  createSubmission: async (data: CreateSubmissionDto): Promise<SubmissionResponseDto> => {
    const response = await apiClient.post<SubmissionResponseDto>('/contact', data);
    return response.data;
  },

  /**
   * List all submissions (admin only)
   */
  listSubmissions: async (params?: { read?: boolean }): Promise<SubmissionResponseDto[]> => {
    const response = await apiClient.get<SubmissionResponseDto[]>('/contact/submissions', { params });
    return response.data;
  },

  /**
   * Get a single submission by ID (admin only)
   */
  getSubmission: async (id: string): Promise<SubmissionResponseDto> => {
    const response = await apiClient.get<SubmissionResponseDto>(`/contact/submissions/${id}`);
    return response.data;
  },

  /**
   * Mark a submission as read (admin only)
   */
  markAsRead: async (id: string): Promise<SubmissionResponseDto> => {
    const response = await apiClient.put<SubmissionResponseDto>(`/contact/submissions/${id}/read`);
    return response.data;
  },

  /**
   * Delete a submission (admin only)
   */
  deleteSubmission: async (id: string): Promise<void> => {
    await apiClient.delete(`/contact/submissions/${id}`);
  },
};
