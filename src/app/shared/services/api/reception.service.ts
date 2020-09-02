import { ReceptionLine } from './../../models/reception-line';
import { PurchaseOrderLine } from './../../models/purchase-order-line';
import { Reception } from './../../models/reception';
import { PurchaseOrder } from './../../models/purchase-order';
import { EmsService } from './ems.service';
import { InsuranceTerm } from '../../models/insurance-term';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';

@Injectable()
export class ReceptionService extends EmsService<Reception> {

  constructor(proxy: ProxyService) {
    super(proxy, 'receptions');
  }


  generateReceptionLinesFromPurchaseOrderLines(
    lines: PurchaseOrderLine[]
): ReceptionLine[] {
    const list: ReceptionLine[] = [];
    for (const line of lines) {
        const l = new ReceptionLine();
        l.lineNumber = line.number;
        l.owner = line.owner;
        l.product = line.product;
        l.productPack = line.productPack;
        l.uom = line.uom;
        l.quantity = line.quantity;
        l.quantityReceived = 0;
        l.receptionDate = new Date();
        l.totalPriceHT = line.totalPriceHT;
        l.totalPriceTTC = line.totalPriceTTC;
        l.uomReceived = line.uom;
        l.vat = line.vat;
        l.purshaseOrderLine = line;
        l.discount = line.discount;
        l.description = line.description;
        l.comment = line.description;
        l.purshasePrice = line.purshasePrice;
        list.push(l);
    }

    return list;
}


}
