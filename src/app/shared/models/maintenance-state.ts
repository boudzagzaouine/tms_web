import type { Owner } from './owner';


export class MaintenanceState {

  id: number;
  code: string;
  description: string;
  owner : Owner;
}
