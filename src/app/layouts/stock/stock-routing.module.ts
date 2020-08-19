import { StockEditComponent } from './stock-edit/stock-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockComponent } from './stock.component';

const routes: Routes = [{ path: '', component: StockComponent },
{ path: 'edit', component: StockEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
