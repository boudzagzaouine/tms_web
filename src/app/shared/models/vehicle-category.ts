import { InsuranceType } from './insurance-Type';

export class VehicleCategory {

  id: number;
  code: string;
  consumption: string;
  weight: number;
  width: number;
  depth: number;
  tonnage: number;
  emptyWeight: number;
  totalWeight: number;
  insuranceType :InsuranceType;

}
