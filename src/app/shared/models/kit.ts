import {Uom} from './uom';
import {Product} from './product';

export class Kit {
  id: number;
  quantity: number;
  version: number;
  product: Product;
  uom: Uom;
  componentUom: Uom;
  component: Product;
  marginFalling: number;
}
