import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clients = new BehaviorSubject<Client[]>([]);

  getClients(): Observable<Client[]> {
    return this.clients.asObservable();
  }

  addClient(client: Client): void {
    const currentClients = this.clients.getValue();
    client.id = Date.now().toString(); // Temporary ID generation
    client.createdAt = new Date();
    client.updatedAt = new Date();
    this.clients.next([...currentClients, client]);
  }

  updateClient(updatedClient: Client): void {
    const currentClients = this.clients.getValue();
    const index = currentClients.findIndex(c => c.id === updatedClient.id);
    if (index !== -1) {
      updatedClient.updatedAt = new Date();
      currentClients[index] = updatedClient;
      this.clients.next([...currentClients]);
    }
  }

  deleteClient(clientId: string): void {
    const currentClients = this.clients.getValue();
    this.clients.next(currentClients.filter(c => c.id !== clientId));
  }

  getClientById(clientId: string): Client | undefined {
    return this.clients.getValue().find(c => c.id === clientId);
  }
}