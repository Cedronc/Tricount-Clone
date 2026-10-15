import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api';
import { StateService } from './services/state';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService, StateService]
})
export class CoreModule {}
