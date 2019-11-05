import { Address } from './address';
import { Organisation } from './organisation';
export class Owner {
    id: number;
    code: string;
    description: string;
    siret: string;
    isActive: boolean;
    creationDate: Date;
    updateDate: Date;
    primaryTel: string;
    image: string;
    address: Address;
    organisation: Organisation;
}
