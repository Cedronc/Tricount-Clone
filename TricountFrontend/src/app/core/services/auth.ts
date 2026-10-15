import { Injectable } from '@angular/core';
import { ClerkService } from 'ngx-clerk';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailAddresses: { emailAddress: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUsers: User[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      emailAddresses: [{ emailAddress: 'john.doe@example.com' }]
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      emailAddresses: [{ emailAddress: 'jane.smith@example.com' }]
    },
    {
      id: '3',
      firstName: 'Bob',
      lastName: 'Johnson',
      emailAddresses: [{ emailAddress: 'bob.johnson@example.com' }]
    }
  ];

  async getCurrentUser(): Promise<User | null> {
    return this.mockUsers[0] || null;
  }

  async getUsers(): Promise<User[]> {
    return this.mockUsers;
  }
}
