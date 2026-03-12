import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageWithLoader from "@/components/ImageWithLoader";
import ImageLightbox from "@/components/ImageLightbox";
import BackToTop from "@/components/BackToTop";
import { loadPortfolioProjects } from "@/utils/loadPortfolioImages";

const categories = ["All", "House Painting", "Branding", "Logos", "Illustrations"];

const projects = loadPortfolioProjects();

const Portfolio = () => {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  const handleNext = () => {
    if (selected !== null) {
      setSelected((selected + 1) % filtered.length);
    }
  };

  const handlePrev = () => {
    if (selected !== null) {
      setSelected((selected - 1 + filtered.length) % filtered.length);
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-6xl md:text-8xl font-bold text-center text-foreground mb-8 sm:mb-12"
          >
            Port<span className="text-gradient">folio</span>
          </motion.h1>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-ui text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border transition-all ${
                  active === cat
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.title + i}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelected(i)}
                  className="group cursor-pointer relative overflow-hidden rounded-lg aspect-square"
                >
                  <ImageWithLoader
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-5">
                    <div>
                      <span className="text-primary font-ui text-[10px] sm:text-xs uppercase tracking-wider">{p.category}</span>
                      <h3 className="font-display text-sm sm:text-2xl text-foreground">{p.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {selected !== null && (
        <ImageLightbox
          images={filtered}
          currentIndex={selected}
          onClose={() => setSelected(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}

      <BackToTop />
    </div>
  );
};

export default Portfolio;
