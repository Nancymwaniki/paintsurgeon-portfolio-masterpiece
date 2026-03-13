import { useState } from "react";
import { motion } from "framer-motion";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

const ImageWithLoader = ({ src, alt, className = "", loading = "lazy" }: ImageWithLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      {hasError && (
        <div className="absolute inset-0 bg-destructive/10 flex items-center justify-center">
          <p className="text-xs text-destructive">Failed to load</p>
        </div>
      )}
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        className={className}
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          console.error('Image failed to load:', src);
          setHasError(true);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default ImageWithLoader;
