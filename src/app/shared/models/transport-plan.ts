import type { Vat } from './vat';
import type { Account } from './account';
import type { Trajet } from './trajet';
import type { Company } from './company';
import type { Ville } from './ville';
import type {  TurnStatus } from './turn-status';
import type { OrderTransport } from './order-transport';
import type { PackagingType } from './packaging-type';
import type { TurnLine } from './turn-line';
import type { Vehicle } from './vehicle';
import type { Driver } from './driver';
import type { TurnType } from './turn-Type';
import type { SaleOrder } from './sale-order';
import type { PurchaseOrder } from './purchase-order';
import type { TurnSoPo } from './turn-so-po';
import type { Transport } from './transport';
import type { VehicleCategory } from './vehicle-category';
import type { TurnTransport } from './turn-transport';
import type { LoadingType } from './loading-type';
import type { TransportPlanServiceCatalog } from './transport-plan-service-catalog';

export class TransportPlan {
  id: number;
  orderTransport:OrderTransport;
  vehicle :Vehicle;
  driver:Driver;

  vehicleExterne :string;
  driverExterne:string;

  vehicleCategory :VehicleCategory ;
  transport :Transport ;
  account:Account;
  turnStatus :TurnStatus;
  salePrice :number;
  purchasePrice :number;
  purchasePriceNegotiated :number ;
  purchaseVat :Vat;
  purchasePriceTtc :number;
  purchasePriceVat :number;

  dateDepart: Date = new Date();
  dateValidate: Date = new Date();
  // villeSource :Ville;
  // villeDistination : Ville;
trajet:Trajet;
  //transportPlanServiceCatalogs:TransportPlanServiceCatalog[]=[];

  marginRate:number;
  margineService :number;
  remark:string;

  totalServiceHT:number;
  totalServiceTTC:number;
  totalServiceVat:number;

  totalPriceHT:number;
  totalPriceTTC:number;
  totalPriceVat:number;

  latitude:number;
  longitude:number;
}
