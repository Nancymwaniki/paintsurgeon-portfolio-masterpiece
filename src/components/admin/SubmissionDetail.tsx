import { Mail, Phone, Calendar, Trash2 } from 'lucide-react';
import { SubmissionResponseDto } from '@/types/submission';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

interface SubmissionDetailProps {
  submission: SubmissionResponseDto | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export const SubmissionDetail = ({
  submission,
  isOpen,
  onClose,
  onDelete,
  isDeleting = false,
}: SubmissionDetailProps) => {
  if (!submission) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Contact Submission</DialogTitle>
            {!submission.read && (
              <Badge variant="default">New</Badge>
            )}
          </div>
          <DialogDescription>
            Submitted {format(new Date(submission.createdAt), 'PPpp')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Contact Information */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="text-base font-semibold text-foreground mt-1">{submission.name}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <a
                href={`mailto:${submission.email}`}
                className="text-base text-primary hover:underline mt-1 block"
              >
                {submission.email}
              </a>
            </div>

            {submission.phone && (
              <div>
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </label>
                <a
                  href={`tel:${submission.phone}`}
                  className="text-base text-primary hover:underline mt-1 block"
                >
                  {submission.phone}
                </a>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Submitted
              </label>
              <p className="text-base text-foreground mt-1">
                {format(new Date(submission.createdAt), 'PPPP')} at{' '}
                {format(new Date(submission.createdAt), 'p')}
              </p>
            </div>
          </div>

          <Separator />

          {/* Message */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">Message</label>
            <div className="mt-2 p-4 bg-muted rounded-lg">
              <p className="text-base text-foreground whitespace-pre-wrap">{submission.message}</p>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="destructive"
              onClick={() => onDelete(submission.id)}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isDeleting ? 'Deleting...' : 'Delete Submission'}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
