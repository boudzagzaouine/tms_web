import { Trajet } from './trajet';
import { TurnStatus } from './turn-status';
import { Ville } from './ville';
import { OrderTransportInfoLine } from './order-transport-info-line';
import { AddressContactOrderTransportInfo } from './address-contact-order-transport-nfo';
import { PackageDetail } from "./package-detail";
import { PackagingType } from "./packaging-type";
import { OrderTransport } from './order-transport';

export class OrderTransportDocumentType {
  id: number;

  code :string ;
  description : string ;
}
