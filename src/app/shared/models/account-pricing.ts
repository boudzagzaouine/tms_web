import { Transport } from './transport';
import { CatalogTransportType } from './CatalogTransportType';
import { Account } from './account';
import { ActionTypeRepair } from './action-type-repair';
import { Owner } from './owner';


export class AccountPricing {

  id: number;
  catalogTransportType: CatalogTransportType;
  account: Account;
  transport :Transport;
  price :number ;
   owner :Owner;
}
