import { DeliveryInfo } from './../../models/delivery-info';
import { Transport } from './../../models/transport';
import { OrderDeliveryTransport } from './../../models/order-delivery-transport';
import { PackagingType } from './../../models/packaging-type';
import { PackageDetail } from './../../models/package-detail';
import { AddressContactDeliveryInfo } from './../../models/address-contact-delivery-info';
import { Subject } from 'rxjs';
import { OrderDelivery } from './../../models/order-delivery';
import { EmsService } from './ems.service';
import {Injectable} from '@angular/core';
import { ProxyService } from './proxy.service';
import { Account } from '../../models';

@Injectable()
export class OrderDeliveryService  extends EmsService<OrderDelivery> {

  orderdeliver  = new Subject<OrderDelivery>();
  selectOrderDelivery :OrderDelivery=new OrderDelivery();
  activeIndex = new Subject<number>();
  index : number=0;
  constructor(proxy: ProxyService) {
    super(proxy, 'orderDeliveries');
  }

  emitOnchange(){
    this.orderdeliver.next(this.selectOrderDelivery);
  }

cloneOrderDelivery(orderDelivery : OrderDelivery){

this.selectOrderDelivery=orderDelivery;
   this.emitOnchange();
}

  addOrder(orderDelivery : OrderDelivery){

    this.selectOrderDelivery.code=orderDelivery.code;
    this.selectOrderDelivery.date=orderDelivery.date;
    this.selectOrderDelivery.loadingType=orderDelivery.loadingType;
    this.selectOrderDelivery.turnType=orderDelivery.turnType;
    this.selectOrderDelivery.account=orderDelivery.account;
    this.selectOrderDelivery.turnStatus=orderDelivery.turnStatus;

   this.emitOnchange();


  }

  getOrderDelivery(){
    return this.selectOrderDelivery;
  }


  addDeliveryInfoAller(deliveryInfo :DeliveryInfo){

    this.selectOrderDelivery.deliveryInfoAller=deliveryInfo;
  }

  addDeliveryInfoRetour(deliveryInfo :DeliveryInfo){

    this.selectOrderDelivery.deliveryInfoRetour=deliveryInfo;
  }

  getDeliveryInfoAller(){

    return this.selectOrderDelivery.deliveryInfoAller;
  }

  getDeliveryInfoRetour(){

    return this.selectOrderDelivery.deliveryInfoRetour;
  }





  addPriceAller(price :number){
      this.selectOrderDelivery.deliveryInfoAller.priceTTC += price;
       }
       addPriceRetour(price : number){
        this.selectOrderDelivery.deliveryInfoRetour.priceTTC += price;


       }
       soustPriceAller(price :number){
        this.selectOrderDelivery.deliveryInfoAller.priceTTC -= price;
         }
         soustPriceRetour(price : number){
          this.selectOrderDelivery.deliveryInfoRetour.priceTTC -= price;

         }

         addOrderDeliveryTransport(transport:OrderDeliveryTransport[]){

              this.selectOrderDelivery.orderDeliveryTransport=transport;
           this.emitOnchange();
            }



//    addPriceAller(price :number){
//   this.selectOrderDelivery.priceTTCAller += price;
//    }
//    addPriceRetour(price : number){
//     this.selectOrderDelivery.priceTTCRetour += price;

//    }
//    soustPriceAller(price :number){
//     this.selectOrderDelivery.priceTTCAller -= price;
//      }
//      soustPriceRetour(price : number){
//       this.selectOrderDelivery.priceTTCRetour -= price;

//      }

//   addOrderDeliveryTransport(transport:OrderDeliveryTransport[]){

//     this.selectOrderDelivery.orderDeliveryTransport=transport;
//  this.emitOnchange();
//   }



//   addWeightAller(weight : number){
//   this.selectOrderDelivery.weightTotalAller=weight;
//   }
//   addCapacityAller(capacity : number){
//     this.selectOrderDelivery.capacityToalAller=capacity;

//   }
//   addPackageDetailAller(packageDetails :PackageDetail[]){
//   this.selectOrderDelivery.packageDetailAller=packageDetails;
//   this.emitOnchange();
//   }
//   addOrderInfoAllerSource(addressContactDeliveryInfo : AddressContactDeliveryInfo){
//     this.selectOrderDelivery.contactDeliveryInfoAllerSource=addressContactDeliveryInfo;
//     this.emitOnchange();
//   }
//   addOrderInfoAllerDistination(addressContactDeliveryInfo : AddressContactDeliveryInfo){
//     this.selectOrderDelivery.contactDeliveryInfoAllerDistination=addressContactDeliveryInfo;
//     this.emitOnchange();
//   }
//   addPackagingTypeAller(packagingType :PackagingType){
//     this.selectOrderDelivery.packagingTypeAller=packagingType;
//     this.emitOnchange();
//   }


//   addWeightRetour(weight : number){
//     this.selectOrderDelivery.weightTotalRetour=weight;
//     }
//     addCapacityRetour(capacity : number){
//       this.selectOrderDelivery.capacityToalRetour=capacity;

//     }
//   addPackageDetailRetour(packageDetails :PackageDetail[]){
//     this.selectOrderDelivery.packageDetailRetour=packageDetails;
//     this.emitOnchange();
//     }
//     addOrderInfoRetourSource(addressContactDeliveryInfo : AddressContactDeliveryInfo){
//       this.selectOrderDelivery.contactDeliveryInfoRetourSource=addressContactDeliveryInfo;
//       this.emitOnchange();
//     }
//     addOrderInfoRetourDistination(addressContactDeliveryInfo : AddressContactDeliveryInfo){
//       this.selectOrderDelivery.contactDeliveryInfoRetourDistination=addressContactDeliveryInfo;
//       this.emitOnchange();
//     }

//     addPackagingTypeRetour(packagingType :PackagingType){
//       this.selectOrderDelivery.packagingTypeRetour=packagingType;
//       this.emitOnchange();
//     }


}
