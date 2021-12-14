import { DeliveryComponent } from './turn-list/delivery/delivery.component';
import { TurnListComponent } from './turn-list/turn-list.component';
import { TurnEditComponent } from './turn-edit/turn-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurnComponent } from './turn.component';

const routes: Routes = [{ path: '', component: TurnComponent },
                        { path: 'edit', component: TurnEditComponent },
                        { path: 'edit/:id', component: TurnEditComponent },

                        { path: 'list', component: TurnListComponent },
                        { path: 'turn/:id', component: DeliveryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnRoutingModule { }
