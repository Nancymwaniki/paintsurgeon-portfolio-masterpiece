import { Mail, Phone, Calendar, Eye } from 'lucide-react';
import { SubmissionResponseDto } from '@/types/submission';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

interface SubmissionCardProps {
  submission: SubmissionResponseDto;
  onClick: () => void;
}

export const SubmissionCard = ({ submission, onClick }: SubmissionCardProps) => {
  const messagePreview = submission.message.length > 100
    ? `${submission.message.substring(0, 100)}...`
    : submission.message;

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        submission.read ? 'bg-muted/30' : 'bg-card border-primary/20'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground">{submission.name}</h3>
              {!submission.read && (
                <Badge variant="default" className="text-xs">
                  New
                </Badge>
              )}
            </div>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span className="truncate">{submission.email}</span>
              </div>
              {submission.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>{submission.phone}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{messagePreview}</p>
        {submission.read && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
            <Eye className="h-3 w-3" />
            <span>Read</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
