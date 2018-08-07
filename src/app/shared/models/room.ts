import { Table } from './table';
export class Room {
    id: number;
    code: string;
    capacity: number;
    tables: Table[];
}
