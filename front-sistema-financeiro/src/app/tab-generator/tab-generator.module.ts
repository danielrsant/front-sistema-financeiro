import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AccountModule } from '../modules/auth/account/account.module';
import { CategoryModule } from '../modules/auth/category/category.module';
import { CustomizeModule } from '../modules/auth/customize/customize.module';
import { DashboardModule } from '../modules/auth/dashboard/dashboard.module';
import { HomeModule } from '../modules/auth/home/home.module';
import { ProfileModule } from '../modules/auth/profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { RendererComponent } from './renderer/renderer.component';
import { TabGeneratorComponent } from './tab-generator.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'index', component: TabGeneratorComponent },
  { path: ':endpoint', component: TabGeneratorComponent },
];

@NgModule({
  declarations: [
    TabGeneratorComponent,
    RendererComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PerfectScrollbarModule,
    // PAGES
    CustomizeModule,
    DashboardModule,
    HomeModule,
    CategoryModule,
    AccountModule,
    ProfileModule,
    //
    RouterModule.forChild(routes)
  ],
  exports: [
    TabGeneratorComponent,
    RendererComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ],
  bootstrap: []
})
export class TabGeneratorModule { }
