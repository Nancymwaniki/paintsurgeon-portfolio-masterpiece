import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeading = ({ title, subtitle, className = "" }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`text-center mb-12 ${className}`}
  >
    <h2 className="font-display text-5xl md:text-6xl text-foreground">{title}</h2>
    {subtitle && (
      <p className="text-muted-foreground font-body mt-3 text-lg max-w-2xl mx-auto">{subtitle}</p>
    )}
    <div className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
  </motion.div>
);

export default SectionHeading;
