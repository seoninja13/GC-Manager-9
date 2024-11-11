import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav mode="side" opened>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard">
            <mat-icon>dashboard</mat-icon>
            <span>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/clients">
            <mat-icon>people</mat-icon>
            <span>Clients</span>
          </a>
          <a mat-list-item routerLink="/jobs">
            <mat-icon>work</mat-icon>
            <span>Jobs</span>
          </a>
          <a mat-list-item routerLink="/invoices">
            <mat-icon>receipt</mat-icon>
            <span>Invoices</span>
          </a>
          <a mat-list-item routerLink="/reports">
            <mat-icon>bar_chart</mat-icon>
            <span>Reports</span>
          </a>
          <a mat-list-item routerLink="/expenses">
            <mat-icon>attach_money</mat-icon>
            <span>Expenses</span>
          </a>
          <a mat-list-item routerLink="/timesheets">
            <mat-icon>access_time</mat-icon>
            <span>Timesheets</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>GC App</span>
        </mat-toolbar>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    mat-sidenav-container {
      height: 100vh;
    }
    mat-sidenav {
      width: 250px;
    }
    mat-sidenav-content {
      padding: 20px;
    }
    mat-nav-list a {
      display: flex;
      align-items: center;
      gap: 16px;
      height: 48px;
    }
    mat-nav-list mat-icon {
      margin-right: 8px;
    }
  `]
})
export class AppComponent {
  title = 'GC App';
}