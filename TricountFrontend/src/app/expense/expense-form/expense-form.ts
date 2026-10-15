import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api';
import { StateService } from '../../core/services/state';
import { AuthService } from '../../core/services/auth';
import { Tricount } from '../../tricount/models/tricount.model';
import { Expense } from '../models/expense.model';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-expense-form',
  styleUrl: './expense-form.css',
  templateUrl: './expense-form.html',
  standalone: true,
})
export class ExpenseForm implements OnInit {
  tricount: Tricount | null = null;
  description = '';
  amount = 0;
  payer: { id: string; name: string; email: string } | null = null;
  participants: { id: string; name: string; email: string }[] = [];
  allParticipants: { id: string; name: string; email: string }[] = [];
  splitMethod: 'equal' | 'custom' = 'equal';
  customSplits: { [key: string]: number } = {};
  error = '';

  constructor(
    private api: ApiService,
    private state: StateService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const tricountId = params.get('tricountId');
      if (tricountId) {
        this.state.currentTricount$.subscribe(tricount => {
          if (tricount) {
            this.tricount = tricount;
            this.allParticipants = tricount.participants;
            this.participants = [...tricount.participants];
          }
        });
      }
    });
  }

  toggleParticipant(participantId: string) {
    const index = this.participants.findIndex(p => p.id === participantId);
    if (index === -1) {
      const participant = this.allParticipants.find(p => p.id === participantId);
      if (participant) this.participants.push(participant);
    } else {
      this.participants.splice(index, 1);
    }
    this.resetCustomSplits();
  }

  resetCustomSplits() {
    this.customSplits = {};
    this.participants.forEach(p => {
      this.customSplits[p.id] = 0;
    });
  }

  validateSplits() {
    if (this.splitMethod === 'custom') {
      const total = Object.values(this.customSplits).reduce((sum, val) => sum + val, 0);
      return Math.abs(total - this.amount) < 0.01;
    }
    return true;
  }

  async submit() {
    if (!this.tricount || !this.payer || this.participants.length === 0) {
      this.error = 'Please fill all required fields';
      return;
    }

    if (!this.validateSplits()) {
      this.error = 'Custom splits do not add up to the total amount';
      return;
    }

    const expenseData = {
      tricountId: this.tricount.id,
      description: this.description,
      amount: this.amount,
      payer: this.payer,
      participants: this.participants,
      splitMethod: this.splitMethod,
      customSplits: this.splitMethod === 'custom' ? this.customSplits : {},
      date: new Date().toISOString(),
    };

    try {
      await this.api.createExpense(expenseData).toPromise();
      this.router.navigate([`/tricount/${this.tricount.id}/expenses`]);
    } catch (err) {
      this.error = 'Failed to create expense';
    }
  }
}
