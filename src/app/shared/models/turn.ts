import { TurnLine } from './turn-line';
import { Vehicle } from './vehicle';
import { Driver } from './driver';

export class Turn {
  id: number;
  drivers: Driver[] = [];
  vehicle: Vehicle;
  transport: Transport;
  dateDelivery: Date;
  turnLines: TurnLine[] = [];

}
