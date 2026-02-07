import type { TransportAccountService } from './transport-account-service';
import type { TransportService } from './transport-service';
import type { CatalogTransportAccountPricing } from './catalog-transport-account-pricing';
import type { CatalogTransportPricing } from './CatalogTransportPricing';
import type { Contact } from './contact';
import type { Address } from './address';
import type { Owner } from './owner';


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
  catalogTransportPricings:CatalogTransportPricing[]=[];
  catalogTransportAccountPricings:CatalogTransportAccountPricing[]=[];
  catalogTransportServices:TransportService[]=[];
  catalogTransportAccountServices:TransportAccountService[]=[];

  interneOrExterne:Boolean=false;

  purchaseAmount:number;

  factureTransport:Boolean=false;
  factureService:Boolean=false;

  priceContrat:number=0; // local
  price:number=0; // local
  catalogTransportPricing:CatalogTransportPricing;


}
