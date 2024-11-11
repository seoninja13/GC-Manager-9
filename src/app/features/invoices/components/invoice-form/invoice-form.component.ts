import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from '../../../../core/models/client.model';
import { Job } from '../../../../core/models/job.model';
import { Invoice } from '../../../../core/models/invoice.model';
import { ClientService } from '../../../../core/services/client.service';
import { JobService } from '../../../../core/services/job.service';
import { InvoiceService } from '../../../../core/services/invoice.service';

@Component({
  selector: 'app-invoice-form',
  template: `
    <div class="invoice-form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditing ? 'Edit Invoice' : 'Create New Invoice' }}</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="invoiceForm" (ngSubmit)="onSubmit()">
            <div class="form-row" *ngIf="!clientId">
              <mat-form-field appearance="outline">
                <mat-label>Client</mat-label>
                <mat-select formControlName="clientId" required>
                  <mat-option *ngFor="let client of clients$ | async" [value]="client.id">
                    {{client.name}}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row" *ngIf="jobs$ | async as jobs">
              <mat-form-field appearance="outline">
                <mat-label>Related Job (Optional)</mat-label>
                <mat-select formControlName="jobId">
                  <mat-option [value]="null">None</mat-option>
                  <mat-option *ngFor="let job of jobs" [value]="job.id">
                    {{job.title}} ({{job.jobNumber}})
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Due Date</mat-label>
                <input matInput [matDatepicker]="dueDatePicker" formControlName="dueDate" required>
                <mat-datepicker-toggle matSuffix [for]="dueDatePicker"></mat-datepicker-toggle>
                <mat-datepicker #dueDatePicker></mat-datepicker>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Notes</mat-label>
                <textarea matInput formControlName="notes" rows="3"></textarea>
              </mat-form-field>
            </div>

            <div class="items-section">
              <h3>Items</h3>
              <div formArrayName="items">
                <div *ngFor="let item of items.controls; let i=index" [formGroupName]="i" class="item-row">
                  <mat-form-field appearance="outline">
                    <mat-label>Description</mat-label>
                    <input matInput formControlName="description" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Quantity</mat-label>
                    <input matInput type="number" formControlName="quantity" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Unit Price</mat-label>
                    <input matInput type="number" formControlName="unitPrice" required>
                  </mat-form-field>

                  <div class="item-total">
                    Total: \${{calculateItemTotal(item.value)}}
                  </div>

                  <button mat-icon-button color="warn" type="button" (click)="removeItem(i)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </div>

              <button mat-stroked-button type="button" (click)="addItem()">
                <mat-icon>add</mat-icon>
                Add Item
              </button>
            </div>

            <div class="totals-section">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>\${{calculateSubtotal()}}</span>
              </div>
              <div class="total-row">
                <span>Tax ({{taxRate}}%):</span>
                <span>\${{calculateTax()}}</span>
              </div>
              <div class="total-row grand-total">
                <span>Total:</span>
                <span>\${{calculateTotal()}}</span>
              </div>
            </div>

            <div class="form-actions">
              <button mat-button type="button" (click)="onCancel()">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="invoiceForm.invalid">
                {{ isEditing ? 'Update' : 'Create' }} Invoice
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .invoice-form-container {
      padding: 24px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .form-row {
      margin-bottom: 16px;
    }

    .form-row mat-form-field {
      width: 100%;
    }

    .items-section {
      margin: 24px 0;
    }

    .item-row {
      display: grid;
      grid-template-columns: 3fr 1fr 1fr 1fr auto;
      gap: 16px;
      align-items: center;
      margin-bottom: 16px;
    }

    .item-total {
      text-align: right;
      font-weight: 500;
    }

    .totals-section {
      margin: 24px 0;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .grand-total {
      font-size: 1.2em;
      font-weight: 500;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #ddd;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 24px;
    }
  `]
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup;
  isEditing = false;
  invoiceId: string | null = null;
  clientId: string | null = null;
  clients$: Observable<Client[]>;
  jobs$: Observable<Job[]>;
  taxRate = 10; // Example tax rate

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private clientService: ClientService,
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clients$ = this.clientService.getClients();
    this.jobs$ = this.jobService.getJobs();
    
    this.invoiceForm = this.fb.group({
      clientId: ['', Validators.required],
      jobId: [null],
      dueDate: [null, Validators.required],
      notes: [''],
      items: this.fb.array([])
    });
  }

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  ngOnInit() {
    this.clientId = this.route.snapshot.queryParamMap.get('clientId');
    if (this.clientId) {
      this.invoiceForm.patchValue({ clientId: this.clientId });
      this.invoiceForm.get('clientId')?.disable();
      this.jobs$ = this.jobService.getJobsByClient(this.clientId);
    }

    this.invoiceId = this.route.snapshot.paramMap.get('id');
    if (this.invoiceId) {
      this.isEditing = true;
      const invoice = this.invoiceService.getInvoiceById(this.invoiceId);
      if (invoice) {
        this.invoiceForm.patchValue({
          clientId: invoice.clientId,
          jobId: invoice.jobId,
          dueDate: invoice.dueDate,
          notes: invoice.notes
        });
        
        invoice.items.forEach(item => {
          this.items.push(this.createItemFormGroup(item));
        });
      }
    } else {
      this.addItem(); // Add one empty item by default
    }
  }

  createItemFormGroup(item: any = {}) {
    return this.fb.group({
      description: [item.description || '', Validators.required],
      quantity: [item.quantity || 1, [Validators.required, Validators.min(1)]],
      unitPrice: [item.unitPrice || 0, [Validators.required, Validators.min(0)]]
    });
  }

  addItem() {
    this.items.push(this.createItemFormGroup());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  calculateItemTotal(item: any): number {
    return item.quantity * item.unitPrice;
  }

  calculateSubtotal(): number {
    return this.items.controls.reduce((sum, item) => {
      return sum + this.calculateItemTotal(item.value);
    }, 0);
  }

  calculateTax(): number {
    return this.calculateSubtotal() * (this.taxRate / 100);
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + this.calculateTax();
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      const formValue = this.invoiceForm.getRawValue();
      const invoiceData = {
        ...formValue,
        subtotal: this.calculateSubtotal(),
        tax: this.calculateTax(),
        total: this.calculateTotal()
      };

      if (this.isEditing && this.invoiceId) {
        this.invoiceService.updateInvoice({
          ...invoiceData,
          id: this.invoiceId
        } as Invoice);
      } else {
        this.invoiceService.addInvoice(invoiceData);
      }

      this.router.navigate(['/invoices']);
    }
  }

  onCancel() {
    this.router.navigate(['/invoices']);
  }
}