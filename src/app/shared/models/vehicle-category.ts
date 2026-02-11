import type { VehicleTray } from './vehicle-tray';
import type { VehicleCategoryTray } from './vehicle-category-tray';
import type { CatalogTransportPricing } from './CatalogTransportPricing';
import type { InsuranceType } from './insurance-Type';
import type { Owner } from './owner';
import type { Transport } from './transport';
import type { Vehicle } from './vehicle';

export class VehicleCategory {

  id: number;
  code: string;
  description: string;
  length: number;
  width: number;
  height: number;
  depth: number;
  tonnage: number;
  emptyWeight: number;
  totalWeight: number;
  numberOfPalette:number;
  insuranceType: InsuranceType;
 owner :Owner;
 pourcentageToDeliver:number;
 vehicles:Vehicle[]=[];
 transports :Transport[]=[];
 priceKm : number;
 vehicleCategoryTrays : VehicleCategoryTray[]=[];
 vehicleTrays : VehicleTray[]=[]; //local


file :any;
fileType:string;
fileName:string;

 //catalogTransportPricings:CatalogTransportPricing[]=[];

}
