import { Component } from '@angular/core';

@Component({
  selector: 'app-requests',
  template: `
    <div class="requests-container">
      <h2>Requests</h2>

      <div class="overview-section">
        <mat-card>
          <mat-card-content>
            <h3>Overview</h3>
            <ul class="status-list">
              <li>
                <span class="status-dot new"></span>
                New (0)
              </li>
              <li>
                <span class="status-dot assessment"></span>
                Assessment Complete (0)
              </li>
              <li>
                <span class="status-dot overdue"></span>
                Overdue (0)
              </li>
              <li>
                <span class="status-dot unscheduled"></span>
                Unscheduled (0)
              </li>
            </ul>
          </mat-card-content>
        </mat-card>

        <mat-card class="share-card">
          <mat-card-content>
            <div class="share-header">
              <h3>Get more new work</h3>
              <button mat-icon-button>
                <mat-icon>close</mat-icon>
              </button>
            </div>
            <p>Share your request form online and generate new work 24/7—even while you rest</p>
            <button mat-stroked-button color="primary">Share your form</button>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="requests-section">
        <div class="section-header">
          <h3>All Requests (0 results)</h3>
          <div class="actions">
            <mat-form-field appearance="outline" class="status-filter">
              <mat-label>Status</mat-label>
              <mat-select value="all">
                <mat-option value="all">All</mat-option>
              </mat-select>
            </mat-form-field>
            <button mat-raised-button color="primary">
              <mat-icon>add</mat-icon>
              New Request
            </button>
          </div>
        </div>

        <table mat-table [dataSource]="[]" class="requests-table">
          <ng-container matColumnDef="client">
            <th mat-header-cell *matHeaderCellDef>Client</th>
            <td mat-cell *matCellDef="let request">{{request?.client}}</td>
          </ng-container>

          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef>Title</th>
            <td mat-cell *matCellDef="let request">{{request?.title}}</td>
          </ng-container>

          <ng-container matColumnDef="property">
            <th mat-header-cell *matHeaderCellDef>Property</th>
            <td mat-cell *matCellDef="let request">{{request?.property}}</td>
          </ng-container>

          <ng-container matColumnDef="contact">
            <th mat-header-cell *matHeaderCellDef>Contact</th>
            <td mat-cell *matCellDef="let request">{{request?.contact}}</td>
          </ng-container>

          <ng-container matColumnDef="requested">
            <th mat-header-cell *matHeaderCellDef>Requested</th>
            <td mat-cell *matCellDef="let request">{{request?.requested}}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let request">{{request?.status}}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="['client', 'title', 'property', 'contact', 'requested', 'status']"></tr>
          <tr mat-row *matRowDef="let row; columns: ['client', 'title', 'property', 'contact', 'requested', 'status'];"></tr>
        </table>

        <div class="empty-state">
          <p>Let's create a request and track incoming work</p>
          <button mat-raised-button color="primary">New Request</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .requests-container {
      padding: 24px;
    }

    .overview-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .status-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .status-list li {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .new { background-color: #2196f3; }
    .assessment { background-color: #4caf50; }
    .overdue { background-color: #f44336; }
    .unscheduled { background-color: #ff9800; }

    .share-card {
      background-color: #f5f5f5;
    }

    .share-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .actions {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .status-filter {
      width: 200px;
    }

    .requests-table {
      width: 100%;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-radius: 4px;
    }

    .empty-state {
      text-align: center;
      padding: 48px;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .empty-state p {
      margin-bottom: 16px;
      color: #666;
    }
  `]
})
export class RequestsComponent {}