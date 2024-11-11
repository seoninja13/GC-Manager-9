import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  template: `
    <div class="expenses-container">
      <div class="header">
        <h2>Expenses</h2>
        <button mat-raised-button color="primary" (click)="onNewExpense()">
          + New Expense
        </button>
      </div>

      <div class="content">
        <div class="main-section">
          <h3>0 Expenses</h3>
          
          <div class="filters">
            <mat-form-field appearance="outline">
              <input matInput placeholder="Search expenses..." />
            </mat-form-field>

            <div class="filter-group">
              <mat-form-field appearance="outline">
                <mat-label>Status</mat-label>
                <mat-select value="all">
                  <mat-option value="all">All</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Entered By</mat-label>
                <mat-select>
                  <mat-option value="all">All</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </div>

          <div class="empty-state">
            <mat-icon class="expense-icon">attach_money</mat-icon>
            <h3>There are no expenses to report on at the moment</h3>
            <p>Keep your spending in check by tracking what's being purchased</p>
            <button mat-raised-button color="primary" (click)="onNewExpense()">+ New Expense</button>
          </div>
        </div>

        <mat-card class="help-section">
          <h3>Help and documentation</h3>
          <ul>
            <li>
              You can quickly and easily generate highly customizable reports from the 
              <a href="#">Expenses Report</a>
            </li>
            <li>
              Any reimbursable expenses will automatically appear in 
              <a href="#">Confirm Payroll</a> under <a href="#">Timesheets</a>
            </li>
          </ul>
          <button mat-stroked-button color="primary">Learn More About Expense Tracking</button>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .expenses-container {
      padding: 24px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .content {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 24px;
    }

    .main-section {
      background: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .filters {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }

    .filter-group {
      display: flex;
      gap: 16px;
    }

    mat-form-field {
      width: 100%;
    }

    .empty-state {
      text-align: center;
      padding: 48px 24px;
    }

    .expense-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      color: #666;
      margin-bottom: 16px;
    }

    .help-section {
      padding: 24px;
    }

    .help-section h3 {
      margin-top: 0;
      margin-bottom: 16px;
    }

    .help-section ul {
      list-style: none;
      padding: 0;
      margin: 0 0 24px 0;
    }

    .help-section li {
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .help-section a {
      color: #2196f3;
      text-decoration: none;
    }

    .help-section button {
      width: 100%;
    }
  `]
})
export class ExpensesComponent {
  constructor(private router: Router) {}

  onNewExpense() {
    this.router.navigate(['/expenses/new']);
  }
}