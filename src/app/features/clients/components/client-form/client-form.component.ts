import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/models/client.model';

@Component({
  selector: 'app-client-form',
  template: `
    <div class="client-form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditing ? 'Edit Client' : 'Add New Client' }}</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="clientForm" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Client Name</mat-label>
                <input matInput formControlName="name" placeholder="Enter client name">
                <mat-error *ngIf="clientForm.get('name')?.hasError('required')">
                  Name is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" type="email" placeholder="Enter email">
                <mat-error *ngIf="clientForm.get('email')?.hasError('email')">
                  Please enter a valid email
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Phone</mat-label>
                <input matInput formControlName="phone" placeholder="Enter phone number">
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Company (Optional)</mat-label>
                <input matInput formControlName="company" placeholder="Enter company name">
              </mat-form-field>
            </div>

            <div formGroupName="address">
              <h3>Address</h3>
              
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Street</mat-label>
                  <input matInput formControlName="street" placeholder="Enter street address">
                </mat-form-field>
              </div>

              <div class="form-row three-columns">
                <mat-form-field appearance="outline">
                  <mat-label>City</mat-label>
                  <input matInput formControlName="city" placeholder="Enter city">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>State</mat-label>
                  <input matInput formControlName="state" placeholder="Enter state">
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>ZIP Code</mat-label>
                  <input matInput formControlName="zip" placeholder="Enter ZIP code">
                </mat-form-field>
              </div>
            </div>

            <div class="form-actions">
              <button mat-button type="button" (click)="onCancel()">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="clientForm.invalid">
                {{ isEditing ? 'Update' : 'Create' }} Client
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .client-form-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }

    .form-row {
      margin-bottom: 16px;
    }

    .form-row mat-form-field {
      width: 100%;
    }

    .three-columns {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    h3 {
      margin: 24px 0 16px;
      color: #666;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 24px;
    }
  `]
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isEditing = false;
  clientId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [''],
      company: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['']
      })
    });
  }

  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get('id');
    if (this.clientId) {
      this.isEditing = true;
      const client = this.clientService.getClientById(this.clientId);
      if (client) {
        this.clientForm.patchValue(client);
      }
    }
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value;
      
      if (this.isEditing && this.clientId) {
        this.clientService.updateClient({
          ...clientData,
          id: this.clientId
        });
      } else {
        this.clientService.addClient(clientData);
      }
      
      this.router.navigate(['/clients']);
    }
  }

  onCancel() {
    this.router.navigate(['/clients']);
  }
}