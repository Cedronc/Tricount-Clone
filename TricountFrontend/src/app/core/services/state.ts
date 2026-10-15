import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tricount } from '../../tricount/models/tricount.model';
import { Expense } from '../../expense/models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private tricountsSubject = new BehaviorSubject<Tricount[]>([]);
  private showArchivedSubject = new BehaviorSubject<boolean>(false);
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  private currentTricountSubject = new BehaviorSubject<Tricount | null>(null);

  tricounts$: Observable<Tricount[]> = this.tricountsSubject.asObservable();
  showArchived$: Observable<boolean> = this.showArchivedSubject.asObservable();
  expenses$: Observable<Expense[]> = this.expensesSubject.asObservable();
  currentTricount$: Observable<Tricount | null> = this.currentTricountSubject.asObservable();

  setTricounts(tricounts: Tricount[]): void {
    this.tricountsSubject.next(tricounts);
  }

  setShowArchived(show: boolean): void {
    this.showArchivedSubject.next(show);
  }

  setExpenses(expenses: Expense[]): void {
    this.expensesSubject.next(expenses);
  }

  setCurrentTricount(tricount: Tricount | null): void {
    this.currentTricountSubject.next(tricount);
  }
}
