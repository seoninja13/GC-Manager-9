import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ExpenseService } from '../../../../core/services/expense.service';
import { ClientService } from '../../../../core/services/client.service';
import { JobService } from '../../../../core/services/job.service';
import { Client } from '../../../../core/models/client.model';
import { Job } from '../../../../core/models/job.model';
import { Expense } from '../../../../core/models/expense.model';

@Component({
  selector: 'app-expense-form',
  template: `
    <div class="expense-form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditing ? 'Edit Expense' : 'New Expense' }}</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="expenseForm" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Date</mat-label>
                <input matInput [matDatepicker]="datePicker" formControlName="date" required>
                <mat-datepicker-toggle matSuffix [for]="datePicker"></mat-datepicker-toggle>
                <mat-datepicker #datePicker></mat-datepicker>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Category</mat-label>
                <mat-select formControlName="category" required>
                  <mat-option value="materials">Materials</mat-option>
                  <mat-option value="equipment">Equipment</mat-option>
                  <mat-option value="travel">Travel</mat-option>
                  <mat-option value="meals">Meals</mat-option>
                  <mat-option value="office">Office Supplies</mat-option>
                  <mat-option value="other">Other</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Amount</mat-label>
                <input matInput type="number" formControlName="amount" required>
                <span matPrefix>$&nbsp;</span>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Description</mat-label>
                <textarea matInput formControlName="description" rows="3" required></textarea>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Client (Optional)</mat-label>
                <mat-select formControlName="clientId">
                  <mat-option [value]="null">None</mat-option>
                  <mat-option *ngFor="let client of clients$ | async" [value]="client.id">
                    {{client.name}}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row" *ngIf="jobs$ | async as jobs">
              <mat-form-field appearance="outline">
                <mat-label>Job (Optional)</mat-label>
                <mat-select formControlName="jobId">
                  <mat-option [value]="null">None</mat-option>
                  <mat-option *ngFor="let job of jobs" [value]="job.id">
                    {{job.title}}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-checkbox formControlName="isReimbursable">
                This expense is reimbursable
              </mat-checkbox>
            </div>

            <div class="form-actions">
              <button mat-button type="button" (click)="onCancel()">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="expenseForm.invalid">
                {{ isEditing ? 'Update' : 'Save' }} Expense
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .expense-form-container {
      padding: 24px;
      max-width: 600px;
      margin: 0 auto;
    }

    .form-row {
      margin-bottom: 16px;
    }

    .form-row mat-form-field {
      width: 100%;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 24px;
    }
  `]
})
export class ExpenseFormComponent implements OnInit {
  expenseForm: FormGroup;
  isEditing = false;
  expenseId: string | null = null;
  clients$: Observable<Client[]>;
  jobs$: Observable<Job[]>;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private clientService: ClientService,
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clients$ = this.clientService.getClients();
    this.jobs$ = this.jobService.getJobs();

    this.expenseForm = this.fb.group({
      date: [new Date(), Validators.required],
      category: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      clientId: [null],
      jobId: [null],
      isReimbursable: [false]
    });
  }

  ngOnInit() {
    this.expenseId = this.route.snapshot.paramMap.get('id');
    if (this.expenseId) {
      this.isEditing = true;
      const expense = this.expenseService.getExpenseById(this.expenseId);
      if (expense) {
        this.expenseForm.patchValue({
          date: expense.date,
          category: expense.category,
          amount: expense.amount,
          description: expense.description,
          clientId: expense.clientId,
          jobId: expense.jobId,
          isReimbursable: expense.isReimbursable
        });
      }
    }

    // Update jobs list when client changes
    this.expenseForm.get('clientId')?.valueChanges.subscribe(clientId => {
      if (clientId) {
        this.jobs$ = this.jobService.getJobsByClient(clientId);
        this.expenseForm.patchValue({ jobId: null });
      } else {
        this.jobs$ = this.jobService.getJobs();
      }
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const expenseData = this.expenseForm.value;

      if (this.isEditing && this.expenseId) {
        this.expenseService.updateExpense({
          ...expenseData,
          id: this.expenseId
        } as Expense);
      } else {
        this.expenseService.addExpense(expenseData);
      }

      this.router.navigate(['/expenses']);
    }
  }

  onCancel() {
    this.router.navigate(['/expenses']);
  }
}