import { Owner } from './owner';

export class Contact {
    id: number;
    code :string;
    name: string;
    tel1: String;
    updateDate: Date;
    tel2: String;
    creationDate: Date;
    surname: String;
    fax: String;
    contactType: number;
    email: String;
    comment: String;
    active: boolean;
    owner:Owner;
}
