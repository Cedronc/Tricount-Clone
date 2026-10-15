import { canActivateClerk, catchAllRoute } from 'ngx-clerk';
import { Routes } from '@angular/router';
import { SignInPage } from '../components/sign-in-page/sign-in-page';
import { SignUpPage } from '../components/sign-up-page/sign-up-page';
import { TricountList } from './tricount/tricount-list/tricount-list';
import { TricountDetail } from './tricount/tricount-detail/tricount-detail';
import { TricountForm } from './tricount/tricount-form/tricount-form';
import { ExpenseList } from './expense/expense-list/expense-list';
import { ExpenseForm } from './expense/expense-form/expense-form';
import { RepaymentSuggestions } from './repayment/repayment-suggestions/repayment-suggestions';

export const routes: Routes = [
  { matcher: catchAllRoute('sign-in'), component: SignInPage },
  { matcher: catchAllRoute('sign-up'), component: SignUpPage },
  { path: '', redirectTo: '/tricounts', pathMatch: 'full' },
  { path: 'tricounts', component: TricountList, canActivate: [canActivateClerk] },
  { path: 'tricounts/new', component: TricountForm, canActivate: [canActivateClerk] },
  { path: 'tricounts/:id', component: TricountDetail, canActivate: [canActivateClerk] },
  { path: 'tricounts/:id/expenses', component: ExpenseList, canActivate: [canActivateClerk] },
  { path: 'tricounts/:id/expenses/new', component: ExpenseForm, canActivate: [canActivateClerk] },
  { path: 'tricounts/:id/repayments', component: RepaymentSuggestions, canActivate: [canActivateClerk] },
];
