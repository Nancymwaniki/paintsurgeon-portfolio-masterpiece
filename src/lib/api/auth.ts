import { apiClient } from './client';
import { LoginCredentials, AuthResponse, User } from '@/types/auth';

export const authApi = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Get current user information
   */
  me: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  /**
   * Logout (client-side only, clears token)
   */
  logout: async (): Promise<void> => {
    // The backend doesn't have a logout endpoint since JWT is stateless
    // Just clear local storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  },
};
