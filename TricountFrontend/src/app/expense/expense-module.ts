import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExpenseList } from './expense-list/expense-list';
import { ExpenseDetail } from './expense-detail/expense-detail';
import { ExpenseForm } from './expense-form/expense-form';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule, ExpenseList, ExpenseForm],
})
export class ExpenseModule {}
