import { AuthGuard } from './shared/guards/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', loadChildren: () => import('./index/index.module').then(m => m.IndexModule), canActivate: [AuthGuard] },
  { path: 'core', loadChildren: () => import('./layouts/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '**', loadChildren: () => import('./error-404/error-404.module').then(m => m.Error404Module) },

];

@NgModule({
  declarations: [

  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
  ]
})

export class AppRoutingModule { }
