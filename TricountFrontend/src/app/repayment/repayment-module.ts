import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RepaymentList } from './repayment-list/repayment-list';
import { RepaymentSuggestions } from './repayment-suggestions/repayment-suggestions';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [RepaymentList, RepaymentSuggestions],
  imports: [CommonModule, RouterModule, SharedModule]
})
export class RepaymentModule {}
