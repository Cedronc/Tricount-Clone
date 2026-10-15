import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Expense } from '../models/expense.model';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-expense-list',
  styleUrl: './expense-list.css',
  templateUrl: './expense-list.html',
})
export class ExpenseList implements OnChanges {
  @Input() expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  sortDirection: 'asc' | 'desc' = 'desc';
  filterText: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenses']) {
      this.filteredExpenses = this.sortExpenses([...this.expenses]);
    }
  }

  sortExpenses(expenses: Expense[]): Expense[] {
    return expenses.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  toggleSort(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filteredExpenses = this.sortExpenses([...this.filteredExpenses]);
  }

  applyFilter(): void {
    if (!this.filterText) {
      this.filteredExpenses = this.sortExpenses([...this.expenses]);
      return;
    }
    const lowerFilter = this.filterText.toLowerCase();
    this.filteredExpenses = this.sortExpenses([
      ...this.expenses.filter(expense =>
        expense.description.toLowerCase().includes(lowerFilter) ||
        expense.payer.name.toLowerCase().includes(lowerFilter)
      )
    ]);
  }
}
