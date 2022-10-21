import { OrderDeliveryTransport } from './../../../../shared/models/order-delivery-transport';
import { ConfirmationService } from 'primeng/api';
import { VehicleService } from './../../../../shared/services/api/vehicle.service';
import { CatalogTransportTypeServcie } from './../../../../shared/services/api/Catalog-Transport-Type.service';
import { TransportServcie } from './../../../../shared/services/api/transport.service';
import { Transport } from './../../../../shared/models/transport';
import { CatalogTransportType } from './../../../../shared/models/CatalogTransportType';
import { OrderDeliveryService } from './../../../../shared/services/api/order-delivery.service';
import { Delivery } from './../../../../shared/models/delivery';
import { OrderDelivery } from './../../../../shared/models/order-delivery';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { VehicleCategoryService } from './../../../../shared/services/api/vehicle-category.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Vehicle } from './../../../../shared/models';

@Component({
  selector: 'app-tarification',
  templateUrl: './tarification.component.html',
  styleUrls: ['./tarification.component.css']
})
export class TarificationComponent implements OnInit {
  @Output() previousstep = new EventEmitter<boolean>();
  @Output() nextstep = new EventEmitter<boolean>();

  vehicleCatList :VehicleCategory[]=[];
  vehicleCatsToDeliverSort :VehicleCategory[]=[];
  vehicleCatsToDeliver: VehicleCategory[] = [];
  selectOrderDelivery : OrderDelivery = new OrderDelivery();
  vehicleList:Vehicle[]=[];
  idOrderDeliveryTransport:number=0;
  orderDeliveryTransports : OrderDeliveryTransport[]=[];
  showDialogOrderDeliveryTransport :Boolean =false;
  selectOrderDeliveryTransport:OrderDeliveryTransport = new OrderDeliveryTransport();
  editModeOrderDeliveryTransport :Boolean =false;
   priceAller :number =0 ;
   priceRetour :number =0;
  constructor(private vehicleCategoryService :VehicleCategoryService,
    private orderDeliveryService :OrderDeliveryService,
    private transportService : TransportServcie,
    private catalogTransportTypeService :CatalogTransportTypeServcie,
    private confirmationService:ConfirmationService,
    private vehicleService :VehicleService) { }

  ngOnInit() {

      this.selectOrderDelivery = this.orderDeliveryService.getOrderDelivery();
      console.log(this.selectOrderDelivery);

         this.orderDeliveryTransports=this.orderDeliveryService.getOrderDelivery().orderDeliveryTransport;
         this.priceAller = (this.selectOrderDelivery?.deliveryInfoAller?.priceTTC !=null)?this.selectOrderDelivery.deliveryInfoAller.priceTTC:0;
         this.priceRetour=(this.selectOrderDelivery?.deliveryInfoRetour?.priceTTC !=null)?this.selectOrderDelivery.deliveryInfoRetour.priceTTC:0;

    this.vehicleCategoryService.findAll().subscribe((data) => {
      this.vehicleCatList = data;

         console.log( this.selectOrderDelivery);

          this.vehicleCategoryToDeliver();
    });

  }

  initForm(){


  }

  vehicleCategoryToDeliver() {

    let qnt =
      this.selectOrderDelivery?.deliveryInfoAller?.weightTotal > this.selectOrderDelivery?.deliveryInfoRetour?.weightTotal
        ? this.selectOrderDelivery?.deliveryInfoAller?.weightTotal
        : this.selectOrderDelivery?.deliveryInfoAller?.weightTotal;
    this.vehicleCatsToDeliverSort = this.vehicleCatList.sort(function (a, b) {
      return Number(a.tonnage) - Number(b.tonnage);
    });
    this.vehicleCatsToDeliver = [];
    console.log(qnt);

    this.onSearchVehicleCategoryToDeliverByTonnage(qnt);
  }


  onSearchVehicleCategoryToDeliverByTonnage(qte) {
    let vehicleCat: VehicleCategory = new VehicleCategory();
    let valide = 0;
    let lastIndex = this.vehicleCatsToDeliverSort.length - 1;


    let pourcentage = 0;
    console.log(this.vehicleCatsToDeliverSort);

    if (this.vehicleCatsToDeliverSort[lastIndex]?.tonnage >= qte) {
      vehicleCat = this.vehicleCatsToDeliverSort.filter(
        (f) => f.tonnage >= qte
      )[0];
      pourcentage = (qte / vehicleCat.tonnage) * 100;
      vehicleCat.pourcentageToDeliver = Number(pourcentage.toFixed(2));
      this.vehicleCatsToDeliver.push(vehicleCat);
      valide = 1;
      this.vehicleCatsToDeliver =
        this.onSearchVehicleToDeliveByCategorySelected();
    } else if (this.vehicleCatsToDeliverSort[lastIndex].tonnage <= qte) {
      vehicleCat = this.vehicleCatsToDeliverSort[lastIndex];
      pourcentage = 100;
      vehicleCat.pourcentageToDeliver = Number(pourcentage.toFixed(2));
      this.vehicleCatsToDeliver.push(vehicleCat);
      this.onSearchVehicleCategoryToDeliverByTonnage(qte - vehicleCat.tonnage);
    }
  }

  onSearchVehicleToDeliveByCategorySelected() {
    let catalog: CatalogTransportType = new CatalogTransportType();
    let vehicleCats: VehicleCategory[] = [];
    //let saleorders: SaleOrder[] = [];
    let transports: Transport[] = [];

    this.vehicleCatsToDeliver.forEach((cat) => {
      cat.transports = [];
      this.transportService.findAll().subscribe((data) => {
        transports = data;
        transports.forEach((tr) => {
          tr.catalogTransportTypes = [];
          tr.priceTurn = 0;
 console.log("source");
console.log(this.selectOrderDelivery?.deliveryInfoAller?.contactDeliveryInfoSource.city);

 console.log("distination");
console.log(this.selectOrderDelivery?.deliveryInfoAller?.contactDeliveryInfoDistination.city);


            this.catalogTransportTypeService
              .find(
                "vehicleCategory.id:" +
                  cat.id +
                  ",villeSource.code~" +
                  this.selectOrderDelivery?.deliveryInfoAller?.contactDeliveryInfoSource.city +
                  ",villeDestination.code~" +
                  this.selectOrderDelivery?.deliveryInfoAller?.contactDeliveryInfoDistination.city +
                  ",transport.id:" +
                  tr.id
              )
              .subscribe((data) => {
                if (data[0] != null || data[0] != undefined) {
                  console.log(data);

                  catalog = data[0];
                  tr.catalogTransportTypes.push(catalog);
                  tr.priceTurn += Number(catalog.amountTtc);
                }
              });

          cat.transports = cat.transports.filter((f) => f.id !== tr.id);
          cat.transports.push(tr);
        });
      });

      vehicleCats.push(cat);
    });


    return vehicleCats;

  }




  previous() {


this.previousstep.emit(true);
  }


loadForm(){




}




  onLineEditedOrderDeliveryTransport(orderDeliveryTransport: OrderDeliveryTransport) {
    console.log(orderDeliveryTransport);
this.idOrderDeliveryTransport--;
orderDeliveryTransport.id=orderDeliveryTransport.id>0 ? orderDeliveryTransport.id :this.idOrderDeliveryTransport;
    const orderline = this.orderDeliveryTransports.find(
      (line) => line.id === orderDeliveryTransport.id
    );
    if (orderline == null) {
      this.orderDeliveryTransports.push(orderDeliveryTransport);
if(this.selectOrderDelivery?.turnType.id==1 ||this.selectOrderDelivery?.turnType.id==3){

  this.orderDeliveryService.addPriceAller(orderDeliveryTransport.priceTtc);
  this.priceAller = this.orderDeliveryService.getOrderDelivery().deliveryInfoAller.priceTTC;
}if(this.selectOrderDelivery?.turnType.id==2 ||this.selectOrderDelivery?.turnType.id==3){

  this.orderDeliveryService.addPriceRetour(orderDeliveryTransport.priceTtc);

  this.priceRetour=this.orderDeliveryService.getOrderDelivery().deliveryInfoAller.priceTTC ;

}
     //  let catalogue = this.searchTrajet(orderDeliveryTransport.vehicleCategory,orderDeliveryTransport.transport,this.selectOrderDelivery.contactDeliveryInfoAllerSource.city,this.selectOrderDelivery.contactDeliveryInfoAllerDistination.city);
 //console.log(catalogue);

//
      //this.orderDeliveryService.addPackageDetailAller(this.packageDetails);

    }
  }
  onHideDialogOrderDeliveryTransport (event){
    this.showDialogOrderDeliveryTransport=event
  }

  onShowDialogOrderDeliveryTransport(line, mode) {
    this.showDialogOrderDeliveryTransport = true;

    if (mode == true) {
      this.selectOrderDeliveryTransport = line;
      this.editModeOrderDeliveryTransport = true;
    } else {
      this.selectOrderDeliveryTransport = new OrderDeliveryTransport();
      this.editModeOrderDeliveryTransport= false;
    }
  }

  onDeleteOrderDeliveryTransport(line: OrderDeliveryTransport) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Suprimer?",
      accept: () => {
        this.orderDeliveryTransports = this.orderDeliveryTransports.filter((l) => l.id !== line.id);

        if(this.selectOrderDelivery?.turnType.id==1 ||this.selectOrderDelivery?.turnType.id==3){

          this.orderDeliveryService.soustPriceAller(line.priceTtc);
          this.priceAller =this.orderDeliveryService.getOrderDelivery().deliveryInfoAller.priceTTC;
        }if(this.selectOrderDelivery?.turnType.id==2 ||this.selectOrderDelivery?.turnType.id==3){

          this.orderDeliveryService.soustPriceRetour(line.priceTtc);

          this.priceRetour=this.orderDeliveryService.getOrderDelivery().deliveryInfoRetour.priceTTC;

        }

      },
    });
  }


  next() {
  console.log("next");

   this.orderDeliveryService.addOrderDeliveryTransport(this.orderDeliveryTransports);
    this.nextstep.emit(true);




}





}
