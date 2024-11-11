import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Job, JobStatus } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobs = new BehaviorSubject<Job[]>([]);
  private lastJobNumber = 0;

  getJobs(): Observable<Job[]> {
    return this.jobs.asObservable();
  }

  getJobsByClient(clientId: string): Observable<Job[]> {
    return new BehaviorSubject(
      this.jobs.getValue().filter(job => job.clientId === clientId)
    ).asObservable();
  }

  addJob(job: Partial<Job>): Job {
    const currentJobs = this.jobs.getValue();
    const newJob: Job = {
      ...job,
      id: Date.now().toString(),
      jobNumber: this.generateJobNumber(),
      status: JobStatus.DRAFT,
      total: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Job;

    this.jobs.next([...currentJobs, newJob]);
    return newJob;
  }

  updateJob(updatedJob: Job): void {
    const currentJobs = this.jobs.getValue();
    const index = currentJobs.findIndex(j => j.id === updatedJob.id);
    if (index !== -1) {
      updatedJob.updatedAt = new Date();
      currentJobs[index] = updatedJob;
      this.jobs.next([...currentJobs]);
    }
  }

  deleteJob(jobId: string): void {
    const currentJobs = this.jobs.getValue();
    this.jobs.next(currentJobs.filter(j => j.id !== jobId));
  }

  getJobById(jobId: string): Job | undefined {
    return this.jobs.getValue().find(j => j.id === jobId);
  }

  private generateJobNumber(): string {
    this.lastJobNumber++;
    return `JOB-${String(this.lastJobNumber).padStart(5, '0')}`;
  }
}