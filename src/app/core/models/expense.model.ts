export interface Expense {
  id?: string;
  date: Date;
  category: string;
  amount: number;
  description: string;
  jobId?: string;
  clientId?: string;
  receipt?: string;
  isReimbursable: boolean;
  status: ExpenseStatus;
  enteredBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ExpenseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REIMBURSED = 'REIMBURSED',
  REJECTED = 'REJECTED'
}