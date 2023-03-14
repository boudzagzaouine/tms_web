import { TransportAccountService } from './transport-account-service';
import { TransportService } from './transport-service';
import { CatalogTransportAccountPricing } from './catalog-transport-account-pricing';
import { CatalogTransportPricing } from './CatalogTransportPricing';
import { Contact } from './contact';
import { Address } from './address';
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



}
