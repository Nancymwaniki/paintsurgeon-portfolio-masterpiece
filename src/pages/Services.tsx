import { motion } from "framer-motion";
import { Home, Paintbrush, PaintBucket, Layers, PenTool, Palette, Image, Pencil, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const physicalServices = [
  { 
    icon: Home, 
    title: "House Painting", 
    desc: "Complete interior and exterior house painting with premium paints and expert finishes.",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  { 
    icon: PaintBucket, 
    title: "Interior Painting", 
    desc: "Transform your living spaces with carefully chosen colors and flawless application.",
    color: "from-purple-500/20 to-pink-500/20"
  },
  { 
    icon: Layers, 
    title: "Exterior Painting", 
    desc: "Weather-resistant exterior painting that protects and beautifies your property.",
    color: "from-green-500/20 to-emerald-500/20"
  },
  { 
    icon: Paintbrush, 
    title: "Clothes Branding", 
    desc: "Custom branding for uniforms, t-shirts, merchandise, and apparel with professional finishes.",
    color: "from-orange-500/20 to-red-500/20"
  },
];

const digitalServices = [
  { 
    icon: PenTool, 
    title: "Logo Design", 
    desc: "Distinctive logos that capture your brand's essence and make a lasting impression.",
    color: "from-indigo-500/20 to-purple-500/20"
  },
  { 
    icon: Palette, 
    title: "Branding", 
    desc: "Complete brand identity packages including color palettes, typography, and guidelines.",
    color: "from-pink-500/20 to-rose-500/20"
  },
  { 
    icon: Image, 
    title: "Graphic Design", 
    desc: "Marketing materials, social media graphics, and visual content that stands out.",
    color: "from-yellow-500/20 to-orange-500/20"
  },
  { 
    icon: Pencil, 
    title: "Illustrations & Drawings", 
    desc: "Custom illustrations and hand-drawn artwork for any purpose.",
    color: "from-teal-500/20 to-cyan-500/20"
  },
];

const ServiceCard = ({ service, index }: { service: typeof physicalServices[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
  >
    {/* Gradient background */}
    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    
    {/* Content */}
    <div className="relative p-6 sm:p-8">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <service.icon size={28} className="sm:w-8 sm:h-8 text-primary group-hover:scale-110 transition-transform" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl sm:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
            {service.title}
          </h3>
        </div>
      </div>
      <p className="text-muted-foreground font-body text-sm sm:text-base leading-relaxed">
        {service.desc}
      </p>
      
      {/* Hover arrow */}
      <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-sm font-medium">Learn more</span>
        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </motion.div>
);

const Services = () => {
  return (
    <div className="min-h-screen pt-16 sm:pt-20">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles size={16} />
              <span>What We Offer</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            
            <p className="text-muted-foreground font-body text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              From transforming physical spaces with paint to creating digital brand identities that leave a lasting impression.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Physical Services */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              Physical <span className="text-gradient">Services</span>
            </h2>
            <p className="text-muted-foreground font-body text-sm sm:text-base max-w-2xl mx-auto">
              Hands-on painting and artistic craftsmanship for homes, businesses, and custom apparel.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {physicalServices.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Digital Services */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              Digital <span className="text-gradient">Creative</span>
            </h2>
            <p className="text-muted-foreground font-body text-sm sm:text-base max-w-2xl mx-auto">
              Design solutions to build and strengthen your brand identity in the digital world.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {digitalServices.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Ready to Get <span className="text-gradient">Started?</span>
          </h2>
          <p className="text-muted-foreground font-body text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Let's bring your vision to life. Whether it's painting your space or designing your brand, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-ui text-base">
              <Link to="/portfolio">
                View Our Work <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-ui text-base">
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
