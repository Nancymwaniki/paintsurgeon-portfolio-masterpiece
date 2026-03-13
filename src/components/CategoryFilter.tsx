import React from 'react';
import { Category } from '@/types/image';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

/**
 * Category filter component for filtering images by category
 * Visible to all users (public and admin)
 */
export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
      <button
        onClick={() => onCategoryChange(null)}
        className={`font-ui text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border transition-all ${
          activeCategory === null
            ? 'bg-primary border-primary text-primary-foreground'
            : 'border-border text-muted-foreground hover:border-foreground/30'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`font-ui text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border transition-all ${
            activeCategory === category.id
              ? 'bg-primary border-primary text-primary-foreground'
              : 'border-border text-muted-foreground hover:border-foreground/30'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
