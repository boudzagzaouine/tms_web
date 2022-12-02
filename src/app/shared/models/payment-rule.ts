import { PaymentType } from '.';


export class PaymentRule {

  id: number;
  paymentType: PaymentType;
  contreBL: Boolean=false;
  contreFacture:Boolean= false;
  file:any[];


}
