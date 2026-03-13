import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  rows?: number;
  className?: string;
  showCharCount?: boolean;
}

/**
 * Reusable form field component with validation display
 * Validates: Requirements 17.1, 17.2
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  required,
  placeholder,
  disabled,
  maxLength,
  rows = 3,
  className,
  showCharCount,
}) => {
  const hasError = !!error;

  return (
    <div className={cn('space-y-2', className)}>
      {/* Label */}
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      {/* Input or Textarea */}
      {type === 'textarea' ? (
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          rows={rows}
          className={cn(
            'resize-none',
            hasError && 'border-destructive focus-visible:ring-destructive'
          )}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />
      ) : (
        <Input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={cn(
            hasError && 'border-destructive focus-visible:ring-destructive'
          )}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />
      )}

      {/* Character count */}
      {showCharCount && maxLength && (
        <p className="text-xs text-muted-foreground text-right">
          {value.length}/{maxLength}
        </p>
      )}

      {/* Error message */}
      {hasError && (
        <div
          id={`${name}-error`}
          className="flex items-center gap-1 text-sm text-destructive"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
