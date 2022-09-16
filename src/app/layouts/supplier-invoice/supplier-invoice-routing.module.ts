import { SupplierInvoiceEditComponent } from './supplier-invoice-edit/supplier-invoice-edit.component';
import { SupplierInvoiceListComponent } from './supplier-invoice-list/supplier-invoice-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierInvoiceComponent } from './supplier-invoice.component';

const routes: Routes = [{ path: '', component: SupplierInvoiceComponent },
                         {path: 'list', component: SupplierInvoiceListComponent},
                         {path: 'edit/:id', component: SupplierInvoiceEditComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierInvoiceRoutingModule { }
