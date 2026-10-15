import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api';
import { Tricount } from '../models/tricount.model';

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
    participants: [],
    totalSpending: 0,
    userBalance: 0,
    isArchived: false
  };

  availableUsers: { id: string; name: string; email: string }[] = [];
  availableEmojis = ['💰', '🏠', '🚗', '🌍', '🎉', '🍔', '🏖️', '🎓', '🏥', '🐶'];
  availableCurrencies = ['EUR', 'USD', 'GBP', 'JPY', 'CAD', 'AUD'];
  errors: { name?: string; participants?: string } = {};

  constructor(
    private apiService: ApiService,
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

    if (this.tricount.participants.length < 2) {
      this.errors.participants = 'At least 2 participants are required';
      isValid = false;
    }

    return isValid;
  }

  toggleParticipant(userId: string): void {
    const index = this.tricount.participants.findIndex(p => p.id === userId);
    if (index === -1) {
      const user = this.availableUsers.find(u => u.id === userId);
      if (user) this.tricount.participants.push(user);
    } else {
      this.tricount.participants.splice(index, 1);
    }
  }

  isParticipantSelected(userId: string): boolean {
    return this.tricount.participants.some(p => p.id === userId);
  }

  onSubmit(): void {
    if (!this.validate()) return;

    this.apiService.createTricount(this.tricount).subscribe({
      next: (tricount) => this.router.navigate(['/tricounts', tricount.id]),
      error: (err) => console.error('Failed to create tricount:', err)
    });
  }
}
