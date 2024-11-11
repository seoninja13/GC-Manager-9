export interface Job {
  id?: string;
  clientId: string;
  jobNumber: string;
  title: string;
  description?: string;
  status: JobStatus;
  schedule?: {
    startDate: Date;
    endDate?: Date;
  };
  property?: {
    id: string;
    address: string;
  };
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum JobStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}