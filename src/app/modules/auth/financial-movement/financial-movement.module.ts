import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { FormComponent } from './form/form.component';
import { FinancialMovementComponent } from './index/index.component';

@NgModule({
  declarations: [FinancialMovementComponent, FormComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class FinancialMovementModule { }
