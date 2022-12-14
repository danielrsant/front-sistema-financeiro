import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutNoAuthComponent } from './layout/layout-no-auth/layout-no-auth.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        component: LayoutComponent,
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: '',
        component: LayoutNoAuthComponent,
        loadChildren: () => import('./modules/not-auth/not-auth.module').then(m => m.NotAuthModule)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
