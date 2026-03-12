import { motion } from "framer-motion";
import { ArrowRight, Award, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import artistPortrait from "@/assets/artist-portrait.jpeg";

const stats = [
  { icon: Award, value: "500+", label: "Projects Completed" },
  { icon: Clock, value: "10+", label: "Years Experience" },
  { icon: Users, value: "300+", label: "Happy Clients" },
];

const About = () => (
  <div className="min-h-screen pt-16 sm:pt-20">
    <section className="py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative rounded-lg overflow-hidden aspect-[3/4] max-w-md mx-auto lg:max-w-none">
            <img src={artistPortrait} alt="The artist behind Paintsurgeon" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
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
          <div className="space-y-3 sm:space-y-4 text-muted-foreground font-body text-sm sm:text-base leading-relaxed">
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
          <Button asChild size="lg" className="mt-6 sm:mt-8 font-ui bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/contact">Work With Us <ArrowRight className="ml-2" size={18} /></Link>
          </Button>
        </motion.div>
      </div>
    </section>

    <section className="py-12 sm:py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <s.icon size={28} className="sm:w-8 sm:h-8 mx-auto text-primary mb-2 sm:mb-3" />
              <p className="font-display text-3xl sm:text-5xl text-foreground">{s.value}</p>
              <p className="text-muted-foreground font-body text-xs sm:text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <SectionHeading title="Skills & Expertise" />
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
          {["House Painting", "Interior Design", "Exterior Painting", "Clothes Branding", "Logo Design", "Branding", "Graphic Design", "Illustration", "Custom Drawings", "Color Consultation"].map((skill) => (
            <span
              key={skill}
              className="font-ui text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border bg-muted text-foreground hover:border-primary/50 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
