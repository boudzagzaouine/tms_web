import { Account } from './account';
import { Trajet } from './trajet';
import { Company } from './company';
import { TransportPlanService } from './../services/api/transport-plan.service';
import { Ville } from './ville';
import {  TurnStatus } from './turn-status';
import { OrderTransport } from './order-transport';
import { PackagingType } from './packaging-type';
import { TurnLine } from './turn-line';
import { Vehicle } from './vehicle';
import { Driver } from './driver';
import { TurnType } from './turn-Type';
import { SaleOrder } from './sale-order';
import { PurchaseOrder } from './purchase-order';
import { TurnSoPo } from './turn-so-po';
import { Transport } from './transport';
import { VehicleCategory } from './vehicle-category';
import { TurnTransport } from './turn-transport';
import { LoadingType } from './loading-type';
import { TransportPlanServiceCatalog } from './transport-plan-service-catalog';

export class TransportPlan {
  id: number;
  orderTransport:OrderTransport;
  vehicle :Vehicle;
  driver:Driver;
  vehicleCategory :VehicleCategory ;
  transport :Transport ;
  account:Account;
  turnStatus :TurnStatus;
  salePrice :number;
  purchasePrice :number;
  dateDepart: Date = new Date();
  dateValidate: Date = new Date();
  // villeSource :Ville;
  // villeDistination : Ville;
trajet:Trajet;
  transportPlanServiceCatalogs:TransportPlanServiceCatalog[]=[];

  marginRate:number;
  margineService :number;

  totalPriceHT:number;
  totalPriceTTC:number;
  totalPriceVat:number;

}
