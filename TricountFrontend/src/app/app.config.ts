import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClerk } from 'ngx-clerk';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { clerkAuthInterceptor } from './core/clerk-intercepter';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClerk({
      publishableKey: environment.clerkPublishableKey,
      signInUrl: '/sign-in',
      signUpUrl: '/sign-up',
    }),
    provideHttpClient(withInterceptors([clerkAuthInterceptor])),
  ],
};
