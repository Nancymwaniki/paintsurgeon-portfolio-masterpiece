import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2, GripVertical } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ImageResponseDto } from '@/types/image';
import ImageWithLoader from './ImageWithLoader';

interface ImageCardProps {
  image: ImageResponseDto;
  index: number;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isDraggable?: boolean;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  index,
  onClick,
  onEdit,
  onDelete,
  isDraggable = false,
}) => {
  const { isAuthenticated } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3000';
  const imageUrl = image.thumbnailUrl?.startsWith('http')
    ? image.thumbnailUrl
    : `${baseUrl}/${(image.thumbnailUrl || '').replace(/^\//, '')}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer relative overflow-hidden rounded-lg w-full h-full"
    >
      <ImageWithLoader
        src={imageUrl}
        alt={image.title || image.filename}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-5">
        <div className="flex-1">
          {image.category && (
            <span className="text-primary font-ui text-[10px] sm:text-xs uppercase tracking-wider">
              {image.category.name}
            </span>
          )}
          <h3 className="font-display text-sm sm:text-2xl text-foreground">
            {image.title || image.filename}
          </h3>
          {image.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {image.description}
            </p>
          )}
          {image.featured && (
            <span className="inline-block mt-2 text-[10px] sm:text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full">
              Featured
            </span>
          )}
        </div>
      </div>

      {isAuthenticated && isHovered && (
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          {isDraggable && (
            <button
              className="p-2 rounded-full bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-grab active:cursor-grabbing"
              aria-label="Drag to reorder"
            >
              <GripVertical size={16} />
            </button>
          )}
          {onEdit && (
            <button
              onClick={handleEdit}
              className="p-2 rounded-full bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Edit image"
            >
              <Pencil size={16} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="p-2 rounded-full bg-background/90 text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
              aria-label="Delete image"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};
