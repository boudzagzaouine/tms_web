import { Owner } from './owner';

export class CommissionType {

  id: number;
  code: string;
  description: string
  percentage: number;
  minDistance: number;
  maxDistance: number;
 owner :Owner;

}
