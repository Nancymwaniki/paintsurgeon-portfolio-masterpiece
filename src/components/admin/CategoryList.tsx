import { Category } from '@/types/image';
import { CategoryCard } from './CategoryCard';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export const CategoryList = ({ categories, onEdit, onDelete }: CategoryListProps) => {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No categories yet</p>
        <p className="text-sm mt-2">Create your first category to get started</p>
      </div>
    );
  }

  // Sort categories by order
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedCategories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
