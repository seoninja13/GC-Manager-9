import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InvoiceService } from '../../core/services/invoice.service';
import { ClientService } from '../../core/services/client.service';
import { Invoice } from '../../core/models/invoice.model';

@Component({
  selector: 'app-invoices',
  template: `
    <div class="invoices-container">
      <div class="header">
        <h2>Invoices</h2>
        <button mat-raised-button color="primary" (click)="onCreateInvoice()">
          <mat-icon>add</mat-icon>
          New Invoice
        </button>
      </div>

      <div class="overview-section">
        <mat-card>
          <mat-card-content>
            <h3>Overview</h3>
            <ul class="status-list">
              <li>
                <span class="status-dot past-due"></span>
                Past due ({{stats.pastDue.count}})
                <span class="amount">\${{stats.pastDue.amount}}</span>
              </li>
              <li>
                <span class="status-dot sent"></span>
                Sent but not due ({{stats.sent.count}})
                <span class="amount">\${{stats.sent.amount}}</span>
              </li>
              <li>
                <span class="status-dot draft"></span>
                Draft ({{stats.draft.count}})
                <span class="amount">\${{stats.draft.amount}}</span>
              </li>
            </ul>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content>
            <h3>Issued</h3>
            <p class="subtitle">Past 30 days</p>
            <div class="stat-circle">
              <span class="number">{{stats.issued.count}}</span>
              <span class="percent">{{stats.issued.percentage}}%</span>
            </div>
            <p class="amount">\${{stats.issued.amount}}</p>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content>
            <h3>Average invoice</h3>
            <p class="subtitle">Past 30 days</p>
            <div class="stat-circle">
              <span class="amount-large">\${{stats.average.amount}}</span>
              <span class="percent">{{stats.average.percentage}}%</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-card class="table-section">
        <mat-card-content>
          <div class="table-header">
            <mat-form-field appearance="outline">
              <mat-label>Search invoices</mat-label>
              <input matInput (keyup)="applyFilter($event)" placeholder="Search by invoice number, client, or amount">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
          </div>

          <table mat-table [dataSource]="dataSource" matSort>
            <ng-container matColumnDef="invoiceNumber">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Invoice #</th>
              <td mat-cell *matCellDef="let invoice">{{invoice.invoiceNumber}}</td>
            </ng-container>

            <ng-container matColumnDef="client">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Client</th>
              <td mat-cell *matCellDef="let invoice">{{getClientName(invoice.clientId)}}</td>
            </ng-container>

            <ng-container matColumnDef="dueDate">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Due Date</th>
              <td mat-cell *matCellDef="let invoice">{{invoice.dueDate | date}}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
              <td mat-cell *matCellDef="let invoice">
                <span class="status-badge" [class]="invoice.status.toLowerCase()">
                  {{invoice.status}}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="total">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Total</th>
              <td mat-cell *matCellDef="let invoice">\${{invoice.total}}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let invoice">
                <button mat-icon-button [matMenuTriggerFor]="menu">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu">
                  <button mat-menu-item (click)="onEditInvoice(invoice)">
                    <mat-icon>edit</mat-icon>
                    <span>Edit</span>
                  </button>
                  <button mat-menu-item (click)="onViewInvoice(invoice)">
                    <mat-icon>visibility</mat-icon>
                    <span>View</span>
                  </button>
                  <button mat-menu-item (click)="onDeleteInvoice(invoice)">
                    <mat-icon>delete</mat-icon>
                    <span>Delete</span>
                  </button>
                </mat-menu>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

            <tr class="mat-row" *matNoDataRow>
              <td class="mat-cell" colspan="6">
                <div class="empty-state">
                  <p>No invoices found</p>
                  <button mat-raised-button color="primary" (click)="onCreateInvoice()">
                    Create Invoice
                  </button>
                </div>
              </td>
            </tr>
          </table>

          <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .invoices-container {
      padding: 24px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .overview-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }

    .status-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .status-list li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .past-due { background-color: #f44336; }
    .sent { background-color: #2196f3; }
    .draft { background-color: #757575; }

    .stat-circle {
      text-align: center;
      margin: 16px 0;
    }

    .number {
      font-size: 32px;
      font-weight: 500;
    }

    .amount-large {
      font-size: 32px;
      font-weight: 500;
    }

    .percent {
      color: #666;
      font-size: 14px;
    }

    .table-section {
      margin-top: 24px;
    }

    .table-header {
      margin-bottom: 16px;
    }

    .table-header mat-form-field {
      width: 100%;
    }

    table {
      width: 100%;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .status-badge.draft {
      background-color: #e0e0e0;
      color: #757575;
    }

    .status-badge.sent {
      background-color: #e3f2fd;
      color: #2196f3;
    }

    .status-badge.paid {
      background-color: #e8f5e9;
      color: #4caf50;
    }

    .status-badge.overdue {
      background-color: #ffebee;
      color: #f44336;
    }

    .empty-state {
      text-align: center;
      padding: 48px 0;
    }

    .empty-state p {
      margin-bottom: 16px;
      color: #666;
    }
  `]
})
export class InvoicesComponent implements OnInit {
  displayedColumns: string[] = ['invoiceNumber', 'client', 'dueDate', 'status', 'total', 'actions'];
  dataSource: MatTableDataSource<Invoice>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  stats = {
    pastDue: { count: 0, amount: 0 },
    sent: { count: 0, amount: 0 },
    draft: { count: 0, amount: 0 },
    issued: { count: 0, amount: 0, percentage: 0 },
    average: { amount: 0, percentage: 0 }
  };

  constructor(
    private invoiceService: InvoiceService,
    private clientService: ClientService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<Invoice>([]);
  }

  ngOnInit() {
    this.invoiceService.getInvoices().subscribe(invoices => {
      this.dataSource.data = invoices;
      this.calculateStatistics(invoices);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  calculateStatistics(invoices: Invoice[]) {
    // Reset statistics
    this.stats = {
      pastDue: { count: 0, amount: 0 },
      sent: { count: 0, amount: 0 },
      draft: { count: 0, amount: 0 },
      issued: { count: 0, amount: 0, percentage: 0 },
      average: { amount: 0, percentage: 0 }
    };
    
    // Calculate current statistics
    invoices.forEach(invoice => {
      switch (invoice.status) {
        case 'OVERDUE':
          this.stats.pastDue.count++;
          this.stats.pastDue.amount += invoice.total;
          break;
        case 'SENT':
          this.stats.sent.count++;
          this.stats.sent.amount += invoice.total;
          break;
        case 'DRAFT':
          this.stats.draft.count++;
          this.stats.draft.amount += invoice.total;
          break;
      }
    });

    // Calculate last 30 days statistics
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentInvoices = invoices.filter(inv => inv.createdAt >= thirtyDaysAgo);
    this.stats.issued.count = recentInvoices.length;
    this.stats.issued.amount = recentInvoices.reduce((sum, inv) => sum + inv.total, 0);
    this.stats.issued.percentage = Math.round((this.stats.issued.count / invoices.length) * 100) || 0;
    
    this.stats.average.amount = this.stats.issued.count ? 
      this.stats.issued.amount / this.stats.issued.count : 0;
    this.stats.average.percentage = Math.round(
      (this.stats.average.amount / (this.stats.issued.amount || 1)) * 100
    ) || 0;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getClientName(clientId: string): string {
    const client = this.clientService.getClientById(clientId);
    return client?.name || 'Unknown Client';
  }

  onCreateInvoice() {
    this.router.navigate(['/invoices/new']);
  }

  onEditInvoice(invoice: Invoice) {
    this.router.navigate(['/invoices', invoice.id, 'edit']);
  }

  onViewInvoice(invoice: Invoice) {
    // Implement view functionality
  }

  onDeleteInvoice(invoice: Invoice) {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(invoice.id!);
    }
  }
}