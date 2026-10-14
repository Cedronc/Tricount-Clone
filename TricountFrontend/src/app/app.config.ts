import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClerk } from 'ngx-clerk';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClerk({
      publishableKey: 'pk_test_bGl2aW5nLW11c2tveC0yODEwLmNsZXJrLmFjY291bnRzLmRldiQ',
      signInUrl: '/sign-in',
      signUpUrl: '/sign-up',
    }),
  ]
};
