export interface ActivityLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  entityType: string;
  entityId: string | null;
  details: string | null;
  createdAt: string;
}

export interface ActivityLogDto extends ActivityLog {}
