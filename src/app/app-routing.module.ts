import { AuthGuard } from './shared/guards/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [

  { path: '', loadChildren: () => import('./index/index.module').then(m => m.IndexModule), canActivate: [AuthGuard] },
  { path: 'core', loadChildren: () => import('./layouts/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'not-found', loadChildren: () => import('./error-404/error-404.module').then(m => m.Error404Module) },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full'  },

  { path: 'dashboards', loadChildren: () => import('./layouts/dashboards/dashboards.module').then(m => m.DashboardsModule) },





];

@NgModule({
  declarations: [

  ],
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [
    RouterModule,
  ]
})

export class AppRoutingModule { }
