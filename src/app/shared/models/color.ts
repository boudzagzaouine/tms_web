import { Owner } from './owner';

export class Color {
    id: number;
    code: string;
    description: string;
    owner: Owner;
    creationDate: Date;
    updateDate: Date;
}
