import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormComponent } from './form/form.component';
import { AccountComponent } from './index/index.component';

@NgModule({
  declarations: [AccountComponent, FormComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class AccountModule { }
