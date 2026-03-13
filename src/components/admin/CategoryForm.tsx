import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '@/types/image';

interface CategoryFormProps {
  category?: Category;
  onSubmit: (data: CreateCategoryDto | UpdateCategoryDto) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const CategoryForm = ({ category, onSubmit, onCancel, isSubmitting }: CategoryFormProps) => {
  const [name, setName] = useState(category?.name || '');
  const [slug, setSlug] = useState(category?.slug || '');
  const [description, setDescription] = useState(category?.description || '');
  const [order, setOrder] = useState(category?.order?.toString() || '0');

  // Auto-generate slug from name
  useEffect(() => {
    if (!category && name) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generatedSlug);
    }
  }, [name, category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
      order: parseInt(order) || 0,
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., House Painting"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Label htmlFor="slug">Slug *</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="e.g., house-painting"
          required
          disabled={isSubmitting}
          pattern="[a-z0-9-]+"
          title="Only lowercase letters, numbers, and hyphens allowed"
        />
        <p className="text-xs text-gray-500 mt-1">
          URL-friendly identifier (lowercase, hyphens only)
        </p>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description for this category"
          rows={3}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Label htmlFor="order">Display Order</Label>
        <Input
          id="order"
          type="number"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          placeholder="0"
          min="0"
          disabled={isSubmitting}
        />
        <p className="text-xs text-gray-500 mt-1">
          Lower numbers appear first
        </p>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
        </Button>
      </div>
    </form>
  );
};
