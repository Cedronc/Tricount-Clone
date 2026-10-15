import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api';
import { StateService } from '../../core/services/state';
import { Tricount } from '../../tricount/models/tricount.model';

interface Repayment {
  payer: { id: string; name: string; email: string };
  recipient: { id: string; name: string; email: string };
  amount: number;
  completed: boolean;
}

@Component({
  imports: [CommonModule],
  selector: 'app-repayment-suggestions',
  styleUrl: './repayment-suggestions.css',
  templateUrl: './repayment-suggestions.html',
  standalone: true,
})
export class RepaymentSuggestions implements OnInit {
  tricount: Tricount | null = null;
  repayments: Repayment[] = [];
  loading = false;
  error = '';

  constructor(
    private api: ApiService,
    private state: StateService
  ) {}

  ngOnInit() {
    this.state.currentTricount$.subscribe(tricount => {
      if (tricount) {
        this.tricount = tricount;
        this.loadRepayments();
      }
    });
  }

  async loadRepayments() {
    if (!this.tricount) return;

    this.loading = true;
    this.error = '';
    try {
      // In a real app, this would be an API call to fetch repayments
      // For now, we'll simulate it with mock data
      this.repayments = this.calculateRepayments();
    } catch (err) {
      this.error = 'Failed to load repayments';
    } finally {
      this.loading = false;
    }
  }

  calculateRepayments(): Repayment[] {
    if (!this.tricount) return [];

    // Simplified repayment calculation logic
    // In a real app, this would be done server-side
    const balances: { [key: string]: number } = {};
    this.tricount.participants.forEach(p => {
      balances[p.id] = 0; // Initialize balances
    });

    // This is a placeholder for actual balance calculation
    // based on expenses
    return [
      {
        payer: this.tricount.participants[1],
        recipient: this.tricount.participants[0],
        amount: 25.50,
        completed: false
      },
      {
        payer: this.tricount.participants[2],
        recipient: this.tricount.participants[0],
        amount: 12.75,
        completed: false
      }
    ];
  }

  async markAsCompleted(repayment: Repayment) {
    if (!this.tricount) return;

    try {
      // In a real app, this would be an API call
      repayment.completed = true;
    } catch (err) {
      this.error = 'Failed to update repayment';
    }
  }
}
