import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from '../../../../core/models/client.model';
import { Job } from '../../../../core/models/job.model';
import { ClientService } from '../../../../core/services/client.service';
import { JobService } from '../../../../core/services/job.service';

@Component({
  selector: 'app-job-form',
  template: `
    <div class="job-form-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditing ? 'Edit Job' : 'Create New Job' }}</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="jobForm" (ngSubmit)="onSubmit()">
            <div class="form-row" *ngIf="!clientId">
              <mat-form-field appearance="outline">
                <mat-label>Client</mat-label>
                <mat-select formControlName="clientId" required>
                  <mat-option *ngFor="let client of clients$ | async" [value]="client.id">
                    {{client.name}}
                  </mat-option>
                </mat-select>
                <mat-error *ngIf="jobForm.get('clientId')?.hasError('required')">
                  Client is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Job Title</mat-label>
                <input matInput formControlName="title" placeholder="Enter job title">
                <mat-error *ngIf="jobForm.get('title')?.hasError('required')">
                  Title is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Description</mat-label>
                <textarea matInput formControlName="description" rows="4" 
                  placeholder="Enter job description"></textarea>
              </mat-form-field>
            </div>

            <div class="form-row two-columns">
              <mat-form-field appearance="outline">
                <mat-label>Start Date</mat-label>
                <input matInput [matDatepicker]="startPicker" formControlName="startDate">
                <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
                <mat-datepicker #startPicker></mat-datepicker>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>End Date</mat-label>
                <input matInput [matDatepicker]="endPicker" formControlName="endDate">
                <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
                <mat-datepicker #endPicker></mat-datepicker>
              </mat-form-field>
            </div>

            <div class="form-actions">
              <button mat-button type="button" (click)="onCancel()">Cancel</button>
              <button mat-raised-button color="primary" type="submit" 
                [disabled]="jobForm.invalid">
                {{ isEditing ? 'Update' : 'Create' }} Job
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .job-form-container {
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

    .two-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 24px;
    }
  `]
})
export class JobFormComponent implements OnInit {
  jobForm: FormGroup;
  isEditing = false;
  jobId: string | null = null;
  clientId: string | null = null;
  clients$: Observable<Client[]>;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clients$ = this.clientService.getClients();
    this.jobForm = this.fb.group({
      clientId: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      startDate: [null],
      endDate: [null]
    });
  }

  ngOnInit() {
    this.clientId = this.route.snapshot.queryParamMap.get('clientId');
    if (this.clientId) {
      this.jobForm.patchValue({ clientId: this.clientId });
      this.jobForm.get('clientId')?.disable();
    }

    this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.isEditing = true;
      const job = this.jobService.getJobById(this.jobId);
      if (job) {
        this.jobForm.patchValue({
          clientId: job.clientId,
          title: job.title,
          description: job.description,
          startDate: job.schedule?.startDate,
          endDate: job.schedule?.endDate
        });
      }
    }
  }

  onSubmit() {
    if (this.jobForm.valid) {
      const formValue = this.jobForm.getRawValue();
      const jobData = {
        clientId: formValue.clientId,
        title: formValue.title,
        description: formValue.description,
        schedule: {
          startDate: formValue.startDate,
          endDate: formValue.endDate
        }
      };

      if (this.isEditing && this.jobId) {
        this.jobService.updateJob({
          ...jobData,
          id: this.jobId
        } as Job);
      } else {
        this.jobService.addJob(jobData);
      }

      this.router.navigate(['/jobs']);
    }
  }

  onCancel() {
    this.router.navigate(['/jobs']);
  }
}