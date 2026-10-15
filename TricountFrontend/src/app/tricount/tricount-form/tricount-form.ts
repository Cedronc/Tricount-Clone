import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api';
import { Tricount } from '../models/tricount.model';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/services/user';

@Component({
  selector: 'app-tricount-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  styleUrl: './tricount-form.css',
  templateUrl: './tricount-form.html',
})
export class TricountForm implements OnInit {
  tricount: Omit<Tricount, 'id' | 'createdAt' | 'updatedAt'> = {
      name: '',
      emoji: '💰',
      currency: 'EUR',
      userIds: [],
      totalSpending: 0,
      userBalance: 0,
      isArchived: false,
      participants: []
  };

  availableUsers: { id: string; name: string; email: string }[] = [];
  availableEmojis = ['💰', '🏠', '🚗', '🌍', '🎉', '🍔', '🏖️', '🎓', '🏥', '🐶'];
  availableCurrencies = ['EUR', 'USD', 'GBP', 'JPY', 'CAD', 'AUD'];
  errors: { name?: string; participants?: string } = {};

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // const users = await this.authService.getUsers();
    // this.availableUsers = users.map(user => ({
    //   id: user.id,
    //   name: `${user.firstName} ${user.lastName}`,
    //   email: user.emailAddresses[0]?.emailAddress || ''
    // }));
  }

  validate(): boolean {
    this.errors = {};
    let isValid = true;

    if (!this.tricount.name.trim()) {
      this.errors.name = 'Name is required';
      isValid = false;
    }

    return isValid;
  }

  async onSubmit() {
    if (!this.validate()) return;
    this.authService.getRealUser().subscribe((user : User) => {
        this.tricount.userIds.push(user.id)
        this.apiService.createTricount(this.tricount).subscribe({
          next: (tricount) => this.router.navigate(['/tricounts', tricount.id]),
          error: (err) => console.error('Failed to create tricount:', err)
        });
    })

  }
}
