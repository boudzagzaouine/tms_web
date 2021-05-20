import { Reception, ReceptionLine } from ".";
import { FuelPump } from "./fuel-pump";
import { Owner } from "./owner";


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
