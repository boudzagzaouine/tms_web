import { Zone } from './Zone';
import { Vat } from './vat';
import { VehicleCategory } from './vehicle-category';


export class CatalogTransportType {

  id: number;
  transport: Transport;
  vehicleCategory: VehicleCategory;
  zoneSource: Zone;
  zoneDestination: Zone;
  amountHt: number;
  amountTtc: number;
  amountTva: number;
  vat: Vat;

}
