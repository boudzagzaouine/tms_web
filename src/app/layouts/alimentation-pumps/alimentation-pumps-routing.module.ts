import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlimentationPumpEditComponent } from './alimentation-pump-edit/alimentation-pump-edit.component';
import { AlimentationPumpsComponent } from './alimentation-pumps.component';


const routes: Routes = [
  { path: '', component: AlimentationPumpsComponent },
  { path: 'edit', component: AlimentationPumpEditComponent },

        ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlimentationPumpRoutingModule { }
