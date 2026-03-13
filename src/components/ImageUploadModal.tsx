import React, { useState, useCallback } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUploadImage } from '@/hooks/useImages';
import { Category } from '@/types/image';
import { FormField } from '@/components/FormField';
import { validateImageUpload, getFieldError } from '@/utils/validation';
import { showSuccessToast, showErrorToast } from '@/utils/errorHandler';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Modal for uploading images with drag-and-drop support
 * Validates: Requirements 5.3, 17.1, 17.2, 18.1, 18.2
 */
export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  categories,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [featured, setFeatured] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<Array<{ field: string; message: string }>>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const uploadMutation = useUploadImage();

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
      showErrorToast(validationError);
      return;
    }

    setFile(selectedFile);
    setErrors(errors.filter(e => e.field !== 'file'));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, [errors]);

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

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ file: true, categoryId: true, title: true, description: true });

    // Validate form
    const validation = validateImageUpload({
      file: file || undefined,
      title,
      description,
      categoryId,
    });

    setErrors(validation.errors);

    if (!validation.isValid) {
      showErrorToast('Please fix the errors in the form');
      return;
    }

    try {
      await uploadMutation.mutateAsync({
        file: file!,
        data: {
          title: title || undefined,
          description: description || undefined,
          categoryId,
          featured,
          artistPortrait: false, // Portfolio images are never artist portraits
        },
      });

      showSuccessToast('Image uploaded successfully!');
      handleClose();
    } catch (err) {
      showErrorToast(err);
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreview(null);
    setTitle('');
    setDescription('');
    setCategoryId('');
    setFeatured(false);
    setErrors([]);
    setTouched({});
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
          className="bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl font-display font-bold">Upload Image</h2>
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
                  : touched.file && getFieldError(errors, 'file')
                  ? 'border-destructive'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {preview ? (
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg"
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
                      Drag and drop an image here, or click to select
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      JPEG, PNG, or WebP (max 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-input"
                  />
                  <label
                    htmlFor="file-input"
                    className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    Select Image
                  </label>
                </div>
              )}
            </div>

            {/* File error */}
            {touched.file && getFieldError(errors, 'file') && (
              <p className="text-sm text-destructive">{getFieldError(errors, 'file')}</p>
            )}

            {/* Category selection (required) */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category <span className="text-destructive">*</span>
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                onBlur={() => handleBlur('categoryId')}
                className={`w-full px-3 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                  touched.categoryId && getFieldError(errors, 'categoryId')
                    ? 'border-destructive'
                    : 'border-border'
                }`}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {touched.categoryId && getFieldError(errors, 'categoryId') && (
                <p className="text-sm text-destructive mt-1">
                  {getFieldError(errors, 'categoryId')}
                </p>
              )}
            </div>

            {/* Title (optional) */}
            <FormField
              label="Title"
              name="title"
              value={title}
              onChange={setTitle}
              onBlur={() => handleBlur('title')}
              error={touched.title ? getFieldError(errors, 'title') : undefined}
              placeholder="Enter image title"
              maxLength={200}
              showCharCount
            />

            {/* Description (optional) */}
            <FormField
              label="Description"
              name="description"
              type="textarea"
              value={description}
              onChange={setDescription}
              onBlur={() => handleBlur('description')}
              error={touched.description ? getFieldError(errors, 'description') : undefined}
              placeholder="Enter image description"
              maxLength={1000}
              rows={3}
              showCharCount
            />

            {/* Featured toggle */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
                Mark as featured (homepage)
              </label>
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
                disabled={!file || !categoryId || uploadMutation.isPending}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {uploadMutation.isPending && <Loader2 size={16} className="animate-spin" />}
                {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
