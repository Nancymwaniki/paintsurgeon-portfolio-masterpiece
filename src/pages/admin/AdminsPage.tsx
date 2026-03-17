import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmins, useCreateAdmin, useDeleteAdmin } from '@/hooks/useAdmins';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';
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
    if (form.password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    createMutation.mutate(form, {
      onSuccess: () => {
        setIsCreateOpen(false);
        setForm({ name: '', email: '', password: '', role: 'ADMIN' });
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
            <p className="mt-2 text-sm text-gray-600">Add or remove admin accounts</p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Admin
          </Button>
        </div>

        {isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading admins</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>{(error as any)?.response?.data?.message || (error as any)?.message || 'Failed to load admins'}</span>
              <Button variant="outline" size="sm" onClick={() => refetch()}>Retry</Button>
            </AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading admins...</span>
          </div>
        )}

        {!isLoading && admins && Array.isArray(admins) && (
          <div className="space-y-3">
            {admins.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No admins found</p>
              </div>
            )}
            {admins.map((admin) => (
              <Card key={admin.id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {admin.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{admin.name}</span>
                        {admin.id === currentUser?.id && (
                          <Badge variant="secondary" className="text-xs">You</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">{admin.role}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{admin.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Added {formatDistanceToNow(new Date(admin.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  {admin.id !== currentUser?.id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setDeletingAdmin(admin)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create Admin Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
              <DialogDescription>Create a new admin account.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as 'ADMIN' | 'EDITOR' })}
                >
                  <option value="ADMIN">Admin</option>
                  <option value="EDITOR">Editor</option>
                </select>
              </div>
              {formError && <p className="text-sm text-red-600">{formError}</p>}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Admin
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deletingAdmin} onOpenChange={() => setDeletingAdmin(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Admin</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove <strong>{deletingAdmin?.name}</strong>? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={() => {
                  if (deletingAdmin) {
                    deleteMutation.mutate(deletingAdmin.id, { onSuccess: () => setDeletingAdmin(null) });
                  }
                }}
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
