import { Address } from './address';
import { User } from './user';
import { Zone } from './Zone';
export class Agency {
    id: number;
    code: string;
    description: string;
    responsable: User;
    zone:Zone;
    address: Address;
}
