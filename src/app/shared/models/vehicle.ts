import { vehicleCategory } from './vehicle-category';
import { badgeType } from './badge-Type';

export class vehicle {


    id:number;
    registrationNumber:string="";
    code:string="";
    technicalVisit:Date;
    creationDate:Date;
    vehiculeCategorie:vehicleCategory;
     badgeType:badgeType;


}
