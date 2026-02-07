
import { Owner } from './owner';
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
