import { MaintenanceState } from './maintenance-state';
import { ActionLineMaintenance } from './action-line-maintenance';
import { Maintenance } from './maintenance';
import { ProductPack } from "./product-pack";
import { Stock } from "./stock";
import { Uom } from "./uom";
import { DeliveryLine } from "./delivery-line";
import { Delivery } from "./delivery";
import { Product } from "./product";
import { Warehouse } from "./warehouse";
import { Owner } from "./owner";
export class MaintenanceStock {
  id: number;
  lineNumber: number;
  owner: Owner;
  updateDate: Date;
  creationDate: Date;
  product: Product;
  dlc: Date;
  dluo: Date;
  serialNo: string;
  lot: string;
  maintenance: Maintenance;
  orderDate: Date;
  quantityServed: number;
  actionLineMaintenance: ActionLineMaintenance;
  uom: Uom;
  productPack: ProductPack;
  warehouse: Warehouse;
  maintenanceState:MaintenanceState;



  // constructor(
  //   maintenance: Maintenance = null,
  //   product: Product = null,
  //   owner: Owner = null,
  //   dlc: Date,
  //   productPack: ProductPack = null,
  //   uom: Uom,
  //   quantity: number = 0,
  //   actionLineMaintenance: ActionLineMaintenance = null,
  //   warehouse: Warehouse = null
  // ) {
  //   this.maintenance = maintenance;
  //   this.product = product;
  //   this.owner = owner;
  //   this.dlc = dlc;
  //   this.productPack = productPack;
  //   this.uom = uom;
  //   this.quantityServed = quantity;
  //   this.actionLineMaintenance = actionLineMaintenance;
  //   this.warehouse = warehouse;
  // }
}
