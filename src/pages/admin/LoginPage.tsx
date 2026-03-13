import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { authApi } from '@/lib/api';
import { FormField } from '@/components/FormField';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { validateLoginForm, getFieldError } from '@/utils/validation';
import { showErrorToast, showSuccessToast } from '@/utils/errorHandler';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Array<{ field: string; message: string }>>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    
    // Validate on blur for real-time feedback
    const validation = validateLoginForm({ email, password });
    setErrors(validation.errors);
  };

  const handleChange = (field: string, value: string) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    
    // Clear error for this field when user starts typing
    if (touched[field]) {
      const validation = validateLoginForm({
        email: field === 'email' ? value : email,
        password: field === 'password' ? value : password,
      });
      setErrors(validation.errors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ email: true, password: true });
    
    // Validate form
    const validation = validateLoginForm({ email, password });
    setErrors(validation.errors);
    
    if (!validation.isValid) {
      showErrorToast('Please fix the errors in the form');
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await authApi.login({ email, password });
      login(response.access_token, response.user);
      showSuccessToast('Login successful!');
      navigate(from, { replace: true });
    } catch (err) {
      showErrorToast(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-display font-extrabold text-foreground">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground font-body">
            Sign in to access the admin dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6 bg-card border border-border rounded-lg p-8" onSubmit={handleSubmit}>
          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(value) => handleChange('email', value)}
            onBlur={() => handleBlur('email')}
            error={touched.email ? getFieldError(errors, 'email') : undefined}
            required
            placeholder="admin@example.com"
            disabled={isLoading}
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(value) => handleChange('password', value)}
            onBlur={() => handleBlur('password')}
            error={touched.password ? getFieldError(errors, 'password') : undefined}
            required
            placeholder="Enter your password"
            disabled={isLoading}
          />

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
