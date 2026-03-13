import { SubmissionResponseDto } from '@/types/submission';
import { SubmissionCard } from './SubmissionCard';

interface SubmissionListProps {
  submissions: SubmissionResponseDto[];
  onSubmissionClick: (submission: SubmissionResponseDto) => void;
}

export const SubmissionList = ({ submissions, onSubmissionClick }: SubmissionListProps) => {
  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No submissions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {submissions.map((submission) => (
        <SubmissionCard
          key={submission.id}
          submission={submission}
          onClick={() => onSubmissionClick(submission)}
        />
      ))}
    </div>
  );
};
