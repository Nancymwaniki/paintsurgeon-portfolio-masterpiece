export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface CreateSubmissionDto {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface SubmissionResponseDto extends ContactSubmission {}
