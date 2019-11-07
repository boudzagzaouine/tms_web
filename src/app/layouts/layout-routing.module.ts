import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'sample', loadChildren: () => import('./sample/sample.module').then(m => m.SampleModule) },
      { path: 'badge', loadChildren: () => import('./badge/badge.module').then(m => m.BadgeModule) },



    ]
  }];

@NgModule({
  declarations: [

  ],
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
  ]
})

export class AppLayoutRoutingModule { }
