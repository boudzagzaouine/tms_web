import { TurnType } from './turn-Type';
import { Ville } from './ville';
import { Zone } from './Zone';
import { Vat } from './vat';
import { VehicleCategory } from './vehicle-category';
import { Owner } from './owner';
import { Transport } from './transport';


export class CatalogTransportType {

  id: number;
  transport: Transport;
  vehicleCategory: VehicleCategory;
  villeSource: Ville;
  villeDestination: Ville;
  turnType :TurnType;
  amountHt: number;
  amountTtc: number;
  amountTva: number;
  vat: Vat;
  interneOrExterne:Boolean;
  owner:Owner;

  tarifClient :number=0; //variable local
}
