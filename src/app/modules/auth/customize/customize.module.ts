import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CustomizeComponent } from './customize.component';

@NgModule({
  declarations: [CustomizeComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class CustomizeModule { }
