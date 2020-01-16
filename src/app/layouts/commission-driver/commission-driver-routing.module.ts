import { CommissionDriverEditComponent } from './commission-driver-edit/commission-driver-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommissionDriverComponent } from './commission-driver.component';

const routes: Routes = [{ path: '', component: CommissionDriverComponent },
        ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionDriverRoutingModule { }
