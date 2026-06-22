import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";
import BackToTop from "@/components/BackToTop";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ImageCard } from "@/components/ImageCard";
import { ImageUploadModal } from "@/components/ImageUploadModal";
import { ImageEditModal } from "@/components/ImageEditModal";
import { useAuth } from "@/contexts/AuthContext";
import { useImages, useReorderImages } from "@/hooks/useImages";
import { useCategories } from "@/hooks/useCategories";
import { ImageResponseDto } from "@/types/image";

/** Assigns a CSS column span / row-height class based on position for a natural masonry feel */
const getMasonryClass = (index: number): string => {
  // Pattern repeats every 7 cards: tall, normal, normal, wide-tall, normal, tall, normal
  const pattern = index % 7;
  switch (pattern) {
    case 0: return 'aspect-[3/4]';   // portrait
    case 1: return 'aspect-square';
    case 2: return 'aspect-[4/3]';   // landscape
    case 3: return 'aspect-[3/4]';   // portrait
    case 4: return 'aspect-[4/3]';
    case 5: return 'aspect-square';
    case 6: return 'aspect-[3/4]';
    default: return 'aspect-square';
  }
};

const SkeletonCard = ({ aspectClass }: { aspectClass: string }) => (
  <div className={`${aspectClass} rounded-xl bg-muted animate-pulse`} />
);

const Portfolio = () => {
  const { isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [imageToEdit, setImageToEdit] = useState<ImageResponseDto | null>(null);
  const [localImages, setLocalImages] = useState<ImageResponseDto[] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragIndex = useRef<number | null>(null);
  const reorderMutation = useReorderImages();

  // Fetch images and categories (exclude artist portraits)
  const { data: images, isLoading: imagesLoading, error: imagesError } = useImages({
    categoryId: activeCategory || undefined,
    artistPortrait: false, // Explicitly exclude artist portraits
  });
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  // Filter images by category
  const sourceImages = localImages || images || [];
  const filteredImages = activeCategory
    ? sourceImages.filter((img) => img.categoryId === activeCategory)
    : sourceImages;

  // Sort images by order
  const sortedImages = [...filteredImages].sort((a, b) => a.order - b.order);

  const handleDragStart = (index: number) => {
    dragIndex.current = index;
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex.current === null || dragIndex.current === index) return;
    const reordered = [...sortedImages];
    const [moved] = reordered.splice(dragIndex.current, 1);
    reordered.splice(index, 0, moved);
    dragIndex.current = index;
    setLocalImages(reordered.map((img, i) => ({ ...img, order: i })));
  };

  const handleDragEnd = async () => {
    setIsDragging(false);
    if (!localImages) return;
    await Promise.all(
      localImages.map((img, i) => reorderMutation.mutateAsync({ id: img.id, order: i }))
    );
    dragIndex.current = null;
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % sortedImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + sortedImages.length) % sortedImages.length);
    }
  };

  const handleEditImage = (image: ImageResponseDto) => {
    setImageToEdit(image);
    setIsEditModalOpen(true);
  };

  // Convert images to lightbox format
  const lightboxImages = sortedImages.map((img) => {
    const imageUrl = img.url?.startsWith('http')
      ? img.url
      : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3000'}${img.url || ''}`;
    
    return {
      img: imageUrl,
      title: img.title || img.filename,
      category: img.category?.name || 'Uncategorized',
      desc: img.description || '',
    };
  });

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-center mb-8 sm:mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl sm:text-6xl md:text-8xl font-bold text-foreground text-center"
            >
              Port<span className="text-gradient">folio</span>
            </motion.h1>
            
            {/* Upload button (admin only) */}
            {isAuthenticated && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setIsUploadModalOpen(true)}
                className="absolute right-0 p-3 sm:p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                aria-label="Upload image"
              >
                <Plus size={24} />
              </motion.button>
            )}
          </div>

          {/* Category Filters */}
          {!categoriesLoading && categories && (
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          )}

          {/* Loading state — skeleton grid */}
          {imagesLoading && (
            <div className="columns-2 sm:columns-2 lg:columns-3 gap-3 sm:gap-5 space-y-3 sm:space-y-5">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="break-inside-avoid">
                  <SkeletonCard aspectClass={getMasonryClass(i)} />
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {imagesError && (
            <div className="text-center py-12">
              <p className="text-destructive">Error loading images: {imagesError.message}</p>
            </div>
          )}

          {/* Empty state */}
          {!imagesLoading && sortedImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {activeCategory ? 'No images in this category yet.' : 'No images uploaded yet.'}
              </p>
              {isAuthenticated && (
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Upload First Image
                </button>
              )}
            </div>
          )}

          {/* Masonry Image Grid */}
          {!imagesLoading && sortedImages.length > 0 && (
            <div className="columns-2 sm:columns-2 lg:columns-3 gap-3 sm:gap-5 space-y-3 sm:space-y-5">
              {sortedImages.map((image, index) => (
                <div
                  key={image.id}
                  className="break-inside-avoid"
                  draggable={isAuthenticated}
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  {/* Override ImageCard's fixed aspect-square with masonry aspect */}
                  <div className={`${getMasonryClass(index)} relative overflow-hidden rounded-xl ${isAuthenticated ? 'cursor-grab active:cursor-grabbing' : ''}`}>
                    <ImageCard
                      image={image}
                      index={index}
                      onClick={() => { if (!isDragging) handleImageClick(index); }}
                      onEdit={isAuthenticated ? () => handleEditImage(image) : undefined}
                      onDelete={isAuthenticated ? () => handleEditImage(image) : undefined}
                      isDraggable={isAuthenticated}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImageIndex !== null && lightboxImages.length > 0 && (
        <ImageLightbox
          images={lightboxImages}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}

      {/* Upload Modal */}
      <ImageUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        categories={categories || []}
      />

      {/* Edit Modal */}
      <ImageEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setImageToEdit(null);
        }}
        image={imageToEdit}
        categories={categories || []}
      />

      <BackToTop />
    </div>
  );
};

export default Portfolio;
