import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: { value: number; isPositive: boolean };
}

export const StatsCard = ({ title, value, icon: Icon, description, trend }: StatsCardProps) => (
  <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="font-ui text-xs uppercase tracking-wider text-muted-foreground">{title}</p>
        <div className="flex items-baseline gap-2 mt-2">
          <h3 className="font-display text-3xl text-foreground">{value}</h3>
          {trend && (
            <span className={`text-xs font-ui ${trend.isPositive ? 'text-green-500' : 'text-destructive'}`}>
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
            </span>
          )}
        </div>
        {description && <p className="text-xs text-muted-foreground font-body mt-1">{description}</p>}
      </div>
      <div className="ml-4 p-3 bg-primary/10 rounded-xl">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
  </div>
);
