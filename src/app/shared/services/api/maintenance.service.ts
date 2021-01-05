import { Maintenance } from './../../models/maintenance';
import { EmsService } from './ems.service';
import { MaintenancePlan } from '../../models/maintenance-plan';
import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { ActionLineMaintenance } from '../../models/action-line-maintenance';
import { PurchaseOrderLine } from '../../models';


@Injectable()
export class MaintenanceService extends EmsService<Maintenance> {

  constructor(proxy: ProxyService) {
    super(proxy, 'maintenance');
  }


  generateProductsFromPurchaseOrderLines(

    lines: PurchaseOrderLine[]): ActionLineMaintenance[] {

    const list: ActionLineMaintenance[] = [];
    for (const line of lines) {
   

        const l  = new ActionLineMaintenance();
        l.owner = line.owner;
        l.product = line.product;
        l.quantity = line.quantity;
        l.totalPriceHT = line.totalPriceHT;
        l.totalPriceTTC = line.totalPriceTTC;
        l.description = line.description;
       l.unitPrice=line.purshasePrice;
       l.amountVat=( l.totalPriceHT / 100) *  l.product.vat.value;
        list.push(l);

    
    }

    return list;
}
}
