import { motion } from "framer-motion";
import { Home, Paintbrush, PaintBucket, Layers, PenTool, Palette, Image, Pencil } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const physicalServices = [
  { icon: Home, title: "House Painting", desc: "Complete interior and exterior house painting with premium paints and expert finishes." },
  { icon: PaintBucket, title: "Interior Painting", desc: "Transform your living spaces with carefully chosen colors and flawless application." },
  { icon: Layers, title: "Exterior Painting", desc: "Weather-resistant exterior painting that protects and beautifies your property." },
  { icon: Paintbrush, title: "Clothes Branding", desc: "Custom branding for uniforms, t-shirts, merchandise, and apparel with professional finishes." },
];

const digitalServices = [
  { icon: PenTool, title: "Logo Design", desc: "Distinctive logos that capture your brand's essence and make a lasting impression." },
  { icon: Palette, title: "Branding", desc: "Complete brand identity packages including color palettes, typography, and guidelines." },
  { icon: Image, title: "Graphic Design", desc: "Marketing materials, social media graphics, and visual content that stands out." },
  { icon: Pencil, title: "Illustrations & Drawings", desc: "Custom illustrations and hand-drawn artwork for any purpose." },
];

const ServiceCard = ({ service, index }: { service: typeof physicalServices[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-muted rounded-lg p-5 sm:p-8 border border-border hover:border-primary/50 transition-all group"
  >
    <service.icon size={32} className="sm:w-10 sm:h-10 text-primary mb-3 sm:mb-4 group-hover:text-secondary transition-colors" />
    <h3 className="font-display text-xl sm:text-3xl text-foreground mb-2 sm:mb-3">{service.title}</h3>
    <p className="text-muted-foreground font-body text-xs sm:text-sm leading-relaxed">{service.desc}</p>
  </motion.div>
);

const Services = () => (
  <div className="min-h-screen pt-16 sm:pt-20">
    <section className="py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl sm:text-6xl md:text-8xl text-center text-foreground mb-10 sm:mb-16"
        >
          Our <span className="text-gradient">Services</span>
        </motion.h1>

        <SectionHeading title="Physical Services" subtitle="Hands-on painting and artistic craftsmanship" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-24">
          {physicalServices.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        <SectionHeading title="Digital Creative" subtitle="Design solutions for your brand and business" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {digitalServices.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Services;
