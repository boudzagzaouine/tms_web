import type { AccountPricing } from './account-pricing';
import type { ActivityArea } from './activity-area';
import type { Owner } from './owner';
import type { Address } from './address';
import type { AccountPricingService } from './account-pricing-service';

export class Company {
    id: number;
    code: string;
    description: string;
    owner: Owner;
    name: string;
    siret: string;
    vatNumber: string;
    address: Address;
    commonIdentifierOfCompany: string; // ice
    fiscalIdentifier: string; // IF
    professionalTax: string;
    tradeRegister: string;
    cnssNumber: string;
    threshold: number; // seuil
    turnover: number; // chiffre affr
    activityArea: ActivityArea;

    telephone: string;
    email: string;
    fax: string;
    creationDate = new Date();
    updateDate = new Date();
    accountPricingList: AccountPricing[] = [];
    accountPricingServiceList: AccountPricingService[] = [];

}
