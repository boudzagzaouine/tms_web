import { VehicleAccompaniment } from './vehicle-accompaniment';
import { OrderTransport } from './order-transport';
export class OrderTransportAccompaniment {
  id: number;
  code: string;

  orderTransport :OrderTransport;
  vehicleAccompaniment :VehicleAccompaniment;
  
}
