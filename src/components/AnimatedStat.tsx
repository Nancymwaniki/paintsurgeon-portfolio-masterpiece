import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import { LucideIcon } from 'lucide-react';

interface AnimatedStatProps {
  icon: LucideIcon;
  /** Numeric value to count up to */
  numericValue: number;
  /** Non-numeric display value (used when value isn't a simple number, e.g. "Nairobi") */
  staticValue?: string;
  /** Suffix appended after the number, e.g. "+" */
  suffix?: string;
  label: string;
  delay?: number;
}

export const AnimatedStat: React.FC<AnimatedStatProps> = ({
  icon: Icon,
  numericValue,
  staticValue,
  suffix = '',
  label,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const countDisplay = useCountUp(numericValue, 1800, suffix, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-3 sm:gap-4 justify-center lg:justify-start"
    >
      <div className="p-2.5 bg-primary/10 rounded-full flex-shrink-0">
        <Icon size={20} className="text-primary" />
      </div>
      <div>
        <p className="font-display text-2xl sm:text-3xl text-foreground leading-none tabular-nums">
          {staticValue ?? countDisplay}
        </p>
        <p className="font-ui text-xs text-muted-foreground uppercase tracking-wide mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
};
