import { OrderDeliveryService } from './../../../../../shared/services/api/order-delivery.service';
import { CatalogTransportTypeServcie } from './../../../../../shared/services/api/Catalog-Transport-Type.service';
import { CatalogTransportType } from './../../../../../shared/models/CatalogTransportType';
import { OrderDeliveryTransport } from './../../../../../shared/models/order-delivery-transport';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Driver } from './../../../../../shared/models/driver';
import { Transport } from './../../../../../shared/models/transport';
import { VehicleCategory } from './../../../../../shared/models/vehicle-category';
import { Vehicle } from './../../../../../shared/models/vehicle';
import { TransportServcie } from './../../../../../shared/services/api/transport.service';
import { TransportCategoryVehicleService } from './../../../../../shared/services/api/transport-category-vehicle.service';
import { DriverService } from './../../../../../shared/services/api/driver.service';
import { VehicleService } from './../../../../../shared/services/api/vehicle.service';
import { VehicleCategoryService } from './../../../../../shared/services/api/vehicle-category.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { OrderDelivery } from './../../../../../shared/models/order-delivery';

@Component({
  selector: 'app-transport-edit',
  templateUrl: './transport-edit.component.html',
  styleUrls: ['./transport-edit.component.css']
})
export class TransportEditComponent implements OnInit {

  @Output() showDialog = new EventEmitter<boolean>();
  @Output () orderDeliveryTransportEdited =new EventEmitter<OrderDeliveryTransport>();
  @Input () selectedOrderDeliveryTransport : OrderDeliveryTransport = new OrderDeliveryTransport();
  orderDeliveryTransportForm :FormGroup;
  selectOrderDelivery :OrderDelivery = new OrderDelivery();
  displayDialog: boolean;
  title :string ;
  vehicleList:Vehicle[]=[];
  vehicleCategoryList:VehicleCategory[]=[];
  transportList:Transport[]=[];
  driverList:Driver[]=[];

  constructor(private vehicleCategoryService :VehicleCategoryService,
              private vehicleService:VehicleService,
              private driverService:DriverService,
              private transportService : TransportServcie,
              private catalogTransportTypeService : CatalogTransportTypeServcie,
              private OrderDeliveryService : OrderDeliveryService) { }

  ngOnInit() {

    this.displayDialog =true;

    this.vehicleCategoryService.findAll().subscribe(
      data=>{
        this.vehicleCategoryList=data;
      }
    );

    this.transportService.findAll().subscribe(
      data=>{
        this.transportList=data;
      }
    );
    this.driverService.findAll().subscribe(
      data=>{
        this.driverList=data;
      }
    );

this.selectOrderDelivery=this.OrderDeliveryService.getOrderDelivery();
this.initForm();

  }

  initForm(){

this.orderDeliveryTransportForm = new FormGroup({
   'vehicle' : new FormControl(this.selectedOrderDeliveryTransport.vehicle,Validators.required),
   'vehicleCategory' : new FormControl(this.selectedOrderDeliveryTransport.vehicleCategory,Validators.required),
   'transport' : new FormControl(this.selectedOrderDeliveryTransport.transport,Validators.required),
   'driver' : new FormControl(this.selectedOrderDeliveryTransport.drivers,Validators.required),
})

  }

  onSelectVehiclecategory(event){
console.log(event.value);
 let vehicleCatId =event.value.id;
    this.selectedOrderDeliveryTransport.vehicleCategory=event.value;

    this.vehicleService.find('vehicleCategory.id:'+vehicleCatId).subscribe(
      data =>{
            this.vehicleList=data;
            console.log(data);


      }
    );


  }

  onSelectTransport(event){
this.selectedOrderDeliveryTransport.transport=event.value;
  }
  onSelectVehicle(event){
console.log(event.value.driver);
this.selectedOrderDeliveryTransport.vehicle=event.value;
this.selectedOrderDeliveryTransport.drivers.push(event.value.driver);
this.initForm();
console.log();

  //   this.orderDeliveryTransportForm.patchValue({

  //     driver :event.value.driver
  //   });
  // this.orderDeliveryTransportForm.updateValueAndValidity();

  }

onSubmit(){

 this. searchTrajet();




}


  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  searchTrajet(){
    console.log( this.selectedOrderDeliveryTransport.vehicleCategory.id);
    console.log( this.selectOrderDelivery?.deliveryInfoAller.contactDeliveryInfoSource?.city);
    console.log( this.selectOrderDelivery?.deliveryInfoAller.contactDeliveryInfoDistination?.city);
    console.log(  this.selectedOrderDeliveryTransport.transport.id);

    this.catalogTransportTypeService
    .find(
      "vehicleCategory.id:" +
      this.selectedOrderDeliveryTransport.vehicleCategory.id +
        ",villeSource.code~" +
        this.selectOrderDelivery?.deliveryInfoAller.contactDeliveryInfoSource?.city +
        ",villeDestination.code~" +
        this.selectOrderDelivery?.deliveryInfoAller.contactDeliveryInfoDistination?.city +
        ",transport.id:" +
        this.selectedOrderDeliveryTransport.transport.id
    )
    .subscribe((data) => {
console.log(data);

  let catalogue  :CatalogTransportType =data[0];
this.selectedOrderDeliveryTransport.priceTtc=catalogue?.amountTtc;
console.log("price");
console.log(this.selectedOrderDeliveryTransport.priceTtc);

   },
err => {
console.log("err");

},
() => {
  this.selectedOrderDeliveryTransport.drivers = this.orderDeliveryTransportForm.value['driver'];
this.orderDeliveryTransportEdited.emit(this.selectedOrderDeliveryTransport);
this.displayDialog=false;
}
);
  }
}

