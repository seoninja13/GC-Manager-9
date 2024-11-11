import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../../core/services/client.service';
import { Client } from '../../core/models/client.model';

@Component({
  selector: 'app-clients',
  template: `
    <div class="clients-container">
      <div class="header">
        <h2>Clients</h2>
        <button mat-raised-button color="primary" (click)="onAddClient()">
          <mat-icon>add</mat-icon>
          Add Client
        </button>
      </div>

      <mat-card class="table-card">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search clients</mat-label>
          <input matInput (keyup)="applyFilter($event)" placeholder="Search by name, email, or company" #input>
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>

        <table mat-table [dataSource]="dataSource" matSort>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
            <td mat-cell *matCellDef="let client">
              <a [routerLink]="['/clients', client.id]" class="client-link">{{client.name}}</a>
            </td>
          </ng-container>

          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
            <td mat-cell *matCellDef="let client">{{client.email}}</td>
          </ng-container>

          <ng-container matColumnDef="phone">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Phone</th>
            <td mat-cell *matCellDef="let client">{{client.phone}}</td>
          </ng-container>

          <ng-container matColumnDef="company">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Company</th>
            <td mat-cell *matCellDef="let client">{{client.company}}</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let client">
              <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Actions">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item (click)="onEditClient(client)">
                  <mat-icon>edit</mat-icon>
                  <span>Edit</span>
                </button>
                <button mat-menu-item (click)="onCreateJob(client)">
                  <mat-icon>work</mat-icon>
                  <span>Create Job</span>
                </button>
                <button mat-menu-item (click)="onCreateInvoice(client)">
                  <mat-icon>receipt</mat-icon>
                  <span>Create Invoice</span>
                </button>
                <button mat-menu-item (click)="onDeleteClient(client)" class="delete-action">
                  <mat-icon>delete</mat-icon>
                  <span>Delete</span>
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="5">
              <div class="empty-state">
                <mat-icon>people_outline</mat-icon>
                <h3>No clients found</h3>
                <p>Add your first client to get started</p>
                <button mat-raised-button color="primary" (click)="onAddClient()">
                  Add Client
                </button>
              </div>
            </td>
          </tr>
        </table>

        <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page of clients"></mat-paginator>
      </mat-card>
    </div>
  `,
  styles: [`
    .clients-container {
      padding: 24px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .table-card {
      padding: 24px;
    }

    .search-field {
      width: 100%;
      margin-bottom: 16px;
    }

    table {
      width: 100%;
    }

    .client-link {
      color: #2196f3;
      text-decoration: none;
      font-weight: 500;
    }

    .client-link:hover {
      text-decoration: underline;
    }

    .empty-state {
      text-align: center;
      padding: 48px 0;
    }

    .empty-state mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      color: #666;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .empty-state p {
      margin: 0 0 24px 0;
      color: #666;
    }

    .delete-action {
      color: #f44336;
    }

    .mat-column-actions {
      width: 60px;
      text-align: center;
    }
  `]
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'company', 'actions'];
  dataSource: MatTableDataSource<Client>;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<Client>([]);
  }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.dataSource.data = clients;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddClient() {
    this.router.navigate(['/clients/new']);
  }

  onEditClient(client: Client) {
    this.router.navigate(['/clients', client.id, 'edit']);
  }

  onCreateJob(client: Client) {
    this.router.navigate(['/jobs/new'], { 
      queryParams: { clientId: client.id } 
    });
  }

  onCreateInvoice(client: Client) {
    this.router.navigate(['/invoices/new'], { 
      queryParams: { clientId: client.id } 
    });
  }

  onDeleteClient(client: Client) {
    if (confirm(`Are you sure you want to delete ${client.name}?`)) {
      this.clientService.deleteClient(client.id!);
    }
  }
}