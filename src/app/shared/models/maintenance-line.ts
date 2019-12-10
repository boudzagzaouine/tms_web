import { MaintenancePlan } from './maintenance-plan';
import { Product } from './product';
import { Uom } from './uom';

export class MaintenanceLine {

  id: number;
  product: Product;
  description: string;
  quantity = 1;
  unitPrice: number;
  totalPriceHT: number;
  totalPriceTTC: number;
  maintenancePlan: MaintenancePlan;

}
