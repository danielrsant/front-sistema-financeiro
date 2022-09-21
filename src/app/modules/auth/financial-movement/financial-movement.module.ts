import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { FinancialMovementComponent } from './financial-movement.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [FinancialMovementComponent, FormComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class FinancialMovementModule { }
