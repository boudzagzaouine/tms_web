import type { MaintenanceState } from './maintenance-state';
import type { ActionLineMaintenance } from './action-line-maintenance';
import type { Maintenance } from './maintenance';
import type { ProductPack } from "./product-pack";
import type { Stock } from "./stock";
import type { Uom } from "./uom";
import type { DeliveryLine } from "./delivery-line";
import type { Delivery } from "./delivery";
import type { Product } from "./product";
import type { Warehouse } from "./warehouse";
import type { Owner } from "./owner";
import type { DieselDeclaration } from './diesel-declaration';
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
  dieselDeclaration:DieselDeclaration;



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
