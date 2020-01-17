import { ConsomptionDriverListComponent } from './consomption-driver-list/consomption-driver-list.component';
import { ConsomationDriverEditComponent } from './consomation-driver-edit/consomation-driver-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsomptionDriverComponent } from './consomption-driver.component';

const routes: Routes = [{ path: '', component: ConsomptionDriverComponent },
                        { path: 'edit', component: ConsomationDriverEditComponent },
                        { path: 'edit/:id', component: ConsomptionDriverComponent },
                        { path: 'list', component: ConsomptionDriverListComponent }
                       ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsomptionDriverRoutingModule { }
