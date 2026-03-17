import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmins, useCreateAdmin, useDeleteAdmin } from '@/hooks/useAdmins';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, Trash2, Users, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { formatDistanceToNow } from 'date-fns';
import { AdminUser } from '@/lib/api';

export const AdminsPage = () => {
  const { user: currentUser } = useAuth();
  const { data: admins, isLoading, isError, error, refetch } = useAdmins();
  const createMutation = useCreateAdmin();
  const deleteMutation = useDeleteAdmin();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deletingAdmin, setDeletingAdmin] = useState<AdminUser | null>(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'ADMIN' as 'ADMIN' | 'EDITOR' });
  const [formError, setFormError] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (form.password.length < 6) { setFormError('Password must be at least 6 characters'); return; }
    createMutation.mutate(form, {
      onSuccess: () => {
        setIsCreateOpen(false);
        setForm({ name: '', email: '', password: '', role: 'ADMIN' });
      },
    });
  };

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20 pb-16 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground uppercase">Admin Management</h1>
            <p className="mt-2 text-muted-foreground font-body text-sm">Add or remove admin accounts</p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)} className="font-ui">
            <Plus className="h-4 w-4 mr-2" />Add Admin
          </Button>
        </motion.div>

        {isError && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading admins</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>{(error as any)?.response?.data?.message || (error as any)?.message || 'Failed to load admins'}</span>
              <Button variant="outline" size="sm" onClick={() => refetch()}>Retry</Button>
            </AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground font-body">Loading admins...</span>
          </div>
        )}

        {!isLoading && admins && Array.isArray(admins) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-3"
          >
            {admins.length === 0 && (
              <div className="text-center py-24 text-muted-foreground">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p className="font-display text-xl uppercase">No admins found</p>
              </div>
            )}
            {admins.map((admin, i) => (
              <motion.div
                key={admin.id}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }}
                className="bg-card border border-border rounded-2xl p-5 flex items-center justify-between hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display text-lg font-bold">
                    {admin.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-ui font-semibold text-foreground">{admin.name}</span>
                      {admin.id === currentUser?.id && <Badge variant="secondary" className="text-xs font-ui">You</Badge>}
                      <Badge variant="outline" className="text-xs font-ui border-primary/30 text-primary">{admin.role}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-body">{admin.email}</p>
                    <p className="text-xs text-muted-foreground font-body">
                      Added {formatDistanceToNow(new Date(admin.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                {admin.id !== currentUser?.id && (
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => setDeletingAdmin(admin)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display uppercase">Add New Admin</DialogTitle>
              <DialogDescription>Create a new admin account.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-ui">Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-ui">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-ui">Password</Label>
                <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required autoComplete="new-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="font-ui">Role</Label>
                <select id="role" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as 'ADMIN' | 'EDITOR' })}>
                  <option value="ADMIN">Admin</option>
                  <option value="EDITOR">Editor</option>
                </select>
              </div>
              {formError && <p className="text-sm text-destructive font-body">{formError}</p>}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} className="font-ui">Cancel</Button>
                <Button type="submit" disabled={createMutation.isPending} className="font-ui">
                  {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Admin
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <AlertDialog open={!!deletingAdmin} onOpenChange={() => setDeletingAdmin(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-display uppercase">Remove Admin</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove <strong>{deletingAdmin?.name}</strong>? This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="font-ui">Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive hover:bg-destructive/90 font-ui" onClick={() => { if (deletingAdmin) deleteMutation.mutate(deletingAdmin.id, { onSuccess: () => setDeletingAdmin(null) }); }}>
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
