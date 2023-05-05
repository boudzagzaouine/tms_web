
import { TurnStatus } from './../../models/turn-status';
import { Trajet } from './../../models/trajet';
import { OrderTransportInfoLine } from './../../models/order-transport-info-line';
import { TypeInfo } from './../../enum/type-info.enum';
import { OrderTransportInfo } from './../../models/order-transport-info';
import { OrderTransport } from './../../models/order-transport';
import { Transport } from './../../models/transport';
import { PackagingType } from './../../models/packaging-type';
import { PackageDetail } from './../../models/package-detail';
import { Subject,Observable } from 'rxjs';

import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';
import { Account, Vat } from '../../models';

@Injectable()
export class OrderTransportService  extends EmsService<OrderTransport> {


  orderdeliver  = new Subject<OrderTransport>();
  selectOrderTransport :OrderTransport=new OrderTransport();
  activeIndex = new Subject<number>();
  subject = new Subject<Boolean>();
  index : number=0;

  constructor(proxy: ProxyService) {
    super(proxy, 'orderTransports');
  }

  emitOnchange(){
    this.orderdeliver.next(this.selectOrderTransport);
  }

cloneOrderTransport(OrderTransport : OrderTransport){

this.selectOrderTransport=OrderTransport;
   this.emitOnchange();
}
clearObject(){
  this.selectOrderTransport=new OrderTransport();
  this.selectOrderTransport.orderTransportInfoAller=new OrderTransportInfo();
  this.selectOrderTransport.orderTransportInfoRetour=new OrderTransportInfo();

this.emitOnchange();}

addIndex(){
  console.log("change value index true");
  this.selectOrderTransport.index=true;
  this.subject.next(this.selectOrderTransport.index);
  this.emitOnchange();

}
  addOrder(OrderTransport : OrderTransport){

    this.selectOrderTransport.code=OrderTransport.code;
    this.selectOrderTransport.date=OrderTransport.date;
    this.selectOrderTransport.loadingType=OrderTransport.loadingType;
    this.selectOrderTransport.turnType=OrderTransport.turnType;
    this.selectOrderTransport.account=OrderTransport.account;
    this.selectOrderTransport.turnStatus=OrderTransport.turnStatus;
    this.selectOrderTransport.vehicleCategory=OrderTransport.vehicleCategory;
    this.selectOrderTransport.vehicleTray=OrderTransport.vehicleTray;
    this.selectOrderTransport.contact=OrderTransport.contact;
    this.selectOrderTransport.consignment=OrderTransport.consignment;
    this.selectOrderTransport.port=OrderTransport.port;
    this.selectOrderTransport.palletResponsibility=OrderTransport.palletResponsibility;
    this.selectOrderTransport.packagingType=OrderTransport.packagingType;
    this.selectOrderTransport.marchandiseType=OrderTransport.marchandiseType;
    this.selectOrderTransport.trajet=OrderTransport.trajet;
    this.selectOrderTransport.orderTransportAccompaniments=OrderTransport.orderTransportAccompaniments;


    this.selectOrderTransport.weightTotal=OrderTransport.weightTotal;
    this.selectOrderTransport.capacityTotal=OrderTransport.capacityTotal;

   this.emitOnchange();


  }
  addTrajet(trajet :Trajet){
    this.selectOrderTransport.trajet=trajet;

   this.emitOnchange();

  }
  addCode(code :string){
    this.selectOrderTransport.code=code;

   this.emitOnchange();

  }
  addStatus(status :TurnStatus){
    this.selectOrderTransport.turnStatus=status;

   this.emitOnchange();

  }

  getOrderTransport(){
    return this.selectOrderTransport ?this.selectOrderTransport: new OrderTransport();
  }

  getOrderTransportCode(){
    return this.selectOrderTransport.code;

  }
  addPrice(priceHt : number,priceTTC:number,vat:Vat,priceVat:number){
    this.selectOrderTransport.priceHT=priceHt;
    this.selectOrderTransport.priceTTC=priceTTC;
    this.selectOrderTransport.vat=vat;
    this.selectOrderTransport.priceVat=priceVat;
    this.emitOnchange();

  }
  addTotalPrice(priceHt : number,priceTTC:number,vat:Vat,priceVat:number){
    this.selectOrderTransport.totalPriceHT=priceHt;
    this.selectOrderTransport.totalPriceTTC=priceTTC;
    this.selectOrderTransport.totalPriceVat=priceVat;
    this.emitOnchange();

  }
  addMarginRate(marginRate : number){
    this.selectOrderTransport.marginRate=marginRate;
    this.emitOnchange();

  }
  addMarginValue(marginValue : number){
    this.selectOrderTransport.marginValue=marginValue;
    this.emitOnchange();

  }
  addItineraryAller(distance: number , time :number ){
this.selectOrderTransport.orderTransportInfoAller.numberKm=distance;
this.selectOrderTransport.orderTransportInfoAller.time=time;
  }
  getItineraryAller(){
    console.log("distance");

    console.log(this.selectOrderTransport.orderTransportInfoAller.numberKm );

  }

  addOrderTransportInfoAller(orderTransportInfo :OrderTransportInfo){
  console.log(orderTransportInfo);

    this.selectOrderTransport.orderTransportInfoAller=orderTransportInfo;
    this.emitOnchange();

  }
  addOrderTransportInfoRetour(orderTransportInfo :OrderTransportInfo){
    console.log(orderTransportInfo);

    this.selectOrderTransport.orderTransportInfoRetour=orderTransportInfo;
    this.emitOnchange();

  }


  addDistanceorderTransportInfoAller(dist: number){
    console.log(dist);

    this.selectOrderTransport.orderTransportInfoAller.numberKm=dist;
  }
  getDistanceorderTransportInfoAller(){
   return this.selectOrderTransport.orderTransportInfoAller.numberKm;
  }
  getorderTransportInfoAller(){
    if( this.selectOrderTransport?.orderTransportInfoAller!=null){
      if( this.selectOrderTransport?.orderTransportInfoAller?.orderTransportInfoLines!=null){
    this.selectOrderTransport.orderTransportInfoAller.orderTransportInfoLines.sort(function (a, b) {
      return Number(a.lineNumber) - Number(b.lineNumber);
    });}}
    else {
      this.selectOrderTransport.orderTransportInfoAller= new OrderTransportInfo();
    }
    console.log(this.selectOrderTransport.orderTransportInfoAller);

    return this.selectOrderTransport.orderTransportInfoAller ;
  }
  getorderTransportInfoRetour(){
    if( this.selectOrderTransport?.orderTransportInfoRetour!=null){
      if( this.selectOrderTransport?.orderTransportInfoRetour?.orderTransportInfoLines!=null){
    this.selectOrderTransport.orderTransportInfoRetour.orderTransportInfoLines.sort(function (a, b) {
      return Number(a.lineNumber) - Number(b.lineNumber);
    });}}
    else {
      this.selectOrderTransport.orderTransportInfoRetour= new OrderTransportInfo();
    }
    console.log(this.selectOrderTransport.orderTransportInfoRetour);

    return this.selectOrderTransport.orderTransportInfoRetour ;
  }



addLinesAller(orderTransportInfoLine:OrderTransportInfoLine[]){

  this.selectOrderTransport.orderTransportInfoAller.orderTransportInfoLines=orderTransportInfoLine;

}
  getLinesAller(){
  return this.selectOrderTransport.orderTransportInfoAller.orderTransportInfoLines ? this.selectOrderTransport.orderTransportInfoAller.orderTransportInfoLines:[];
  }


addLinesRetour(orderTransportInfoLine:OrderTransportInfoLine[]){

  this.selectOrderTransport.orderTransportInfoRetour.orderTransportInfoLines=orderTransportInfoLine;

}
  getLinesRetour(){
  return this.selectOrderTransport.orderTransportInfoRetour.orderTransportInfoLines ? this.selectOrderTransport.orderTransportInfoRetour.orderTransportInfoLines:[];
  }






  addPriceAller(price :number){
      this.selectOrderTransport.orderTransportInfoAller.priceTTC += price;
       }

       soustPriceAller(price :number){
        this.selectOrderTransport.orderTransportInfoAller.priceTTC -= price;
         }






}
