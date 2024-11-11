import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Welcome to GC App</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="dashboard-stats">
            <mat-card class="stat-card">
              <mat-icon>work</mat-icon>
              <h3>Active Jobs</h3>
              <p>0</p>
            </mat-card>
            <mat-card class="stat-card">
              <mat-icon>people</mat-icon>
              <h3>Clients</h3>
              <p>0</p>
            </mat-card>
            <mat-card class="stat-card">
              <mat-icon>receipt</mat-icon>
              <h3>Pending Invoices</h3>
              <p>0</p>
            </mat-card>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .stat-card {
      text-align: center;
      padding: 20px;
    }
    .stat-card mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      color: #3f51b5;
    }
    .stat-card h3 {
      margin: 10px 0;
      color: #666;
    }
    .stat-card p {
      font-size: 24px;
      font-weight: bold;
      margin: 0;
      color: #333;
    }
  `]
})
export class DashboardComponent { }