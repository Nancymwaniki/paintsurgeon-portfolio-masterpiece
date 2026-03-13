import { Category } from '@/types/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Image } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export const CategoryCard = ({ category, onEdit, onDelete }: CategoryCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{category.name}</CardTitle>
            <CardDescription className="text-sm text-gray-500 mt-1">
              {category.slug}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2">
            Order: {category.order}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {category.description && (
          <p className="text-sm text-gray-600 mb-4">{category.description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Image className="h-4 w-4" />
            <span>{category.imageCount || 0} images</span>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(category)}
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(category)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
