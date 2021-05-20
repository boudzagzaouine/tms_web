import { Product } from ".";
import { Owner } from "./owner";
import { Pump } from "./pump";


export class FuelPump {

  id: number;
  code: string;
  product:Product;
  pump:Pump;
  quantity:number=0;
  owner : Owner ;
  
}
