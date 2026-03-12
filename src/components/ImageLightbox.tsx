import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface ImageLightboxProps {
  images: { img: string; title: string; category: string; desc: string }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageLightbox = ({ images, currentIndex, onClose, onNext, onPrev }: ImageLightboxProps) => {
  const current = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-foreground hover:text-primary transition-colors z-10"
          aria-label="Close lightbox"
        >
          <X size={24} className="sm:w-8 sm:h-8" />
        </button>

        {/* Previous button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-1 sm:left-4 text-foreground hover:text-primary transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} className="sm:w-12 sm:h-12" />
          </button>
        )}

        {/* Next button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-1 sm:right-4 text-foreground hover:text-primary transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={32} className="sm:w-12 sm:h-12" />
          </button>
        )}

        {/* Image and info */}
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-5xl w-full mx-8 sm:mx-16"
        >
          <img
            src={current.img}
            alt={current.title}
            className="w-full h-auto max-h-[55vh] sm:max-h-[70vh] object-contain rounded-lg mb-3 sm:mb-4"
          />
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
            <span className="text-primary font-body text-[10px] sm:text-xs uppercase tracking-wider">
              {current.category}
            </span>
            <h2 className="font-display text-xl sm:text-3xl text-foreground mt-1">{current.title}</h2>
            <p className="text-muted-foreground font-body text-xs sm:text-base mt-2 sm:mt-3">{current.desc}</p>
            {images.length > 1 && (
              <p className="text-muted-foreground font-body text-xs sm:text-sm mt-3 sm:mt-4">
                {currentIndex + 1} / {images.length}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageLightbox;
