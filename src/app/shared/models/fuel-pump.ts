import type { Product } from "./product";
import type { Owner } from "./owner";
import type { Pump } from "./pump";


export class FuelPump {

  id: number;
  code: string;
  product:Product;
  pump:Pump;
  quantity:number=0;
  owner : Owner ;
  
}
