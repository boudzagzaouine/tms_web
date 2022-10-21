import { DeliveryInfo } from './../../../../shared/models/delivery-info';
import { ToastrService } from 'ngx-toastr';
import { OrderDelivery } from './../../../../shared/models/order-delivery';
import { OrderDeliveryService } from './../../../../shared/services/api/order-delivery.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-delivery-verification',
  templateUrl: './order-delivery-verification.component.html',
  styleUrls: ['./order-delivery-verification.component.scss']
})
export class OrderDeliveryVerificationComponent implements OnInit {
  @Output() previousstep = new EventEmitter<boolean>();
  selectOrderDelivery : OrderDelivery = new OrderDelivery();
  selectDeliveryInfoAller :DeliveryInfo= new DeliveryInfo();
  selectDeliveryInfoRetour :DeliveryInfo= new DeliveryInfo();

  constructor(private orderDeliveryService :OrderDeliveryService,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {

   this.selectOrderDelivery=this.orderDeliveryService.getOrderDelivery();
   this.selectDeliveryInfoAller=this.orderDeliveryService.getOrderDelivery().deliveryInfoAller;
   this.selectDeliveryInfoRetour=this.orderDeliveryService.getOrderDelivery().deliveryInfoRetour;


  }


  onSubmit(close =false){
  console.log(this.selectOrderDelivery);

  this.orderDeliveryService.set(this.selectOrderDelivery).subscribe(
    data =>{
  this.selectOrderDelivery =data;
   console.log(data);
   this.orderDeliveryService.cloneOrderDelivery(data);
   this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');



    },
    err =>{
      this.toastr.error(err.error.message,"Erreur");
    }
  );

  }


  previous() {


this.previousstep.emit(true);
  }
}
