import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api';
import { StateService } from '../../core/services/state';
import { Tricount } from '../models/tricount.model';

@Component({
  selector: 'app-tricount-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrl: './tricount-list.css',
  templateUrl: './tricount-list.html',
})
export class TricountList implements OnInit {
  tricounts: Tricount[] = [];
  filteredTricounts: Tricount[] = [];
  showArchived = false;

  constructor(
    private apiService: ApiService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.apiService.getTricounts().subscribe(tricounts => {
      this.tricounts = tricounts;
      this.stateService.setTricounts(tricounts);
      this.filterTricounts();
    });

    this.stateService.showArchived$.subscribe(show => {
      this.showArchived = show;
      this.filterTricounts();
    });
  }

  filterTricounts(): void {
    this.filteredTricounts = this.showArchived
      ? this.tricounts
      : this.tricounts.filter(t => !t.isArchived);
  }

  toggleArchived(): void {
    this.stateService.setShowArchived(!this.showArchived);
  }
}
