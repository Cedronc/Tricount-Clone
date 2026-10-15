import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../../core/services/api';
import { StateService } from '../../../core/services/state';
import { Tricount } from '../../models/tricount.model';
import { Expense } from '../../../expense/models/expense.model';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-tricount-detail',
  styleUrl: './tricount-detail.css',
  templateUrl: './tricount-detail.html',
})
export class TricountDetail implements OnInit {
  tricount: Tricount | null = null;
  expenses: Expense[] = [];
  activeTab: 'expenses' | 'balances' = 'expenses';
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadTricount(id);
      }
    });
  }

  loadTricount(id: string): void {
    this.apiService.getTricount(id).subscribe({
      next: (tricount) => {
        this.tricount = tricount;
        this.stateService.setCurrentTricount(tricount);
        this.loadExpenses(id);
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadExpenses(tricountId: string): void {
    this.apiService.getExpenses(tricountId).subscribe({
      next: (expenses) => {
        this.expenses = expenses;
        this.stateService.setExpenses(expenses);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  get totalSpending(): number {
    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }
}
