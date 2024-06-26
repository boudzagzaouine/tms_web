import { VehicleTray } from './vehicle-tray';
import { VehicleCategoryTray } from './vehicle-category-tray';
import { CatalogTransportPricing } from './CatalogTransportPricing';
import { InsuranceType } from './insurance-Type';
import { Owner } from './owner';
import { Transport } from './transport';
import { Vehicle } from './vehicle';

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
