import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Expense, ExpenseStatus } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses = new BehaviorSubject<Expense[]>([]);

  getExpenses(): Observable<Expense[]> {
    return this.expenses.asObservable();
  }

  addExpense(expense: Partial<Expense>): Expense {
    const currentExpenses = this.expenses.getValue();
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      status: ExpenseStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Expense;

    this.expenses.next([...currentExpenses, newExpense]);
    return newExpense;
  }

  updateExpense(updatedExpense: Expense): void {
    const currentExpenses = this.expenses.getValue();
    const index = currentExpenses.findIndex(e => e.id === updatedExpense.id);
    if (index !== -1) {
      updatedExpense.updatedAt = new Date();
      currentExpenses[index] = updatedExpense;
      this.expenses.next([...currentExpenses]);
    }
  }

  deleteExpense(expenseId: string): void {
    const currentExpenses = this.expenses.getValue();
    this.expenses.next(currentExpenses.filter(e => e.id !== expenseId));
  }

  getExpenseById(expenseId: string): Expense | undefined {
    return this.expenses.getValue().find(e => e.id === expenseId);
  }
}