import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Paintbrush, Palette, PenTool, Home as HomeIcon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";
import portfolioHouse from "@/assets/portfolio-house.jpg";
import portfolioMural from "@/assets/portfolio-mural.jpg";
import portfolioLogos from "@/assets/logos.png";
import portfolioIllustration from "@/assets/portfolio-illustration.jpg";

const services = [
  { icon: HomeIcon, title: "House Painting", desc: "Interior & exterior painting that transforms your space." },
  { icon: Paintbrush, title: "Branding", desc: "Custom branding for clothes, merchandise, and businesses." },
  { icon: Palette, title: "Branding & Logos", desc: "Creative brand identity and logo design." },
  { icon: PenTool, title: "Illustrations", desc: "Custom illustrations and graphic design." },
];

const projects = [
  { img: portfolioHouse, title: "Modern Interior", category: "House Painting" },
  { img: portfolioMural, title: "Branded Apparel", category: "Branding" },
  { img: portfolioLogos, title: "Brand Collection", category: "Logo Design" },
  { img: portfolioIllustration, title: "African Art Series", category: "Illustration" },
];

const testimonials = [
  { name: "Jane M.", text: "Paintsurgeon completely transformed our home. The attention to detail was incredible!", rating: 5 },
  { name: "David K.", text: "Best logo designer in Kenya. Professional, creative, and delivered on time.", rating: 5 },
  { name: "Sarah W.", text: "The mural they painted at our office is absolutely stunning. Highly recommend!", rating: 5 },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Paintsurgeon hero artwork" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl leading-none text-foreground"
          >
            PAINT<span className="text-gradient">SURGEON</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto"
          >
            Professional painting services & creative design solutions in Kenya.
            From walls to brands — we bring your vision to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="font-body text-base bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/portfolio">View Our Work <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-body text-base border-foreground/20 text-foreground hover:bg-foreground/10">
              <a href="https://wa.me/254704459870" target="_blank" rel="noopener noreferrer">Get a Quote</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading title="OUR SERVICES" subtitle="From physical painting to digital creativity" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-muted rounded-lg p-6 border border-border hover:border-primary/50 transition-colors group"
              >
                <s.icon size={36} className="text-primary mb-4 group-hover:text-secondary transition-colors" />
                <h3 className="font-display text-2xl text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground font-body text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="font-body border-foreground/20 text-foreground hover:bg-foreground/10">
              <Link to="/services">All Services <ArrowRight className="ml-2" size={16} /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading title="FEATURED WORK" subtitle="A glimpse into our creative portfolio" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-lg aspect-[4/3]"
              >
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <span className="text-primary font-body text-xs uppercase tracking-wider">{p.category}</span>
                    <h3 className="font-display text-3xl text-foreground">{p.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild className="font-body bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/portfolio">View Full Portfolio <ArrowRight className="ml-2" size={16} /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading title="WHAT CLIENTS SAY" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-muted rounded-lg p-6 border border-border"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground font-body text-sm leading-relaxed mb-4">"{t.text}"</p>
                <p className="text-primary font-body text-sm font-semibold">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-4">
            LET'S CREATE <span className="text-gradient">TOGETHER</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg mb-8 max-w-xl mx-auto">
            Ready to transform your space or brand? Get in touch today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-body bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="https://wa.me/254704459870" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-body border-foreground/20 text-foreground hover:bg-foreground/10">
              <Link to="/contact">Contact Form</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
