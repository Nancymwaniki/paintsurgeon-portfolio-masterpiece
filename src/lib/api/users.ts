import { apiClient } from './client';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'EDITOR';
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdminDto {
  email: string;
  password: string;
  name: string;
  role?: 'ADMIN' | 'EDITOR';
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export const usersApi = {
  getAll: async (): Promise<AdminUser[]> => {
    const res = await apiClient.get('/users');
    // Handle both direct array and wrapped responses
    const data = res.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  },

  create: async (data: CreateAdminDto): Promise<AdminUser> => {
    const res = await apiClient.post<AdminUser>('/users', data);
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },

  changePassword: async (data: ChangePasswordDto): Promise<{ message: string }> => {
    const res = await apiClient.post<{ message: string }>('/users/change-password', data);
    return res.data;
  },
};
