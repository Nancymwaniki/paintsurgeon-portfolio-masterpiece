import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usersApi, CreateAdminDto, ChangePasswordDto } from '@/lib/api';
import { showSuccessToast, showErrorToast } from '@/utils/errorHandler';

export const useAdmins = () =>
  useQuery({
    queryKey: ['admins'],
    queryFn: async () => {
      const result = await usersApi.getAll();
      return Array.isArray(result) ? result : [];
    },
    retry: false,
  });

export const useCreateAdmin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAdminDto) => usersApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admins'] });
      showSuccessToast('Admin created successfully');
    },
    onError: (err: any) => showErrorToast(err),
  });
};

export const useDeleteAdmin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admins'] });
      showSuccessToast('Admin removed successfully');
    },
    onError: (err: any) => showErrorToast(err),
  });
};

export const useChangePassword = () =>
  useMutation({
    mutationFn: (data: ChangePasswordDto) => usersApi.changePassword(data),
    onSuccess: () => showSuccessToast('Password changed successfully'),
    onError: (err: any) => showErrorToast(err),
  });
