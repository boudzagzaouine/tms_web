import { TransportPlanServiceCatalog } from './../../../shared/models/transport-plan-service-catalog';
import { LoadingType } from './../../../shared/models/loading-type';
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
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { VehicleCategorieComponent } from './../../settings/vehicle-categorie/vehicle-categorie.component';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { Vehicle } from './../../../shared/models/vehicle';
import { OrderTransportInfoService } from './../../../shared/services/api/order-transport-info.service';
import { OrderTransport } from './../../../shared/models/order-transport';
import { OrderTransportService } from './../../../shared/services/api/order-transport.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transport-plan-edit',
  templateUrl: './transport-plan-edit.component.html',
  styleUrls: ['./transport-plan-edit.component.scss'],
  providers:[ConfirmationService]
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
  selectedTransportProductService = new TransportPlanServiceCatalog();
  editModeTransportProduct: Boolean=false;
  showDialogTransportProduct:Boolean=false;

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
              private confirmationService: ConfirmationService
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

                if(this.selectedOrderTransport?.turnType?.id==1 ||this.selectedOrderTransport?.turnType?.id==3 ){

           this.orderTransportInfoService.find('type~'+'Aller'+',orderTransport.id:'+this.selectedOrderTransport.id).subscribe(
             aller=>{
              if(aller[0]){
             this.selectedOrderTransportInfoAller=aller[0];
            }
                       console.log(aller);

              }
           );
            }

            if(this.selectedOrderTransport?.turnType?.id==2 ||this.selectedOrderTransport?.turnType?.id==3 ){

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
    turnType :new FormControl(this.selectedTransportPlan?.orderTransport?.turnType?.code),
    loadingType :new FormControl(this.selectedTransportPlan?.orderTransport?.loadingType?.code),
    // villeSource :new FormControl(this.selectedTransportPlan?.villeSource?.code),
    // villeDistination :new FormControl(this.selectedTransportPlan?.villeDistination?.code),
    trajet:new FormControl(this.selectedTransportPlan?.trajet?.code),
    account:new FormControl(this.selectedTransportPlan?.account?.name),

    driver:new FormControl(this.selectedTransportPlan.driver),
    vehicleCategory :new FormControl(this.selectedTransportPlan.vehicleCategory),
    transport :new FormControl(this.selectedTransportPlan.transport),
    priceP :new FormControl(this.selectedTransportPlan.purchasePrice),
    price :new FormControl(this.selectedTransportPlan.salePrice),
    date :new FormControl(new Date (this.selectedTransportPlan.dateDepart)),
    status :new FormControl(this.selectedTransportPlan.turnStatus?.code),

    totalPriceHT :new FormControl(this.selectedTransportPlan.totalPriceHT),
    totalPriceTTC :new FormControl(this.selectedTransportPlan.totalPriceTTC),
    totalPriceVat :new FormControl(this.selectedTransportPlan.totalPriceVat),


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
  this.selectedTransportPlan.dateDepart=formValue['date'];
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


   onShowDialogTransportProduct(line, mode) {
    this.showDialogTransportProduct = true;

    if (mode == true) {


      this.selectedTransportProductService= line;
      this.editModeTransportProduct = true;
    } else if (mode == false) {

      this.selectedTransportProductService = new TransportPlanServiceCatalog();
      this.selectedTransportProductService.transport=this.selectedTransportPlan.transport;
      this.selectedTransportProductService.account=this.selectedTransportPlan.account;
      this.selectedTransportProductService.invoice=this.selectedTransportPlan.transport.factureService;

      this.editModeTransportProduct = false;
    }
  }

  onLineEditedTransportProduct(line: TransportPlanServiceCatalog) {
    console.log(line);

    if (
      this.selectedTransportPlan.transportPlanServiceCatalogs == null ||
      this.selectedTransportPlan.transportPlanServiceCatalogs == undefined
    ) {
      this.selectedTransportPlan.transportPlanServiceCatalogs = [];
    }
    this.selectedTransportPlan.transportPlanServiceCatalogs =   this.selectedTransportPlan.transportPlanServiceCatalogs.filter(
      (l) => l.product.code !== line.product.code
    );

    this.selectedTransportPlan.transportPlanServiceCatalogs.push(line);
    this.calculateAllLines();
  }
  onDeleteTransportProduct(productCode: string) {
    this.confirmationService.confirm({
      message: "Voulez vous vraiment Suprimer?",
      accept: () => {
        this.selectedTransportPlan.transportPlanServiceCatalogs =
        this.selectedTransportPlan.transportPlanServiceCatalogs.filter((l) => l.product.code !== productCode);
        this.calculateAllLines();
      },
    });

  }
  onHideDialogTransportProduct(event) {
    this.showDialogTransportProduct = event;
  }


  calculateAllLines() {
    console.log("calculate");

  this.selectedTransportPlan.totalPriceHT=this.selectedOrderTransport.priceHT;
  this.selectedTransportPlan.totalPriceTTC=this.selectedOrderTransport.priceTTC;
  this.selectedTransportPlan.totalPriceVat=this.selectedOrderTransport.priceVat;
    this.selectedTransportPlan?.transportPlanServiceCatalogs.forEach(line => {
      this.selectedTransportPlan.totalPriceHT += +line.salePriceHT;
      this.selectedTransportPlan.totalPriceTTC += +line.salePriceTTC;
      this.selectedTransportPlan.totalPriceVat += +line.salePriceVat;
    }
    );



    this.transportPlanForm.patchValue({
      'totalPriceHT': this.selectedTransportPlan.totalPriceHT
    });
    this.transportPlanForm.patchValue({
      'totalPriceTTC': this.selectedTransportPlan.totalPriceTTC
    });
    this.transportPlanForm.patchValue({
      'totalPriceVat': this.selectedTransportPlan.totalPriceVat
    });



  }
}
