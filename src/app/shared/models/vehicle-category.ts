import { InsuranceType } from './insurance-Type';
import { Owner } from './owner';

export class VehicleCategory {

  id: number;
  code: string;
  description: string;
  length: number;
  width: number;
  height: number;
  depth: number;
  tonnage: number;
  emptyWeight: number;
  totalWeight: number;

  insuranceType: InsuranceType;
 owner :Owner;
}
