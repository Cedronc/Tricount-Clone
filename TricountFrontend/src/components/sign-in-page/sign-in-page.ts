import { Component } from '@angular/core';
import { ClerkSignInComponent } from 'ngx-clerk';

@Component({
  imports: [ClerkSignInComponent],
  selector: 'app-sign-in-page',
  styleUrl: './sign-in-page.css',
  templateUrl: './sign-in-page.html',
})
export class SignInPage {}
