import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  template: `
    <div class="reports-container">
      <h2>Reports</h2>
      
      <div class="reports-grid">
        <div class="report-section">
          <h3>Financial reports</h3>
          <mat-nav-list>
            <a mat-list-item>
              <h4>Projected income</h4>
              <p>Projected income from invoices awaiting payment</p>
            </a>
            <a mat-list-item>
              <h4>Transaction list</h4>
              <p>All transactions from invoices, payments & deposits</p>
            </a>
            <a mat-list-item>
              <h4>Invoices</h4>
              <p>Invoices report with additional client data</p>
            </a>
            <a mat-list-item>
              <h4>Taxation</h4>
              <p>Tax totals, total awaiting collection, and total by tax rate</p>
            </a>
            <a mat-list-item>
              <h4>Aged receivables</h4>
              <p>Invoices that are late by 30, 60, and 90+ days</p>
            </a>
            <a mat-list-item>
              <h4>Bad debt</h4>
              <p>All invoices marked as bad debt</p>
            </a>
            <a mat-list-item>
              <h4>Client balance summary</h4>
              <p>Full list of customer account balances</p>
            </a>
          </mat-nav-list>
        </div>

        <div class="report-section">
          <h3>Work reports</h3>
          <mat-nav-list>
            <a mat-list-item>
              <h4>Visits</h4>
              <p>Visits report with additional custom field data</p>
            </a>
            <a mat-list-item>
              <h4>One-off jobs</h4>
              <p>One-off job report with additional client and job data</p>
            </a>
            <a mat-list-item>
              <h4>Recurring jobs</h4>
              <p>Recurring jobs report with additional client data</p>
            </a>
            <a mat-list-item>
              <h4>Requests</h4>
              <p>Requests and assessments report</p>
            </a>
            <a mat-list-item>
              <h4>Quotes</h4>
              <p>Quotes report with additional client data</p>
            </a>
            <a mat-list-item>
              <div class="flex-row">
                <div>
                  <h4>Salesperson performance</h4>
                  <p>Conversion rate information for each salesperson</p>
                </div>
                <span class="new-badge">NEW</span>
              </div>
            </a>
            <a mat-list-item>
              <h4>Products & Services</h4>
              <p>Full usage of products & services on quotes, jobs, and invoices</p>
            </a>
            <a mat-list-item>
              <h4>Waypoints</h4>
              <p>Full list of GPS waypoints logged</p>
            </a>
            <a mat-list-item>
              <h4>Timesheets</h4>
              <p>All time tracked for the team</p>
            </a>
          </mat-nav-list>
        </div>

        <div class="report-section">
          <h3>Client reports</h3>
          <mat-nav-list>
            <a mat-list-item>
              <h4>Client communications</h4>
              <p>All email messages sent through Jobber</p>
            </a>
            <a mat-list-item>
              <h4>Job follow-up emails</h4>
              <p>All job follow-up emails sent to clients</p>
            </a>
            <a mat-list-item>
              <h4>Client contact info</h4>
              <p>All clients and their contact info</p>
            </a>
            <a mat-list-item>
              <h4>Property list</h4>
              <p>All properties and their details</p>
            </a>
            <a mat-list-item>
              <h4>Client re-engagement</h4>
              <p>Detailed list of clients that haven't had a closed job in the past 12 months</p>
            </a>
          </mat-nav-list>
        </div>

        <div class="report-section">
          <h3>Expense reports</h3>
          <mat-nav-list>
            <a mat-list-item>
              <h4>Expenses</h4>
              <p>All tracked expenses and their details</p>
            </a>
          </mat-nav-list>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reports-container {
      padding: 20px;
    }
    .reports-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }
    .report-section {
      background: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .report-section h3 {
      color: #333;
      margin: 0 0 16px 0;
      font-size: 1.2rem;
      font-weight: 500;
    }
    mat-nav-list {
      padding: 0;
    }
    mat-nav-list a {
      border-bottom: 1px solid #eee;
    }
    mat-nav-list h4 {
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
      color: #2196f3;
    }
    mat-nav-list p {
      margin: 4px 0 0;
      font-size: 0.875rem;
      color: #666;
    }
    .flex-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }
    .new-badge {
      background: #e3f2fd;
      color: #2196f3;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
    }
  `]
})
export class ReportsComponent { }