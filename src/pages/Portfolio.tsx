import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioHouse from "@/assets/portfolio-house.jpg";
import portfolioMural from "@/assets/portfolio-mural.jpg";
import portfolioLogos from "@/assets/logos.png";
import portfolioIllustration from "@/assets/portfolio-illustration.jpg";
import logo1 from "@/assets/logos/WhatsApp Image 2026-03-09 at 5.20.04 PM.jpeg";
import logo2 from "@/assets/logos/WhatsApp Image 2026-03-09 at 5.21.08 PM.jpeg";
import logo3 from "@/assets/logos/WhatsApp Image 2026-03-09 at 5.25.05 PM.jpeg";
import logo4 from "@/assets/logos/WhatsApp Image 2026-03-09 at 5.25.41 PM.jpeg";
import logo5 from "@/assets/logos/WhatsApp Image 2026-03-09 at 5.26.40 PM.jpeg";
import logo6 from "@/assets/logos/WhatsApp Image 2026-03-09 at 5.27.32 PM.jpeg";

const categories = ["All", "House Painting", "Branding", "Logos", "Illustrations"];

const projects = [
  { img: portfolioHouse, title: "Modern Living Room", category: "House Painting", desc: "Complete interior transformation with warm earth tones." },
  { img: portfolioMural, title: "Cultural Heritage Mural", category: "Murals", desc: "Large-scale African-inspired mural celebrating Kenyan culture." },
  { img: portfolioLogos, title: "Brand Identity Collection", category: "Logos", desc: "Logo designs for various businesses across Kenya." },
  { img: logo1, title: "Logo Design 1", category: "Logos", desc: "Professional logo design showcasing creative branding solutions." },
  { img: logo2, title: "Logo Design 2", category: "Logos", desc: "Custom logo design tailored to client brand identity." },
  { img: logo3, title: "Logo Design 3", category: "Logos", desc: "Modern logo design with unique visual elements." },
  { img: logo4, title: "Logo Design 4", category: "Logos", desc: "Creative branding solution for business identity." },
  { img: logo5, title: "Logo Design 5", category: "Logos", desc: "Professional logo design with attention to detail." },
  { img: logo6, title: "Logo Design 6", category: "Logos", desc: "Distinctive logo design for brand recognition." },
  { img: portfolioIllustration, title: "African Art Series", category: "Illustrations", desc: "Digital illustrations inspired by African heritage and tradition." },
  { img: portfolioHouse, title: "Residential Exterior", category: "House Painting", desc: "Full exterior repaint with weather-resistant premium paint." },
  { img: portfolioMural, title: "Office Feature Wall", category: "Murals", desc: "Bold artistic mural for a corporate office space." },
];

const Portfolio = () => {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen pt-20">
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-8xl text-center text-foreground mb-12"
          >
            PORT<span className="text-gradient">FOLIO</span>
          </motion.h1>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-body text-sm px-5 py-2 rounded-full border transition-all ${
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
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.title + i}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelected(p)}
                  className="group cursor-pointer relative overflow-hidden rounded-lg aspect-square"
                >
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <div>
                      <span className="text-primary font-body text-xs uppercase tracking-wider">{p.category}</span>
                      <h3 className="font-display text-2xl text-foreground">{p.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-lg overflow-hidden max-w-2xl w-full"
            >
              <img src={selected.img} alt={selected.title} className="w-full aspect-video object-cover" />
              <div className="p-6">
                <span className="text-primary font-body text-xs uppercase tracking-wider">{selected.category}</span>
                <h2 className="font-display text-4xl text-foreground mt-1">{selected.title}</h2>
                <p className="text-muted-foreground font-body mt-3">{selected.desc}</p>
                <a
                  href="https://wa.me/254704459870"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 font-body text-sm bg-primary text-primary-foreground px-6 py-2.5 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Inquire About This Project
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
