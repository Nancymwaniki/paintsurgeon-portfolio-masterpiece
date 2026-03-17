import { Category } from '@/types/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Image } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export const CategoryCard = ({ category, onEdit, onDelete }: CategoryCardProps) => (
  <div className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all hover:shadow-lg group">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h3 className="font-display text-lg uppercase text-foreground">{category.name}</h3>
        <p className="text-xs text-muted-foreground font-ui mt-0.5">{category.slug}</p>
      </div>
      <Badge variant="outline" className="ml-2 text-xs font-ui border-border text-muted-foreground">
        #{category.order}
      </Badge>
    </div>

    {category.description && (
      <p className="text-sm text-muted-foreground font-body mb-4 leading-relaxed">{category.description}</p>
    )}

    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground font-ui">
        <div className="p-1.5 bg-primary/10 rounded-lg">
          <Image className="h-3.5 w-3.5 text-primary" />
        </div>
        <span>{category.imageCount || 0} images</span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(category)} className="font-ui text-xs h-8">
          <Pencil className="h-3.5 w-3.5 mr-1" />Edit
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(category)} className="font-ui text-xs h-8 text-destructive hover:text-destructive hover:bg-destructive/10">
          <Trash2 className="h-3.5 w-3.5 mr-1" />Delete
        </Button>
      </div>
    </div>
  </div>
);
