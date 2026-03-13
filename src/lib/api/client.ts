import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { logError } from '@/utils/errorHandler';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    logError(error, 'API Request');
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and retry logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Log all API errors
    logError(error, `API ${originalRequest.method?.toUpperCase()} ${originalRequest.url}`);

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear auth state and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      
      // Redirect to login page
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
      
      return Promise.reject(error);
    }

    // Handle network errors with retry logic
    if (!error.response && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Wait 1 second before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      return apiClient(originalRequest);
    }

    // Return the full error object for proper error handling
    return Promise.reject(error);
  }
);

// Helper function to handle API errors
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
};
