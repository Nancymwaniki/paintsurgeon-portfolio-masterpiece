import { useState } from 'react';
import { motion } from 'framer-motion';
import { useChangePassword } from '@/hooks/useAdmins';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, KeyRound } from 'lucide-react';

export const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const mutation = useChangePassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    if (newPassword.length < 6) { setValidationError('New password must be at least 6 characters'); return; }
    if (newPassword !== confirmPassword) { setValidationError('New passwords do not match'); return; }
    mutation.mutate({ currentPassword, newPassword }, {
      onSuccess: () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      },
    });
  };

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20 pb-16 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-lg relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground uppercase">
            Change Password
          </h1>
          <p className="mt-2 text-muted-foreground font-body text-sm">Update your account password</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <KeyRound className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-xl uppercase text-foreground">Update Password</h2>
              <p className="text-muted-foreground font-body text-xs">Enter your current password and choose a new one</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="font-ui text-sm">Current Password</Label>
              <Input
                id="currentPassword" type="password" value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required autoComplete="current-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="font-ui text-sm">New Password</Label>
              <Input
                id="newPassword" type="password" value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-ui text-sm">Confirm New Password</Label>
              <Input
                id="confirmPassword" type="password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required autoComplete="new-password"
              />
            </div>

            {validationError && (
              <p className="text-sm text-destructive font-body">{validationError}</p>
            )}

            <Button type="submit" className="w-full font-ui" disabled={mutation.isPending}>
              {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Change Password
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
