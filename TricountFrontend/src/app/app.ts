import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
    ClerkService,
  ClerkSignedInDirective,
  ClerkSignedOutDirective,
  ClerkUserButtonComponent,
  UserResource
} from 'ngx-clerk';
import { AuthService } from './core/services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, firstValueFrom } from 'rxjs';

@Component({
  imports: [RouterOutlet, RouterLink, ClerkSignedInDirective, ClerkSignedOutDirective, ClerkUserButtonComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('TricountFrontend');
  protected readonly clerk = inject(ClerkService);

  jwt: string | null = ""

  constructor(private authService: AuthService) {}

  async ngOnInit() {
  this.jwt = await this.clerk.getToken();
    try {
        var user = this.authService.getClerkUser();
      if (user) {
        this.authService.syncUserWithBackend(await user).subscribe();
      }
    } catch (error) {
      console.error('Failed to sync user:', error);
    }
  }
}
