import { InsuranceType } from './insurance-Type';

export class VehicleCategory {

  id: number;
  code: string;
  consumption: string;
  length: number;
  width: number;
  height:number;
  depth: number;
  tonnage: number;
  emptyWeight: number;
  totalWeight: number;

  insuranceType:InsuranceType;

}
