import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../../../shared/shared.module';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { FormComponent } from './form/form.component';
import { ObjectiveComponent } from './objective.component';

@NgModule({
  declarations: [
    ObjectiveComponent,
    FormComponent,
    FormDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
  ],
})
export class ObjectiveModule { }
