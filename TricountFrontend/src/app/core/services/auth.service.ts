import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, firstValueFrom, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ClerkService, UserResource } from 'ngx-clerk';
import { toObservable } from '@angular/core/rxjs-interop';
import { User } from './user';
import { ApiService } from './api';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/users`;
  protected readonly clerk = inject(ClerkService);

  private readonly user$ = toObservable(this.clerk.user);

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error.message);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }

  constructor(
      private http: HttpClient,
      private apiService: ApiService,
  ) {}

  async getClerkUser(): Promise<UserResource> {
      return await firstValueFrom(
          this.user$.pipe(
              filter(user => user !== null && user !== undefined)
          )
      );
  }

  getRealUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl + "/me").pipe(
      catchError(this.handleError)
    )
  }


  syncUserWithBackend(user: UserResource | null): Observable<void> {
    if (!user) {
      return new Observable(observer => observer.complete());
    }

    const { id: clerkUserId, fullName } = user;
    console.log("fuckckkckck")
    console.log(user);
    
    return this.http.post<void>(`${this.apiUrl}`, { clerkUserId, name: fullName });
  }
}
