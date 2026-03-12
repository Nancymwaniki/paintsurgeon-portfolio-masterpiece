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
    className={`text-center mb-8 sm:mb-12 ${className}`}
  >
    <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-foreground">{title}</h2>
    {subtitle && (
      <p className="text-muted-foreground font-body mt-2 sm:mt-3 text-sm sm:text-lg max-w-2xl mx-auto">{subtitle}</p>
    )}
    <div className="mt-3 sm:mt-4 mx-auto w-16 sm:w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
  </motion.div>
);

export default SectionHeading;
