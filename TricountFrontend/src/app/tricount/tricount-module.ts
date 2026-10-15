import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TricountDetail } from './tricount-detail/tricount-detail';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule, FormsModule, TricountDetail],
})
export class TricountModule {}
