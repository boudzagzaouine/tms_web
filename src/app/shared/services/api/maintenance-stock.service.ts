import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MaintenanceStock } from './../../models/maintenance-stock';
import { ActionLineMaintenance } from './../../models/action-line-maintenance';
import { SaleOrderStock } from './../../models/sale-order-stock';
import { Maintenance } from './../../models/maintenance';
import { Stock } from './../../models/stock';
import { StockService } from './stock.service';
import { ReceptionLine } from './../../models/reception-line';
import { PurchaseOrderLine } from './../../models/purchase-order-line';
import { Reception } from './../../models/reception';
import { PurchaseOrder } from './../../models/purchase-order';
import { EmsService } from './ems.service';
import { InsuranceTerm } from '../../models/insurance-term';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { ProxyService } from './proxy.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class MaintenanceStockService extends EmsService<MaintenanceStock> {



  constructor(proxy: ProxyService,
    private authentificationService:AuthenticationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
    super(proxy, 'maintenanceStocks');
  }


  generateMaintenanceStockFromMaintenance(maintenance: Maintenance) {

    const list: MaintenanceStock[] = [];
 
      for (const linee of maintenance.actionLineMaintenances) {
        const l  = new MaintenanceStock();
        l.maintenance = maintenance;
        l.product = linee.product;
        l.owner = this.authentificationService.getDefaultOwner();;
        l.dlc = null;
        l.productPack = linee.product.productPack;
        l.uom = linee.product.uomByProductUomBase;
        l.quantityServed = linee.quantity;
        l.actionLineMaintenance = linee;
        l.warehouse = null;
        list.push(l);
      }

    

    return list;
}


insert(maintenance : Maintenance){
const maintenancestocks = this.generateMaintenanceStockFromMaintenance(maintenance)
  this.saveAll(maintenancestocks).subscribe(
    dataM => {
      this.toastr.success('Ajouter avec succés', 'Validation');

    },
    err => {
      this.toastr.error(
        'Erreur '
    );

      return;
    },
    () => {
       console.log();

    }
  );
}





}
