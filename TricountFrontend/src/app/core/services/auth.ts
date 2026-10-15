import { Injectable } from '@angular/core';
import { Clerk } from '@clerk/clerk-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clerk = new Clerk(import.meta.env.NG_APP_CLERK_PUBLISHABLE_KEY);

  async getCurrentUser() {
    return this.clerk.user;
  }

  async getUsers() {
    return this.clerk.users.getUserList();
  }
}
