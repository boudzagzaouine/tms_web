import { MachineListComponent } from './machine-list/machine-list.component';
import { MachineEditComponent } from './machine-edit/machine-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MachineComponent } from './machine.component';

const routes: Routes = [{ path: '', component: MachineComponent, pathMatch: 'full' },
                         {path: 'edit', component: MachineEditComponent},
                         {path: 'edit/:id', component: MachineEditComponent},
                         {path: 'list', component: MachineListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachineRoutingModule { }
