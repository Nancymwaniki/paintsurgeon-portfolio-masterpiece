import React, { useState, useEffect } from 'react';
import { X, Loader2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUpdateImage, useDeleteImage } from '@/hooks/useImages';
import { ImageResponseDto, Category } from '@/types/image';

interface ImageEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageResponseDto | null;
  categories: Category[];
}

/**
 * Modal for editing image metadata and deleting images
 */
export const ImageEditModal: React.FC<ImageEditModalProps> = ({
  isOpen,
  onClose,
  image,
  categories,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [featured, setFeatured] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateMutation = useUpdateImage();
  const deleteMutation = useDeleteImage();

  // Initialize form with image data
  useEffect(() => {
    if (image) {
      setTitle(image.title || '');
      setDescription(image.description || '');
      setCategoryId(image.categoryId);
      setFeatured(image.featured);
      setError(null);
      setShowDeleteConfirm(false);
    }
  }, [image]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) return;

    if (!categoryId) {
      setError('Please select a category.');
      return;
    }

    try {
      await updateMutation.mutateAsync({
        id: image.id,
        data: {
          title: title || undefined,
          description: description || undefined,
          categoryId,
          featured,
        },
      });

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update image');
    }
  };

  const handleDelete = async () => {
    if (!image) return;

    try {
      await deleteMutation.mutateAsync(image.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete image');
    }
  };

  if (!isOpen || !image) return null;

  // Construct the full image URL
  const imageUrl = image.thumbnailUrl?.startsWith('http')
    ? image.thumbnailUrl
    : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3000'}${image.thumbnailUrl || ''}`;

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
            <h2 className="text-2xl font-display font-bold">Edit Image</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Image preview */}
            <div className="flex justify-center">
              <img
                src={imageUrl}
                alt={image.title || image.filename}
                className="max-h-64 rounded-lg"
              />
            </div>

            {/* Category selection (required) */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category <span className="text-destructive">*</span>
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter image title"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {title.length}/200 characters
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={1000}
                rows={3}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Enter image description"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {description.length}/1000 characters
              </p>
            </div>

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

            {/* Error message */}
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Success message */}
            {updateMutation.isSuccess && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 text-sm">
                Image updated successfully!
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 justify-between">
              {/* Delete button */}
              <div>
                {!showDeleteConfirm ? (
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center gap-2"
                    disabled={updateMutation.isPending || deleteMutation.isPending}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors flex items-center gap-2"
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending && (
                        <Loader2 size={16} className="animate-spin" />
                      )}
                      Confirm Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                      disabled={deleteMutation.isPending}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Save/Cancel buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  disabled={updateMutation.isPending || deleteMutation.isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!categoryId || updateMutation.isPending || deleteMutation.isPending}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {updateMutation.isPending && <Loader2 size={16} className="animate-spin" />}
                  {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
