import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tricount } from '../../tricount/models/tricount.model';
import { Expense } from '../../expense/models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/tricounts';
  private expenseUrl = 'http://localhost:3000/api/expenses';

  constructor(private http: HttpClient) {}

  getTricounts(): Observable<Tricount[]> {
    return this.http.get<Tricount[]>(this.apiUrl);
  }

  getTricount(id: string): Observable<Tricount> {
    return this.http.get<Tricount>(`${this.apiUrl}/${id}`);
  }

  createTricount(tricount: Omit<Tricount, 'id' | 'createdAt' | 'updatedAt'>): Observable<Tricount> {
    return this.http.post<Tricount>(this.apiUrl, tricount);
  }

  getExpenses(tricountId: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.expenseUrl}?tricountId=${tricountId}`);
  }

  createExpense(expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Observable<Expense> {
    return this.http.post<Expense>(this.expenseUrl, expense);
  }
}
