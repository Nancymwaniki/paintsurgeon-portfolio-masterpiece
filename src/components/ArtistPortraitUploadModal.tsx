import React, { useState, useCallback } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUploadImage } from '@/hooks/useImages';
import { Category } from '@/types/image';
import { showSuccessToast, showErrorToast } from '@/utils/errorHandler';

interface ArtistPortraitUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Dedicated modal for uploading artist portrait only
 * This image will NOT appear in the portfolio
 */
export const ArtistPortraitUploadModal: React.FC<ArtistPortraitUploadModalProps> = ({
  isOpen,
  onClose,
  categories,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadMutation = useUploadImage();

  // Get first category as default (or create a dedicated "Artist Portrait" category)
  const defaultCategory = categories[0]?.id || '';

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_FORMATS.includes(file.type)) {
      return 'Invalid file format. Please upload JPEG, PNG, or WebP images.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size exceeds 5MB limit.';
    }
    return null;
  };

  const handleFileSelect = useCallback((selectedFile: File) => {
    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    setFile(selectedFile);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Please select an image');
      return;
    }

    if (!defaultCategory) {
      setError('No categories available. Please create a category first.');
      return;
    }

    try {
      await uploadMutation.mutateAsync({
        file: file,
        data: {
          title: 'Artist Portrait',
          categoryId: defaultCategory,
          featured: false,
          artistPortrait: true, // This is the key flag
        },
      });

      showSuccessToast('Artist portrait uploaded successfully!');
      handleClose();
    } catch (err) {
      showErrorToast(err);
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card border border-border rounded-lg shadow-lg max-w-lg w-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-2xl font-display font-bold">Upload Artist Portrait</h2>
              <p className="text-sm text-muted-foreground mt-1">
                This image will only appear on the About page
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* File upload area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-primary bg-primary/5'
                  : error
                  ? 'border-destructive'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {preview ? (
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Change image
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="mx-auto text-muted-foreground" size={48} />
                  <div>
                    <p className="text-foreground font-medium">
                      Drag and drop your portrait here
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      JPEG, PNG, or WebP (max 5MB)
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended: Portrait-oriented photo
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileInput}
                    className="hidden"
                    id="portrait-file-input"
                  />
                  <label
                    htmlFor="portrait-file-input"
                    className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    Select Image
                  </label>
                </div>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Info message */}
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-foreground">
                <strong>Note:</strong> This image will NOT appear in your portfolio gallery. 
                It's exclusively for the About page.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                disabled={uploadMutation.isPending}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!file || uploadMutation.isPending}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {uploadMutation.isPending && <Loader2 size={16} className="animate-spin" />}
                {uploadMutation.isPending ? 'Uploading...' : 'Upload Portrait'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
