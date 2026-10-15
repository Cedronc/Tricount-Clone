import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api';
import { StateService } from '../../core/services/state';
import { Tricount } from '../models/tricount.model';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-tricount-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SpinnerComponent],
  styleUrl: './tricount-list.css',
  templateUrl: './tricount-list.html',
})
export class TricountList implements OnInit {
  tricounts: Tricount[] = [];
  isLoading: Boolean = true;

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.apiService.getTricounts().subscribe(tricounts => {
      this.tricounts = tricounts;
      this.stateService.setTricounts(tricounts);
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }
}
