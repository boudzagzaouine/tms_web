import { Owner } from './owner';


export class LoadingType {

  id: number;
  code: string;
  description: string;
  owner:Owner ;

  constructor(code :string){
    this.code = code;
   }
}
