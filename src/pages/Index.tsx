import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Paintbrush, Palette, PenTool, Home as HomeIcon, Star, MessageCircle, Pencil, CheckCircle, MapPin, Phone, Award, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";
import ImageWithLoader from "@/components/ImageWithLoader";
import BackToTop from "@/components/BackToTop";
import { useImages } from "@/hooks/useImages";

const services = [
  { icon: HomeIcon, title: "House Painting", desc: "Interior & exterior painting that transforms your space." },
  { icon: Paintbrush, title: "Branding", desc: "Custom branding for clothes, merchandise, and businesses." },
  { icon: Palette, title: "Branding & Logos", desc: "Creative brand identity and logo design." },
  { icon: PenTool, title: "Illustrations", desc: "Custom illustrations and graphic design." },
];

const stats = [
  { icon: Award, value: "500+", label: "Projects Completed" },
  { icon: Clock, value: "10+", label: "Years Experience" },
  { icon: Users, value: "300+", label: "Happy Clients" },
  { icon: MapPin, value: "Nairobi", label: "Based in Kenya" },
];

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Consult",
    desc: "Tell us what you need. We listen, ask the right questions, and understand your vision before anything else.",
  },
  {
    number: "02",
    icon: Pencil,
    title: "Create",
    desc: "We get to work — whether that's picking up a brush or opening a design tool. Every detail is crafted with care.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Deliver",
    desc: "You receive the finished work. We don't hand it over until it meets the standard we've set for every project.",
  },
];

const testimonials = [
  { name: "Jane M.", text: "Paintsurgeon completely transformed our home. The attention to detail was incredible!", rating: 5 },
  { name: "David K.", text: "Best logo designer in Kenya. Professional, creative, and delivered on time.", rating: 5 },
  { name: "Sarah W.", text: "The branding they did for our uniforms and merchandise is absolutely stunning. Highly recommend!", rating: 5 },
  { name: "Peter O.", text: "From the first consultation to the final delivery, the experience was seamless. Truly professional.", rating: 5 },
  { name: "Amina R.", text: "Our office walls look incredible. The color choices and finish exceeded our expectations.", rating: 5 },
  { name: "Brian N.", text: "Got our company logo done here. Clean, modern, and exactly what we envisioned. Will be back.", rating: 5 },
];

const Index = () => {
  const { data: featuredImages } = useImages({ featured: true, limit: 10 });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithLoader src={heroBg} alt="Paintsurgeon hero artwork" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
          >
            <span className="text-gradient">PAINTSURGEON PAINTING SERVICES</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-sm sm:text-base md:text-xl text-destructive-foreground max-w-2xl mx-auto px-2 mt-4 sm:mt-6"
          >
            Professional painting services & creative design solutions in Kenya. From walls to brands — we bring your vision to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
          >
            <Button asChild size="lg" className="font-ui text-sm sm:text-base bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/portfolio">View Our Work <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-ui text-sm sm:text-base border-foreground/20 text-foreground hover:bg-foreground/10">
              <a href="https://wa.me/254704459870?text=Hi%20Paintsurgeon!%20I'd%20like%20to%20get%20a%20quote%20for%20your%20services." target="_blank" rel="noopener noreferrer">Get a Quote</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 sm:py-10 bg-card border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start"
              >
                <div className="p-2.5 bg-primary/10 rounded-full flex-shrink-0">
                  <s.icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-display text-xl sm:text-2xl text-foreground leading-none">{s.value}</p>
                  <p className="font-ui text-xs text-muted-foreground uppercase tracking-wide mt-0.5">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 sm:py-16 md:py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <SectionHeading title="Our Services" subtitle="From physical painting to digital creativity" />
          <p className="text-center text-muted-foreground font-body text-sm sm:text-base mb-8 max-w-3xl mx-auto">
            We specialize in transforming spaces and creating memorable brands. Whether it's painting your home or designing your company's visual identity, we bring expertise and creativity to every project.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gradient-to-br from-muted via-muted to-muted/50 rounded-xl p-5 sm:p-6 border border-border hover:border-primary/50 transition-all hover:scale-105 hover:shadow-xl group"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <s.icon size={28} className="text-primary group-hover:text-secondary transition-colors" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground font-body text-xs sm:text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-10">
            <Button asChild variant="outline" className="font-ui border-foreground/20 text-foreground hover:bg-foreground/10 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <Link to="/services">All Services <ArrowRight className="ml-2" size={16} /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <SectionHeading title="Featured Work" subtitle="A glimpse into our creative portfolio" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {featuredImages && featuredImages.length > 0 ? (
              featuredImages.map((image, i) => {
                const imageUrl = image.url?.startsWith('http')
                  ? image.url
                  : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3000'}${image.url}`;
                return (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-xl hover:shadow-2xl transition-shadow"
                  >
                    <ImageWithLoader src={imageUrl} alt={image.title || 'Featured work'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                      <div>
                        {image.category && <span className="text-primary font-body text-xs uppercase tracking-wider">{image.category.name}</span>}
                        {image.title && <h3 className="font-display text-xl sm:text-3xl text-foreground">{image.title}</h3>}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>No featured images yet. Mark images as featured in the admin dashboard.</p>
              </div>
            )}
          </div>
          <div className="text-center mt-8 sm:mt-10">
            <Button asChild className="font-ui bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <Link to="/portfolio">View Full Portfolio <ArrowRight className="ml-2" size={16} /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <SectionHeading title="How It Works" subtitle="Simple, straightforward, no surprises" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-gradient-to-br from-muted via-muted to-muted/50 rounded-xl p-5 sm:p-6 border border-border hover:border-primary/50 transition-all hover:shadow-xl group flex flex-col items-center text-center relative"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <step.icon size={28} className="text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 font-display text-xs text-primary bg-primary/10 border border-primary/20 rounded-full w-6 h-6 flex items-center justify-center">
                    {step.number.replace('0', '')}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground font-body text-sm sm:text-base leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10 sm:mt-12">
            <Button asChild size="lg" className="font-ui bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <a href="https://wa.me/254704459870?text=Hi%20Paintsurgeon!%20I'd%20like%20to%20get%20started." target="_blank" rel="noopener noreferrer">
                Get Started <ArrowRight className="ml-2" size={18} />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <SectionHeading title="What Clients Say" subtitle="500+ happy clients across Kenya" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-gradient-to-br from-muted via-muted to-muted/50 rounded-xl p-5 sm:p-6 border border-border hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="sm:w-4 sm:h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground font-body text-xs sm:text-sm leading-relaxed mb-4">"{t.text}"</p>
                <p className="text-primary font-body text-xs sm:text-sm font-semibold">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location / Serving strip */}
      <section className="py-10 sm:py-12 bg-card border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-primary/5 pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                <MapPin size={18} className="text-primary" />
                <span className="font-display text-xl sm:text-2xl text-foreground uppercase">Nairobi, Kenya</span>
              </div>
              <p className="text-muted-foreground font-body text-sm">
                Serving clients across Nairobi and beyond — painting, branding, and design delivered to your door.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline" className="font-ui border-foreground/20 text-foreground hover:bg-foreground/10">
                <a href="https://wa.me/254704459870" target="_blank" rel="noopener noreferrer">
                  <Phone size={16} className="mr-2" />+254 704 459 870
                </a>
              </Button>
              <Button asChild className="font-ui bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/contact">Send a Message <ArrowRight className="ml-2" size={16} /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 relative"
        >
          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-bold text-foreground mb-4">
            Let's Create <span className="text-gradient">Together</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
            Ready to transform your space or brand? Get in touch today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Button asChild size="lg" className="font-ui bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <a href="https://wa.me/254704459870?text=Hi%20Paintsurgeon!%20I'm%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20my%20project." target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-ui border-foreground/20 text-foreground hover:bg-foreground/10 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <Link to="/contact">Contact Form</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <BackToTop />
    </div>
  );
};

export default Index;
