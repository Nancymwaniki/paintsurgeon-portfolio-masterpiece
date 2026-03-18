import { motion } from "framer-motion";
import { ArrowRight, Award, Clock, Users, Upload, Trash2, CheckCircle2, Brush, Zap, Shield, Star, Eye, Heart, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { useImages, useDeleteImage } from "@/hooks/useImages";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { ArtistPortraitUploadModal } from "@/components/ArtistPortraitUploadModal";
import { useCategories } from "@/hooks/useCategories";

const stats = [
  { icon: Award, value: "500+", label: "Projects Completed" },
  { icon: Clock, value: "10+", label: "Years Experience" },
  { icon: Users, value: "300+", label: "Happy Clients" },
];

const whyChoose = [
  {
    icon: Brush,
    title: "Dedicated Craftsmanship",
    desc: "Every project receives our full, undivided attention — no outsourcing, no shortcuts. You work directly with us from start to finish.",
  },
  {
    icon: Eye,
    title: "Eye for Detail",
    desc: "Precision is everything. Whether it's a clean wall edge or a pixel-perfect logo, the details are never overlooked.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    desc: "We work efficiently and communicate clearly, so your project moves forward without unnecessary delays.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    desc: "Work doesn't leave our hands until it meets the standard. If it's not right, we fix it — no questions asked.",
  },
  {
    icon: Star,
    title: "10+ Years of Craft",
    desc: "Over a decade of hands-on experience across painting, branding, and design means you get seasoned expertise every time.",
  },
  {
    icon: CheckCircle2,
    title: "Honest Pricing",
    desc: "Transparent quotes with no hidden costs. You know exactly what you're paying for before any work begins.",
  },
];

const coreValues = [
  {
    icon: Heart,
    title: "Passion",
    desc: "Art isn't just a job — it's a calling. Every project is approached with genuine enthusiasm and love for the craft.",
  },
  {
    icon: Shield,
    title: "Integrity",
    desc: "Honest communication, fair pricing, and delivering exactly what was promised. No shortcuts, no surprises.",
  },
  {
    icon: Star,
    title: "Excellence",
    desc: "Good enough is never good enough. The standard is always the best possible outcome for every client.",
  },
  {
    icon: Lightbulb,
    title: "Creativity",
    desc: "Every brief is a blank canvas. Fresh ideas and original thinking go into every project, big or small.",
  },
];

const About = () => {
  const { isAuthenticated } = useAuth();
  const { data: images } = useImages({ artistPortrait: true });
  const { data: categories } = useCategories();
  const { mutate: deleteImage } = useDeleteImage();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const artistImage = images?.[0];
  const artistImageUrl = artistImage
    ? (artistImage.url?.startsWith('http')
        ? artistImage.url
        : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3000'}${artistImage.url}`)
    : null;

  const handleDeletePortrait = () => {
    if (artistImage && window.confirm('Are you sure you want to delete this artist portrait?')) {
      deleteImage(artistImage.id);
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero — The Artist */}
      <section className="py-12 sm:py-16 md:py-24 relative">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-md mx-auto lg:max-w-none group shadow-2xl">
              {artistImageUrl ? (
                <>
                  <img src={artistImageUrl} alt="The artist behind Paintsurgeon" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
                  {isAuthenticated && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10">
                      <button onClick={() => setIsUploadModalOpen(true)} className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-lg" title="Replace portrait">
                        <Upload size={20} />
                      </button>
                      <button onClick={handleDeletePortrait} className="p-3 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors shadow-lg" title="Delete portrait">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-muted via-muted/80 to-muted/50 flex items-center justify-center border border-border">
                  {isAuthenticated ? (
                    <button onClick={() => setIsUploadModalOpen(true)} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors z-10">
                      <Upload size={48} />
                      <span className="text-sm">Upload Artist Portrait</span>
                    </button>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50" />
                  )}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-foreground mb-4 sm:mb-6">
              The <span className="text-gradient">Artist</span>
            </h1>
            <div className="space-y-4 text-muted-foreground font-body text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              <p>
                Paintsurgeon Painting Services is a creative business born from a deep passion for art, color, and transformation. Based in Kenya, we've spent over a decade turning blank walls into masterpieces and building brands that stand out.
              </p>
              <p>
                From residential house painting to clothes branding, from logo design to full brand identities — we bring the same level of precision, creativity, and dedication to every project.
              </p>
              <p>
                Our mission is simple: to deliver exceptional quality that speaks for itself. Every brush stroke, every pixel, every design is crafted with purpose.
              </p>
            </div>
            <Button asChild size="lg" className="font-ui bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <Link to="/contact">Work With Us <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 bg-card relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center bg-gradient-to-br from-muted via-muted to-muted/50 rounded-2xl p-6 sm:p-8 border border-border hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon size={28} className="text-primary" />
                </div>
                <p className="font-display text-3xl sm:text-5xl text-foreground mb-2">{s.value}</p>
                <p className="text-muted-foreground font-body text-xs sm:text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Paintsurgeon */}
      <section className="py-12 sm:py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <SectionHeading title="Why Choose Paintsurgeon" subtitle="What sets us apart from the rest" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-gradient-to-br from-muted via-muted to-muted/50 rounded-2xl p-5 sm:p-6 border border-border hover:border-primary/40 transition-all hover:shadow-xl group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display text-lg sm:text-xl text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground font-body text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-16 md:py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <SectionHeading title="Core Values" subtitle="The principles behind every project" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {coreValues.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-gradient-to-br from-muted via-muted to-muted/50 rounded-2xl p-5 sm:p-6 border border-border hover:border-primary/40 transition-all hover:shadow-xl group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <v.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display text-lg sm:text-xl text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground font-body text-xs sm:text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-12 sm:py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <SectionHeading title="Skills & Expertise" />
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
            {["House Painting", "Interior Design", "Exterior Painting", "Clothes Branding", "Logo Design", "Branding", "Graphic Design", "Illustration", "Custom Drawings", "Color Consultation"].map((skill) => (
              <span
                key={skill}
                className="font-ui text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border bg-gradient-to-br from-muted to-muted/50 text-foreground hover:border-primary/50 hover:shadow-md transition-all hover:scale-105 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-card relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground mb-4">
            Ready to <span className="text-gradient">Create?</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Whether it's a wall, a logo, or a full brand — let's make something worth talking about.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button asChild size="lg" className="font-ui bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <Link to="/contact">Get in Touch <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-ui border-foreground/20 text-foreground hover:bg-foreground/10">
              <Link to="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <ArtistPortraitUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        categories={categories || []}
      />
    </div>
  );
};

export default About;
