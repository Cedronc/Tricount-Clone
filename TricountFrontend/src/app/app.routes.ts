import { canActivateClerk, catchAllRoute } from 'ngx-clerk';
import { Routes } from '@angular/router';
import { SignInPage } from '../sign-in-page/sign-in-page';
import { Dashboard } from '../dashboard/dashboard';
import { SignUpPage } from '../sign-up-page/sign-up-page';

export const routes: Routes = [
  { matcher: catchAllRoute('sign-in'), component: SignInPage },
  { matcher: catchAllRoute('sign-up'), component: SignUpPage },
  { path: 'dashboard', component: Dashboard, canActivate: [canActivateClerk] },

];
