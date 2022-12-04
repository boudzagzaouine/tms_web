import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { OrderTransportInfo } from './../../../shared/models/order-transport-info';
import { ActivatedRoute, Router } from '@angular/router';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ContractAccount } from './../../../shared/models/contract-account';
import { ContractAccountService } from './../../../shared/services/api/contract-account.service';
import { TurnStatusService } from './../../../shared/services/api/turn-status.service';
import { TurnStatus } from './../../../shared/models/turn-status';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransportPlanService } from './../../../shared/services/api/transport-plan.service';
import { DriverService } from './../../../shared/services/api/driver.service';
import { TransportPlan } from './../../../shared/models/transport-plan';
import { Driver } from './../../../shared/models/driver';
import { FormGroup, FormControl } from '@angular/forms';
import { Transport } from './../../../shared/models/transport';
import { CatalogTransportType } from './../../../shared/models/CatalogTransportType';
import { CatalogTransportTypeServcie } from './../../../shared/services/api/Catalog-Transport-Type.service';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { VehicleCategorieComponent } from './../../settings/vehicle-categorie/vehicle-categorie.component';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { Vehicle } from './../../../shared/models/vehicle';
import { OrderTransportInfoService } from './../../../shared/services/api/order-transport-info.service';
import { OrderTransport } from './../../../shared/models/order-transport';
import { OrderTransportService } from './../../../shared/services/api/order-transport.service';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transport-plan-edit',
  templateUrl: './transport-plan-edit.component.html',
  styleUrls: ['./transport-plan-edit.component.scss']
})
export class TransportPlanEditComponent implements OnInit {

  selectedTransportPlan :TransportPlan = new TransportPlan();
  transportPlanForm :FormGroup;
  vehicleList:Vehicle[]=[];
  driverList:Driver[]=[];
  selectedOrderTransport: OrderTransport = new OrderTransport();
  selectedOrderTransportInfoAller: OrderTransportInfo = new OrderTransportInfo();
  selectedOrderTransportInfoRetour: OrderTransportInfo = new OrderTransportInfo();
  vehicleCategoryList : VehicleCategory[]=[];
  transportList : Transport[]=[];
  isFormSubmitted : Boolean =false;
  constructor(private transportPlanService:TransportPlanService,
              private activatedRoute:ActivatedRoute,
              private driverService :DriverService,
              private transportService : TransportServcie,
              private vehicleCategoryService :VehicleCategoryService,
              public orderTransportService: OrderTransportService,
              public orderTransportInfoService: OrderTransportInfoService,
              private toastr: ToastrService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private  vehicleService :VehicleService,
              ) { }

  ngOnInit() {
    this.driverService.findAll().subscribe(
      data => {
          this.driverList =data;
      }
    );
    this.vehicleCategoryService.findAll().subscribe(
      data => {
          this.vehicleCategoryList =data;
      }
    );
    this.transportService.findAll().subscribe(
      data => {
          this.transportList =data;
      }
    );

    this.initForm();
    let id = this.activatedRoute.snapshot.params["id"];
    if (id) {
      this.activatedRoute.params.subscribe((params) => {
        id = params["id"];

          this.transportPlanService.findById(id).subscribe(
            (data) => {
              this.selectedTransportPlan=data;
 console.log( this.selectedTransportPlan);

              this.orderTransportService.findById(this.selectedTransportPlan.orderTransport.id).subscribe((data) => {
                this.selectedOrderTransport = data;
                console.log(this.selectedOrderTransport);

                if(this.selectedOrderTransport.turnType.id==1 ||this.selectedOrderTransport.turnType.id==3 ){

           this.orderTransportInfoService.find('type~'+'Aller'+',orderTransport.id:'+this.selectedOrderTransport.id).subscribe(
             aller=>{
              if(aller[0]){
             this.selectedOrderTransportInfoAller=aller[0];
            }
                       console.log(aller);

              }
           );
            }

            if(this.selectedOrderTransport.turnType.id==2 ||this.selectedOrderTransport.turnType.id==3 ){

              this.orderTransportInfoService.find('type~'+'Retour'+',orderTransport.id:'+this.selectedOrderTransport.id).subscribe(
                retour=>{
if(retour[0]){
                  this.selectedOrderTransportInfoRetour=retour[0];

                                          }                          console.log(retour);

                 }
              );
               }



              });

              this.initForm();
            })
          })

        }
  }

initForm(){
  this.transportPlanForm = new FormGroup({

    orderTransport: new FormControl(this.selectedTransportPlan.orderTransport?.code),
    vehicle :new FormControl(this.selectedTransportPlan.vehicle),
    driver:new FormControl(this.selectedTransportPlan.driver),
    vehicleCategory :new FormControl(this.selectedTransportPlan.vehicleCategory),
    transport :new FormControl(this.selectedTransportPlan.transport),
    price :new FormControl(this.selectedTransportPlan.salePrice),
    date :new FormControl(new Date (this.selectedTransportPlan.date)),
    status :new FormControl(this.selectedTransportPlan.turnStatus?.code),

  })
}

onTransportSearch(event){
  this.transportService
  .find('name~' + event.query)
  .subscribe(data => (this.transportList = data))
}
onSelectTransport(event){
  console.log(event);
  this.selectedTransportPlan.transport =event;
}
onVehicleSearch(event){
  this.vehicleService
  .find('registrationNumber~' + event.query)
  .subscribe(data => (this.vehicleList = data))
}
onSelectVehicle(event){
  console.log(event);
  this.selectedTransportPlan.vehicle =event;
  this.selectedTransportPlan.driver=this.selectedTransportPlan.vehicle.driver;
console.log(this.selectedTransportPlan.driver);

  this.transportPlanForm.patchValue({
          driver: this.selectedTransportPlan.driver,

        });
        this.transportPlanForm.updateValueAndValidity();
}

onSelectVehicleCategory(event){
  console.log(event.value);
  this.selectedTransportPlan.vehicleCategory =event.value;
}
onSelectDriver(event){
  console.log(event.value);
  this.selectedTransportPlan.driver =event.value;
}





onSubmit(close=false){

  this.isFormSubmitted=true;

  if(this.transportPlanForm.invalid){return;}
  this.spinner.show();

  let formValue = this.transportPlanForm.value;

  this.selectedTransportPlan.salePrice=formValue['price'];
  this.selectedTransportPlan.date=formValue['date'];
    this.transportPlanService.set(this.selectedTransportPlan).subscribe(
     (data) => {
       this.selectedTransportPlan = data;

       this.toastr.success(
         "Elément Turn est Enregistré Avec Succès ",
         "Edition"
       );
       if (close) {
         this.router.navigate(['/core/transport-plan/list']);
       } else {

         this.router.navigate(['/core/transport-plan/edit']);
       }
     },
     (error) => {
       this.toastr.error(error.error.message);
       this.spinner.hide();
     },
     () => this.spinner.hide()
   );


   }

}
