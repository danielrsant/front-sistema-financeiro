import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [
    SidebarComponent,
    SidebarItemComponent
  ],
  exports: [
    SidebarComponent
  ]
})

export class ComponentsModule { }
