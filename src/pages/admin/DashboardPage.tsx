import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useAnalytics } from '@/hooks/useAnalytics';
import { StatsCard } from '@/components/admin/StatsCard';
import { RecentActivity } from '@/components/admin/RecentActivity';
import {
  Image as ImageIcon,
  Mail,
  Tag,
  TrendingUp,
  Loader2,
  AlertCircle,
  Users,
  KeyRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const quickActions = [
  { to: '/portfolio', icon: ImageIcon, label: 'Manage Images' },
  { to: '/contact', icon: Mail, label: 'View Submissions' },
  { to: '/admin/activity', icon: TrendingUp, label: 'Activity Log' },
  { to: '/admin/categories', icon: Tag, label: 'Categories' },
  { to: '/admin/admins', icon: Users, label: 'Manage Admins' },
  { to: '/admin/change-password', icon: KeyRound, label: 'Change Password' },
];

export const DashboardPage = () => {
  const { user } = useAuth();
  const { data: stats, isLoading, isError, error, refetch } = useAnalytics();

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20 pb-16 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground uppercase">
            Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground font-body text-sm">
            Welcome back, <span className="text-primary">{user?.name || user?.email}</span>
          </p>
        </motion.div>

        {isError && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading dashboard</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>{error?.message || 'Failed to load analytics'}</span>
              <Button variant="outline" size="sm" onClick={() => refetch()}>Retry</Button>
            </AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground font-body">Loading dashboard...</span>
          </div>
        )}

        {!isLoading && stats && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
              {[
                { title: 'Total Images', value: stats.totalImages, icon: ImageIcon, desc: 'Across all categories' },
                { title: 'Unread Submissions', value: stats.unreadSubmissions, icon: Mail, desc: `${stats.totalSubmissions} total` },
                { title: 'Categories', value: stats.imagesByCategory.length, icon: Tag, desc: 'Active categories' },
                { title: 'Recent Activity', value: stats.recentActivities.length, icon: TrendingUp, desc: 'Last 10 actions' },
              ].map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <StatsCard title={s.title} value={s.value} icon={s.icon} description={s.desc} />
                </motion.div>
              ))}
            </div>

            {/* Images by Category */}
            {stats.imagesByCategory.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="mb-10"
              >
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-display text-xl uppercase text-foreground">Images by Category</h2>
                    <Link to="/admin/categories" className="text-sm text-primary hover:text-primary/80 font-ui transition-colors">
                      Manage →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {stats.imagesByCategory.map((cat) => (
                      <div key={cat.categoryName} className="flex items-center justify-between p-4 bg-muted rounded-xl border border-border hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Tag className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-ui text-sm text-foreground">{cat.categoryName}</span>
                        </div>
                        <span className="font-display text-xl text-foreground">{cat.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="mb-10"
            >
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-display text-xl uppercase text-foreground mb-5">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {quickActions.map(({ to, icon: Icon, label }) => (
                    <Link key={to} to={to}>
                      <div className="flex flex-col items-center gap-2 p-4 bg-muted rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group cursor-pointer">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-ui text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">{label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
            >
              <RecentActivity activities={stats.recentActivities} limit={10} />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};
