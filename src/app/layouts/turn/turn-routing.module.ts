import { TurnEditComponent } from './turn-edit/turn-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TurnComponent } from './turn.component';

const routes: Routes = [{ path: '', component: TurnComponent },
                        { path: 'edit', component: TurnEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnRoutingModule { }
