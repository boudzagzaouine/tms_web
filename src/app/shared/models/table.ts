import { Room } from './room';
import { SaleOrder } from './sale-order';
export class Table {
    id: number;
    number: number;
    capacity: number;
    positionX: number;
    positionY: number;
    saleOrders: SaleOrder[];
    room: Room;
}
