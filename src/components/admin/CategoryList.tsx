import { Category } from '@/types/image';
import { CategoryCard } from './CategoryCard';
import { Tag } from 'lucide-react';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export const CategoryList = ({ categories, onEdit, onDelete }: CategoryListProps) => {
  if (categories.length === 0) {
    return (
      <div className="text-center py-24 text-muted-foreground">
        <Tag className="h-16 w-16 mx-auto mb-4 opacity-20" />
        <p className="font-display text-xl uppercase">No categories yet</p>
        <p className="text-sm font-body mt-2">Create your first category to get started</p>
      </div>
    );
  }

  const sorted = [...categories].sort((a, b) => a.order - b.order);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sorted.map((category) => (
        <CategoryCard key={category.id} category={category} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};
