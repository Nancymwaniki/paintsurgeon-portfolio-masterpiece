import { toast } from '@/hooks/use-toast';

/**
 * Error types for categorizing errors
 */
export enum ErrorType {
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NOT_FOUND = 'not_found',
  NETWORK = 'network',
  SERVER = 'server',
  UNKNOWN = 'unknown',
}

/**
 * Structured error interface
 */
export interface AppError {
  type: ErrorType;
  message: string;
  details?: string;
  statusCode?: number;
}

/**
 * Parse error from API response or Error object
 * Validates: Requirements 18.1, 18.2
 */
export const parseError = (error: unknown): AppError => {
  // Handle axios/fetch errors with response
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as any).response;
    const status = response?.status;
    const data = response?.data;

    // Determine error type based on status code
    let type = ErrorType.UNKNOWN;
    if (status === 400) type = ErrorType.VALIDATION;
    else if (status === 401) type = ErrorType.AUTHENTICATION;
    else if (status === 403) type = ErrorType.AUTHORIZATION;
    else if (status === 404) type = ErrorType.NOT_FOUND;
    else if (status >= 500) type = ErrorType.SERVER;

    return {
      type,
      message: data?.message || data?.error || 'An error occurred',
      details: data?.details,
      statusCode: status,
    };
  }

  // Handle Error instances
  if (error instanceof Error) {
    // Check for network errors
    if (error.message.includes('Network') || error.message.includes('fetch')) {
      return {
        type: ErrorType.NETWORK,
        message: 'Network error. Please check your connection and try again.',
      };
    }

    return {
      type: ErrorType.UNKNOWN,
      message: error.message,
    };
  }

  // Handle string errors
  if (typeof error === 'string') {
    return {
      type: ErrorType.UNKNOWN,
      message: error,
    };
  }

  // Fallback for unknown error types
  return {
    type: ErrorType.UNKNOWN,
    message: 'An unexpected error occurred',
  };
};

/**
 * Get user-friendly error message
 * Validates: Requirements 18.1, 18.3
 */
export const getUserFriendlyMessage = (error: AppError): string => {
  switch (error.type) {
    case ErrorType.VALIDATION:
      return error.message || 'Please check your input and try again.';
    
    case ErrorType.AUTHENTICATION:
      return 'Your session has expired. Please log in again.';
    
    case ErrorType.AUTHORIZATION:
      return 'You do not have permission to perform this action.';
    
    case ErrorType.NOT_FOUND:
      return 'The requested resource was not found.';
    
    case ErrorType.NETWORK:
      return 'Network error. Please check your connection and try again.';
    
    case ErrorType.SERVER:
      // Generic message for server errors (don't expose internal details)
      return 'A server error occurred. Please try again later.';
    
    default:
      return error.message || 'An unexpected error occurred.';
  }
};

/**
 * Display error toast notification
 * Validates: Requirements 18.1, 18.4
 * 
 * @param error - Error to display
 * @param duration - Duration in milliseconds (default: 5000ms = 5 seconds)
 */
export const showErrorToast = (error: unknown, duration: number = 5000) => {
  const appError = parseError(error);
  const message = getUserFriendlyMessage(appError);

  toast({
    variant: 'destructive',
    title: 'Error',
    description: message,
    duration, // Requirement 18.4: Display for at least 5 seconds
  });

  // Log error for debugging (in production, send to logging service)
  console.error('Error:', appError);
};

/**
 * Display success toast notification
 * 
 * @param message - Success message to display
 * @param duration - Duration in milliseconds (default: 3000ms)
 */
export const showSuccessToast = (message: string, duration: number = 3000) => {
  toast({
    title: 'Success',
    description: message,
    duration,
  });
};

/**
 * Display info toast notification
 * 
 * @param message - Info message to display
 * @param duration - Duration in milliseconds (default: 3000ms)
 */
export const showInfoToast = (message: string, duration: number = 3000) => {
  toast({
    title: 'Info',
    description: message,
    duration,
  });
};

/**
 * Log error to console and external service (if configured)
 * Validates: Requirements 18.3
 */
export const logError = (error: unknown, context?: string) => {
  const appError = parseError(error);
  
  // Console logging
  console.error(`[${context || 'Error'}]:`, {
    type: appError.type,
    message: appError.message,
    details: appError.details,
    statusCode: appError.statusCode,
    timestamp: new Date().toISOString(),
  });

  // In production, send to external logging service (e.g., Sentry, LogRocket)
  // if (process.env.NODE_ENV === 'production') {
  //   // Send to logging service
  // }
};
