import { ChauffeurListComponent } from './chauffeur-list/chauffeur-list.component';
import { ChauffeurEditComponent } from './chauffeur-edit/chauffeur-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChauffeurComponent } from './chauffeur.component';

const routes: Routes = [{ path: '', component: ChauffeurComponent },
{ path: 'edit', component: ChauffeurEditComponent },
{ path: 'edit/:id', component: ChauffeurEditComponent },
{ path: 'list', component: ChauffeurListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChauffeurRoutingModule { }
