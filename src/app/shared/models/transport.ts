import { CatalogTransportAccountPricing } from './catalog-transport-account-pricing';
import { CatalogTransportPricing } from './CatalogTransportPricing';
import { TransportProduct } from './transport-product';
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
  priceContrat:number=0;
  interneOrExterne:Boolean=false;

  transportProducts:TransportProduct[]=[];





}
