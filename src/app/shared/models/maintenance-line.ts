import { MaintenancePlan } from './maintenance-plan';
import { Product } from './product';
import { Uom } from './uom';

export class MaintenanceLine {

  id = 0;
  product: Product;
  description: string;
  quantity = 1;
  unitPrice = 0;
  totalPriceHT = 0;
  totalPriceTTC = 0;
  maintenancePlan: MaintenancePlan;

}
