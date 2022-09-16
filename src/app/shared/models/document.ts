import { Sinister } from './sinister';
import { Owner } from './owner';


export class Document {

  id: number;
  code: string;
  description: string;
  documentType : DocumentType;
  file:any[];
  fileType :string;
  fileName : string ;
  date:Date = new Date();
  sinister:Sinister;
  owner:Owner ;
}
