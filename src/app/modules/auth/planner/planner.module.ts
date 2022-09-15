import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { PlannerComponent } from './planner.component';


@NgModule({
  declarations: [
    PlannerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class PlannerModule { }


