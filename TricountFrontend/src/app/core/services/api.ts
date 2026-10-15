import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tricount } from '../../tricount/models/tricount.model';
import { Expense } from '../../expense/models/expense.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = `${environment.apiUrl}/tricounts`;
  private expenseUrl = `${environment.apiUrl}/expenses`;

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error.message);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }

  constructor(private http: HttpClient) {}

  getTricounts(): Observable<Tricount[]> {
    return this.http.get<Tricount[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getTricount(id: string): Observable<Tricount> {
    return this.http.get<Tricount>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createTricount(tricount: Omit<Tricount, 'id' | 'createdAt' | 'updatedAt'>): Observable<Tricount> {
    return this.http.post<Tricount>(this.apiUrl, tricount).pipe(
      catchError(this.handleError)
    );
  }

  getExpenses(tricountId: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.expenseUrl}?tricountId=${tricountId}`).pipe(
      catchError(this.handleError)
    );
  }

  createExpense(expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Observable<Expense> {
    return this.http.post<Expense>(this.expenseUrl, expense).pipe(
      catchError(this.handleError)
    );
  }
}
