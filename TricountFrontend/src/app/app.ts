import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
    ClerkLoadingDirective,
  ClerkService,
  ClerkSignedInDirective,
  ClerkSignedOutDirective,
  ClerkUserButtonComponent,
  UserResource
} from 'ngx-clerk';
import { AuthService } from './core/services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  imports: [RouterOutlet, RouterLink, ClerkSignedInDirective, ClerkSignedOutDirective, ClerkUserButtonComponent, ClerkLoadingDirective],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('TricountFrontend');
  protected readonly clerk = inject(ClerkService);


  constructor(private authService: AuthService) {

  }

  async ngOnInit() {
    // try {
    //     var user = this.authService.getClerkUser();
    //   if (user) {
    //     this.authService.syncUserWithBackend(await user).subscribe();
    //   }
    // } catch (error) {
    //   console.error('Failed to sync user:', error);
    // }
  }
}
