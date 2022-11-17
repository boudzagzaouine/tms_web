import { Contact } from './contact';
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
   contact:Contact;
  active:Boolean;
  owner:Owner;
  priceTurn:number=0;
  catalogTransportTypes:CatalogTransportType[]=[];
  priceContrat:number=0;
  interneOrExterne:Boolean=false;






}
