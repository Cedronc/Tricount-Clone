import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TricountList } from './tricount-list/tricount-list';
import { TricountDetail } from './tricount-detail/tricount-detail';
import { TricountForm } from './tricount-form/tricount-form';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [TricountList, TricountDetail, TricountForm],
  imports: [CommonModule, RouterModule, SharedModule]
})
export class TricountModule {}
