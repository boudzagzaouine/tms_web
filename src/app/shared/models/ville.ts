import type { Pays } from './pays';
import type { Owner } from './owner';


export class Ville {

  id: number;
  code: string;
  description: string;
  pays:Pays;
  owner:Owner;
  latitude : number;
    longitude : number;
}
