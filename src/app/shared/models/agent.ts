import { CommissionDriver } from './commission-driver';
import { BadgeTypeDriver } from './badge-Type-Driver';
import { Badge } from './badge';
import { Contact } from './contact';
import { User } from './user';
import { Owner } from './owner';
import { SubscriptionCard } from './subscription-card';
import { Responsability } from './responsability';


export class Agent {
  id: number;
  code: string;
  cin: string;
  birthDate: Date = new Date();
  lastMedicalVisit: Date = new Date();

  working: boolean;

  name: string;
  tele1: String;
  responsability:Responsability;
 owner:Owner;
}
