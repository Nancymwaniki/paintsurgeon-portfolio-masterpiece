import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioHouse from "@/assets/house.png";
import portfolioMural from "@/assets/branding.jpeg";
import portfolioLogos from "@/assets/logos.png";
import portfolioIllustration from "@/assets/illustration.png";
import logo1 from "@/assets/logos/WhatsApp Image 2026-03-09 at 5.20.04 PM.jpeg";
import logo2 from "@/assets/logos/WhatsApp Image 2026-03-09 at 5.21.08 PM.jpeg";
import logo3 from "@/assets/logos/WhatsApp Image 2026-03-09 at 5.25.05 PM.jpeg";
import logo4 from "@/assets/logos/WhatsApp Image 2026-03-09 at 5.25.41 PM.jpeg";
import logo5 from "@/assets/logos/WhatsApp Image 2026-03-09 at 5.26.40 PM.jpeg";
import logo6 from "@/assets/logos/WhatsApp Image 2026-03-09 at 5.27.32 PM.jpeg";
import branding1 from "@/assets/branding/Screenshot 2026-03-09 220416.png";
import branding2 from "@/assets/branding/Screenshot 2026-03-09 220449.png";
import branding3 from "@/assets/branding/Screenshot 2026-03-09 220517.png";
import branding4 from "@/assets/branding/Screenshot 2026-03-09 220540.png";
import branding5 from "@/assets/branding/Screenshot 2026-03-09 220559.png";
import branding6 from "@/assets/branding/Screenshot 2026-03-09 220623.png";
import branding7 from "@/assets/branding/Screenshot 2026-03-09 220709.png";
import branding8 from "@/assets/branding/Screenshot 2026-03-09 220727.png";
import branding9 from "@/assets/branding/Screenshot 2026-03-09 220750.png";
import illustration1 from "@/assets/illustrations/Screenshot 2026-03-09 223359.png";
import illustration2 from "@/assets/illustrations/Screenshot 2026-03-09 223425.png";
import illustration3 from "@/assets/illustrations/Screenshot 2026-03-09 223446.png";
import illustration4 from "@/assets/illustrations/Screenshot 2026-03-09 223533.png";
import illustration5 from "@/assets/illustrations/Screenshot 2026-03-09 223610.png";
import house1 from "@/assets/houses/Screenshot 2026-03-09 224441.png";
import house2 from "@/assets/houses/Screenshot 2026-03-09 224757.png";
import house3 from "@/assets/houses/Screenshot 2026-03-09 224851.png";
import house4 from "@/assets/houses/Screenshot 2026-03-09 225008.png";
import house5 from "@/assets/houses/Screenshot 2026-03-09 225154.png";

const categories = ["All", "House Painting", "Branding", "Logos", "Illustrations"];

const projects = [
  { img: portfolioHouse, title: "Modern Living Room", category: "House Painting", desc: "Complete interior transformation with warm earth tones." },
  { img: portfolioMural, title: "Branded Uniforms Collection", category: "Branding", desc: "Custom branded uniforms and apparel for businesses across Kenya." },
  { img: portfolioLogos, title: "Brand Identity Collection", category: "Logos", desc: "Logo designs for various businesses across Kenya." },
  { img: portfolioIllustration, title: "African Art Series", category: "Illustrations", desc: "Digital illustrations inspired by African heritage and tradition." },
  { img: house1, title: "House Painting 1", category: "House Painting", desc: "Professional interior and exterior painting services." },
  { img: branding1, title: "Corporate Branding 1", category: "Branding", desc: "Professional branded merchandise and corporate identity solutions." },
  { img: logo1, title: "Logo Design 1", category: "Logos", desc: "Professional logo design showcasing creative branding solutions." },
  { img: illustration1, title: "Illustration Design 1", category: "Illustrations", desc: "Creative digital illustration showcasing artistic vision." },
  { img: house2, title: "House Painting 2", category: "House Painting", desc: "Quality residential painting with attention to detail." },
  { img: branding2, title: "Corporate Branding 2", category: "Branding", desc: "Custom branded apparel for business teams and events." },
  { img: logo2, title: "Logo Design 2", category: "Logos", desc: "Custom logo design tailored to client brand identity." },
  { img: illustration2, title: "Illustration Design 2", category: "Illustrations", desc: "Custom illustration with unique artistic style." },
  { img: house3, title: "House Painting 3", category: "House Painting", desc: "Expert house painting for beautiful home transformations." },
  { img: branding3, title: "Corporate Branding 3", category: "Branding", desc: "Branded uniforms and promotional materials." },
  { img: logo3, title: "Logo Design 3", category: "Logos", desc: "Modern logo design with unique visual elements." },
  { img: illustration3, title: "Illustration Design 3", category: "Illustrations", desc: "Professional illustration for creative projects." },
  { img: house4, title: "House Painting 4", category: "House Painting", desc: "Premium painting services for residential properties." },
  { img: branding4, title: "Corporate Branding 4", category: "Branding", desc: "Professional branding solutions for corporate clients." },
  { img: logo4, title: "Logo Design 4", category: "Logos", desc: "Creative branding solution for business identity." },
  { img: illustration4, title: "Illustration Design 4", category: "Illustrations", desc: "Artistic illustration with attention to detail." },
  { img: house5, title: "House Painting 5", category: "House Painting", desc: "Professional home painting with lasting results." },
  { img: branding5, title: "Corporate Branding 5", category: "Branding", desc: "Custom branded merchandise and apparel design." },
  { img: logo5, title: "Logo Design 5", category: "Logos", desc: "Professional logo design with attention to detail." },
  { img: illustration5, title: "Illustration Design 5", category: "Illustrations", desc: "Digital illustration showcasing creative expertise." },
  { img: branding6, title: "Corporate Branding 6", category: "Branding", desc: "Business branding and promotional materials." },
  { img: logo6, title: "Logo Design 6", category: "Logos", desc: "Distinctive logo design for brand recognition." },
  { img: branding7, title: "Corporate Branding 7", category: "Branding", desc: "Branded uniforms and corporate identity solutions." },
  { img: branding8, title: "Corporate Branding 8", category: "Branding", desc: "Professional branded apparel and merchandise." },
  { img: branding9, title: "Corporate Branding 9", category: "Branding", desc: "Custom branding solutions for businesses." },
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
                  href="https://wa.me/254704459870?text=Hi%20Paintsurgeon!%20I'm%20interested%20in%20this%20project%20from%20your%20portfolio%20and%20would%20like%20to%20inquire%20about%20similar%20work."
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
