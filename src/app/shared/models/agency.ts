import type { Address } from './address';
import type { User } from './user';
import type { Zone } from './Zone';
export class Agency {
    id: number;
    code: string;
    description: string;
    responsable: User;
    zone:Zone;
    address: Address;
}
