import { Company } from './company';
import { Vat } from './vat';
import { Ville } from './ville';
import { Pays } from './pays';
import { VehicleTray } from './vehicle-tray';
import { LoadingType } from './loading-type';
import { TurnType } from './turn-Type';
import { VehicleCategory } from './vehicle-category';

import { Owner } from './owner';


export class Trajet {

  id: number;
  code :String;
  paysSource:Pays;
  villeSource: Ville;
  paysDestination:Pays;
  villeDestination: Ville;

   owner :Owner;
}
