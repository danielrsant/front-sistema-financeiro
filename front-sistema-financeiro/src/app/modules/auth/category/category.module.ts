import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormComponent } from './form/form.component';
import { CategoryComponent } from './index/index.component';

@NgModule({
  declarations: [
    CategoryComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class CategoryModule { }
