import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadProgressProps {
  progress: number;
  fileName?: string;
  status?: 'uploading' | 'success' | 'error';
  error?: string;
  className?: string;
}

/**
 * Upload progress indicator component
 * Validates: Requirements 5.3, 18.1, 18.2
 */
export const UploadProgress: React.FC<UploadProgressProps> = ({
  progress,
  fileName,
  status = 'uploading',
  error,
  className,
}) => {
  return (
    <div className={cn('bg-card border border-border rounded-lg p-4 space-y-3', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {status === 'uploading' && (
            <Upload className="w-5 h-5 text-primary animate-pulse" />
          )}
          {status === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          )}
          {status === 'error' && (
            <XCircle className="w-5 h-5 text-destructive" />
          )}
          <span className="text-sm font-medium text-foreground">
            {fileName || 'Uploading file...'}
          </span>
        </div>
        <span className="text-sm text-muted-foreground font-mono">
          {progress}%
        </span>
      </div>

      {/* Progress bar */}
      <Progress value={progress} className="h-2" />

      {/* Status message */}
      <div className="text-xs">
        {status === 'uploading' && (
          <p className="text-muted-foreground">Uploading...</p>
        )}
        {status === 'success' && (
          <p className="text-green-600">Upload complete!</p>
        )}
        {status === 'error' && (
          <p className="text-destructive">{error || 'Upload failed'}</p>
        )}
      </div>
    </div>
  );
};

/**
 * Multiple file upload progress component
 */
interface MultiUploadProgressProps {
  uploads: Array<{
    id: string;
    fileName: string;
    progress: number;
    status: 'uploading' | 'success' | 'error';
    error?: string;
  }>;
  className?: string;
}

export const MultiUploadProgress: React.FC<MultiUploadProgressProps> = ({
  uploads,
  className,
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      {uploads.map((upload) => (
        <UploadProgress
          key={upload.id}
          fileName={upload.fileName}
          progress={upload.progress}
          status={upload.status}
          error={upload.error}
        />
      ))}
    </div>
  );
};
