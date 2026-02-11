import type { Reception } from "./reception";
import type { ReceptionLine } from "./reception-line";
import type { FuelPump } from "./fuel-pump";
import type { Owner } from "./owner";


export class AlimentationPump {

  id: number;
  code: string;
  fuelPump:FuelPump;
  quantity : number;
  dateAlimentation:Date = new Date();
  receptionLine : ReceptionLine;
  reception : Reception;

  owner:Owner;
  
}
