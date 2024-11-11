import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice, InvoiceStatus } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private invoices = new BehaviorSubject<Invoice[]>([]);
  private lastInvoiceNumber = 0;

  getInvoices(): Observable<Invoice[]> {
    return this.invoices.asObservable();
  }

  getInvoicesByClient(clientId: string): Observable<Invoice[]> {
    return new BehaviorSubject(
      this.invoices.getValue().filter(invoice => invoice.clientId === clientId)
    ).asObservable();
  }

  getInvoicesByJob(jobId: string): Observable<Invoice[]> {
    return new BehaviorSubject(
      this.invoices.getValue().filter(invoice => invoice.jobId === jobId)
    ).asObservable();
  }

  addInvoice(invoice: Partial<Invoice>): Invoice {
    const currentInvoices = this.invoices.getValue();
    const newInvoice: Invoice = {
      ...invoice,
      id: Date.now().toString(),
      invoiceNumber: this.generateInvoiceNumber(),
      status: InvoiceStatus.DRAFT,
      items: invoice.items || [],
      subtotal: 0,
      tax: 0,
      total: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Invoice;

    this.invoices.next([...currentInvoices, newInvoice]);
    return newInvoice;
  }

  updateInvoice(updatedInvoice: Invoice): void {
    const currentInvoices = this.invoices.getValue();
    const index = currentInvoices.findIndex(i => i.id === updatedInvoice.id);
    if (index !== -1) {
      updatedInvoice.updatedAt = new Date();
      currentInvoices[index] = updatedInvoice;
      this.invoices.next([...currentInvoices]);
    }
  }

  deleteInvoice(invoiceId: string): void {
    const currentInvoices = this.invoices.getValue();
    this.invoices.next(currentInvoices.filter(i => i.id !== invoiceId));
  }

  getInvoiceById(invoiceId: string): Invoice | undefined {
    return this.invoices.getValue().find(i => i.id === invoiceId);
  }

  private generateInvoiceNumber(): string {
    this.lastInvoiceNumber++;
    return `INV-${String(this.lastInvoiceNumber).padStart(5, '0')}`;
  }
}