import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";
import BackToTop from "@/components/BackToTop";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ImageCard } from "@/components/ImageCard";
import { ImageUploadModal } from "@/components/ImageUploadModal";
import { ImageEditModal } from "@/components/ImageEditModal";
import { useAuth } from "@/contexts/AuthContext";
import { useImages } from "@/hooks/useImages";
import { useCategories } from "@/hooks/useCategories";
import { ImageResponseDto } from "@/types/image";

const Portfolio = () => {
  const { isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [imageToEdit, setImageToEdit] = useState<ImageResponseDto | null>(null);

  // Fetch images and categories (exclude artist portraits)
  const { data: images, isLoading: imagesLoading, error: imagesError } = useImages({
    categoryId: activeCategory || undefined,
    artistPortrait: false, // Explicitly exclude artist portraits
  });
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  // Filter images by category
  const filteredImages = activeCategory
    ? (images || []).filter((img) => img.categoryId === activeCategory)
    : (images || []);

  // Sort images by order
  const sortedImages = [...filteredImages].sort((a, b) => a.order - b.order);

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
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl sm:text-6xl md:text-8xl font-bold text-foreground"
            >
              Port<span className="text-gradient">folio</span>
            </motion.h1>
            
            {/* Upload button (admin only) - moved to top */}
            {isAuthenticated && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => setIsUploadModalOpen(true)}
                className="p-3 sm:p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
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

          {/* Loading state */}
          {imagesLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading images...</p>
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

          {/* Image Grid */}
          {!imagesLoading && sortedImages.length > 0 && (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {sortedImages.map((image, index) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  index={index}
                  onClick={() => handleImageClick(index)}
                  onEdit={isAuthenticated ? () => handleEditImage(image) : undefined}
                  onDelete={isAuthenticated ? () => handleEditImage(image) : undefined}
                  isDraggable={isAuthenticated}
                />
              ))}
            </motion.div>
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
