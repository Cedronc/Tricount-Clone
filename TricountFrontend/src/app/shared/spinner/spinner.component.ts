import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  styleUrl: './spinner.component.css',
  template: `
    <div class="spinner-container">
      <div class="spinner"></div>
    </div>
  `
})
export class SpinnerComponent {}
