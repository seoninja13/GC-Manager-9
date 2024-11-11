import { Component } from '@angular/core';

@Component({
  selector: 'app-jobs',
  template: `
    <div class="jobs-container">
      <h2>Jobs</h2>

      <div class="overview-section">
        <mat-card>
          <mat-card-content>
            <h3>Overview</h3>
            <ul class="status-list">
              <li>
                <span class="status-dot ending"></span>
                Ending within 30 days (0)
              </li>
              <li>
                <span class="status-dot late"></span>
                Late (0)
              </li>
              <li>
                <span class="status-dot requires-invoicing"></span>
                Requires Invoicing (0)
              </li>
              <li>
                <span class="status-dot action-required"></span>
                Action Required (0)
              </li>
              <li>
                <span class="status-dot unscheduled"></span>
                Unscheduled (0)
              </li>
            </ul>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content>
            <h3>Recent visits</h3>
            <p class="subtitle">Past 30 days</p>
            <div class="stat-circle">
              <span class="number">0</span>
              <span class="percent">0%</span>
            </div>
            <p class="amount">$0</p>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-content>
            <h3>Visits scheduled</h3>
            <p class="subtitle">Next 30 days</p>
            <div class="stat-circle">
              <span class="number">0</span>
              <span class="percent">0%</span>
            </div>
            <p class="amount">$0</p>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="jobs-section">
        <div class="section-header">
          <h3>All Jobs</h3>
          <div class="actions">
            <mat-form-field appearance="outline" class="status-filter">
              <mat-label>Status</mat-label>
              <mat-select value="all">
                <mat-option value="all">All</mat-option>
              </mat-select>
            </mat-form-field>
            <button mat-raised-button color="primary">
              <mat-icon>add</mat-icon>
              New Job
            </button>
          </div>
        </div>

        <table mat-table [dataSource]="[]" class="jobs-table">
          <ng-container matColumnDef="client">
            <th mat-header-cell *matHeaderCellDef>Client</th>
            <td mat-cell *matCellDef="let job">{{job?.client}}</td>
          </ng-container>

          <ng-container matColumnDef="jobNumber">
            <th mat-header-cell *matHeaderCellDef>Job number</th>
            <td mat-cell *matCellDef="let job">{{job?.jobNumber}}</td>
          </ng-container>

          <ng-container matColumnDef="property">
            <th mat-header-cell *matHeaderCellDef>Property</th>
            <td mat-cell *matCellDef="let job">{{job?.property}}</td>
          </ng-container>

          <ng-container matColumnDef="schedule">
            <th mat-header-cell *matHeaderCellDef>Schedule</th>
            <td mat-cell *matCellDef="let job">{{job?.schedule}}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let job">{{job?.status}}</td>
          </ng-container>

          <ng-container matColumnDef="total">
            <th mat-header-cell *matHeaderCellDef>Total</th>
            <td mat-cell *matCellDef="let job">{{job?.total}}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="['client', 'jobNumber', 'property', 'schedule', 'status', 'total']"></tr>
          <tr mat-row *matRowDef="let row; columns: ['client', 'jobNumber', 'property', 'schedule', 'status', 'total'];"></tr>
        </table>

        <div class="empty-state">
          <p>Let's create a job and get to work</p>
          <button mat-raised-button color="primary">Create your first job</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .jobs-container {
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

    .ending { background-color: #ff9800; }
    .late { background-color: #f44336; }
    .requires-invoicing { background-color: #2196f3; }
    .action-required { background-color: #fdd835; }
    .unscheduled { background-color: #4caf50; }

    .stat-circle {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 16px 0;
    }

    .number {
      font-size: 32px;
      font-weight: 500;
    }

    .percent {
      color: #666;
    }

    .amount {
      text-align: center;
      color: #666;
      margin: 0;
    }

    .subtitle {
      color: #666;
      margin: 4px 0;
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

    .jobs-table {
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
export class JobsComponent {}