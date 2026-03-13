/**
 * Form validation utilities
 * Validates: Requirements 17.1, 17.2, 17.4
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validate email address using RFC 5322 format
 * Validates: Requirement 17.4
 */
export const validateEmail = (email: string): boolean => {
  // RFC 5322 compliant email regex (simplified but comprehensive)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

/**
 * Validate required field
 * Validates: Requirement 17.1
 */
export const validateRequired = (value: string | undefined | null, fieldName: string): ValidationError | null => {
  if (!value || value.trim() === '') {
    return {
      field: fieldName,
      message: `${fieldName} is required`,
    };
  }
  return null;
};

/**
 * Validate string length
 * Validates: Requirement 17.2
 */
export const validateLength = (
  value: string,
  fieldName: string,
  min?: number,
  max?: number
): ValidationError | null => {
  if (min !== undefined && value.length < min) {
    return {
      field: fieldName,
      message: `${fieldName} must be at least ${min} characters`,
    };
  }
  if (max !== undefined && value.length > max) {
    return {
      field: fieldName,
      message: `${fieldName} must not exceed ${max} characters`,
    };
  }
  return null;
};

/**
 * Validate email field
 * Validates: Requirements 17.1, 17.2, 17.4
 */
export const validateEmailField = (email: string | undefined | null): ValidationError | null => {
  const requiredError = validateRequired(email, 'Email');
  if (requiredError) return requiredError;

  if (!validateEmail(email!)) {
    return {
      field: 'email',
      message: 'Please enter a valid email address',
    };
  }

  return null;
};

/**
 * Validate phone number (optional but must be valid if provided)
 */
export const validatePhone = (phone: string | undefined | null): ValidationError | null => {
  if (!phone || phone.trim() === '') return null; // Optional field

  // Basic phone validation (digits, spaces, dashes, parentheses, plus sign)
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  if (!phoneRegex.test(phone)) {
    return {
      field: 'phone',
      message: 'Please enter a valid phone number',
    };
  }

  // Check minimum length (at least 10 digits)
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    return {
      field: 'phone',
      message: 'Phone number must contain at least 10 digits',
    };
  }

  return null;
};

/**
 * Validate URL
 */
export const validateUrl = (url: string | undefined | null, fieldName: string = 'URL'): ValidationError | null => {
  if (!url || url.trim() === '') return null; // Optional field

  try {
    new URL(url);
    return null;
  } catch {
    return {
      field: fieldName.toLowerCase(),
      message: `Please enter a valid ${fieldName}`,
    };
  }
};

/**
 * Validate file size
 * Validates: Requirement 18.2
 */
export const validateFileSize = (file: File, maxSizeMB: number = 5): ValidationError | null => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      field: 'file',
      message: `File size must not exceed ${maxSizeMB}MB`,
    };
  }
  return null;
};

/**
 * Validate file type
 * Validates: Requirement 18.2
 */
export const validateFileType = (
  file: File,
  allowedTypes: string[],
  fieldName: string = 'File'
): ValidationError | null => {
  if (!allowedTypes.includes(file.type)) {
    const typeNames = allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ');
    return {
      field: 'file',
      message: `${fieldName} must be one of: ${typeNames}`,
    };
  }
  return null;
};

/**
 * Validate contact form
 * Validates: Requirements 17.1, 17.2, 17.4
 */
export const validateContactForm = (data: {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  // Validate name
  const nameError = validateRequired(data.name, 'Name');
  if (nameError) errors.push(nameError);

  // Validate email
  const emailError = validateEmailField(data.email);
  if (emailError) errors.push(emailError);

  // Validate phone (optional)
  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.push(phoneError);

  // Validate message
  const messageError = validateRequired(data.message, 'Message');
  if (messageError) errors.push(messageError);
  else {
    const lengthError = validateLength(data.message!, 'Message', 10, 5000);
    if (lengthError) errors.push(lengthError);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate image upload form
 * Validates: Requirements 17.1, 17.2, 18.2
 */
export const validateImageUpload = (data: {
  file?: File;
  title?: string;
  description?: string;
  categoryId?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  // Validate file
  if (!data.file) {
    errors.push({ field: 'file', message: 'Please select an image to upload' });
  } else {
    // Validate file size
    const sizeError = validateFileSize(data.file, 5);
    if (sizeError) errors.push(sizeError);

    // Validate file type
    const typeError = validateFileType(
      data.file,
      ['image/jpeg', 'image/png', 'image/webp'],
      'Image'
    );
    if (typeError) errors.push(typeError);
  }

  // Validate category
  const categoryError = validateRequired(data.categoryId, 'Category');
  if (categoryError) errors.push(categoryError);

  // Validate title (optional but has max length)
  if (data.title) {
    const titleError = validateLength(data.title, 'Title', undefined, 200);
    if (titleError) errors.push(titleError);
  }

  // Validate description (optional but has max length)
  if (data.description) {
    const descError = validateLength(data.description, 'Description', undefined, 1000);
    if (descError) errors.push(descError);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate login form
 * Validates: Requirements 17.1, 17.2
 */
export const validateLoginForm = (data: {
  email?: string;
  password?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  // Validate email
  const emailError = validateEmailField(data.email);
  if (emailError) errors.push(emailError);

  // Validate password
  const passwordError = validateRequired(data.password, 'Password');
  if (passwordError) errors.push(passwordError);

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Get error message for a specific field
 */
export const getFieldError = (errors: ValidationError[], fieldName: string): string | undefined => {
  const error = errors.find(e => e.field.toLowerCase() === fieldName.toLowerCase());
  return error?.message;
};
