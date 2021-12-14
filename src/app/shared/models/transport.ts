import { Address } from './address';
import { CatalogTransportType } from './CatalogTransportType';
import { Owner } from './owner';


export class Transport {

  id: number;
  comment: string;
  code: string;
  name: string;

  siret: number;
  description: number;
   address:Address;
  active:Boolean;
  owner:Owner;
  priceTurn:number=0;
  catalogTransportTypes:CatalogTransportType[]=[];



  

 
}
