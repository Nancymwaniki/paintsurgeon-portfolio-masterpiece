import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SubmissionFiltersProps {
  activeFilter: 'all' | 'unread' | 'read';
  onFilterChange: (filter: 'all' | 'unread' | 'read') => void;
  counts?: {
    all: number;
    unread: number;
    read: number;
  };
}

export const SubmissionFilters = ({
  activeFilter,
  onFilterChange,
  counts,
}: SubmissionFiltersProps) => {
  return (
    <Tabs value={activeFilter} onValueChange={(value) => onFilterChange(value as 'all' | 'unread' | 'read')}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">
          All {counts && `(${counts.all})`}
        </TabsTrigger>
        <TabsTrigger value="unread">
          Unread {counts && `(${counts.unread})`}
        </TabsTrigger>
        <TabsTrigger value="read">
          Read {counts && `(${counts.read})`}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
