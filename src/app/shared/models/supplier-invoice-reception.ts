import { Reception, SupplierInvoice } from '.';
import { ActionLineMaintenance } from './action-line-maintenance';
import { ActionType } from './action-type';
import { MaintenanceState } from './maintenance-state';
import { MaintenancePlan } from './maintenance-plan';
import { Product } from './product';
import { Uom } from './uom';
import { ActionLine } from './action-line';
import { Maintenance } from './maintenance';

export class SupplierInvoiceReception {

  id = 0;
  supplierInvoice: SupplierInvoice;
  reception: Reception;



}
