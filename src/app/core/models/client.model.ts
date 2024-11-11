export interface Client {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  properties?: Property[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Property {
  id?: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  notes?: string;
  isDefault?: boolean;
}