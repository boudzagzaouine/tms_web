import { AccountService } from './../../../../../shared/services/api/account.service';
import { AccountPricingService } from './../../../../../shared/services/api/account-pricing.service';
import { CatalogTransportTypeServcie } from './../../../../../shared/services/api/Catalog-Transport-Type.service';
import { Ville } from './../../../../../shared/models/ville';
import { TurnType } from './../../../../../shared/models/turn-Type';
import { Transport } from './../../../../../shared/models/transport';
import { VehicleCategory } from './../../../../../shared/models/vehicle-category';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VilleService } from './../../../../../shared/services/api/ville.service';
import { VatService } from './../../../../../shared/services/api/vat.service';
import { TransportServcie } from './../../../../../shared/services/api/transport.service';
import { TurnTypeService } from './../../../../../shared/services/api/turn-type.service';
import { VehicleCategoryService } from './../../../../../shared/services/api/vehicle-category.service';
import { CatalogTransportType } from './../../../../../shared/models/CatalogTransportType';
import { AccountPricing } from './../../../../../shared/models/account-pricing';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Account } from './../../../../../shared/models';

@Component({
  selector: 'app-account-pricing-edit',
  templateUrl: './account-pricing-edit.component.html',
  styleUrls: ['./account-pricing-edit.component.scss']
})
export class AccountPricingEditComponent implements OnInit {

  @Input() selectedAccountPricing :AccountPricing = new AccountPricing();
  @Input() editMode: boolean;
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() accountPricingAdded = new EventEmitter <AccountPricing>();
  accountPricingForm :FormGroup;
  selectedCatalogTransport :CatalogTransportType = new CatalogTransportType();
  displayDialog:Boolean =false;
  isFormSubmitted:Boolean = false;
  title ="Modifier Tarif Client";
  vehicleCategorieList: VehicleCategory[] = [];
  transportList: Transport[] = [];
  turnTypeList :TurnType[]=[];
  villeList: Ville[] = [];
  accountList: Account[] = [];
  idExisteCatalog :Boolean = false;

  constructor(   private vehicleCategoryService: VehicleCategoryService,
    private turnTypeService:TurnTypeService,
    private transportService: TransportServcie,
    private vatService: VatService,
    private villeService: VilleService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private catalogTransportTypeService :CatalogTransportTypeServcie,
   private accountPricingService : AccountPricingService,
   private accountService :AccountService,
    private messageService: MessageService,) { }

  ngOnInit() {


    this.vehicleCategoryService.findAll().subscribe(
      data => {
        this.vehicleCategorieList = data;
      }
    );

    this.turnTypeService.findAll().subscribe(
      data => {
        this.turnTypeList = data;
      }
    );


    this.transportService.findAll().subscribe(
      data => {
        this.transportList = data;
      }
    );
    this.villeService.findAll().subscribe(
      data => {
        this.villeList = data;
      }
    );

    if (this.editMode === false) {
        this.title = 'Ajouter  Tarif Client';
        this.selectedCatalogTransport=this.selectedAccountPricing.catalogTransportType?this.selectedAccountPricing.catalogTransportType: new CatalogTransportType() ;

      }
      else{
        this.selectedCatalogTransport=this.selectedAccountPricing.catalogTransportType;
      }
      this.displayDialog = true;
      this.initForm();
  }


  initForm() {
    console.log("init form");

    this.accountPricingForm = new FormGroup({

      'fAmountHt': new FormControl(this.selectedCatalogTransport?.amountHt?this.selectedCatalogTransport?.amountHt : 0, Validators.required),
      'fVehicleCategory': new FormControl(this.selectedCatalogTransport.vehicleCategory, Validators.required),
    // 'fTransport': new FormControl(this.selectedAccountPricing.transport, Validators.required),
      'fVilleSource': new FormControl(this.selectedCatalogTransport.villeSource, Validators.required),
      'fVilleDestination': new FormControl(this.selectedCatalogTransport.villeDestination, Validators.required),
      'fTurnType': new FormControl(this.selectedCatalogTransport.turnType, Validators.required),
      'fPrice': new FormControl(this.selectedAccountPricing.price, Validators.required),
      'fAccount': new FormControl(this.selectedAccountPricing.account, Validators.required),


    });
  }

  onSubmit(){

    this.isFormSubmitted = true;
    if (this.accountPricingForm.invalid) { return; }

    this.spinner.show();
  this.selectedAccountPricing.price=this.accountPricingForm.value['fPrice'];
console.log(this.selectedAccountPricing.price);

if(this.selectedAccountPricing.transport !=null && this.selectedAccountPricing.transport.id >0){

  if( this.selectedCatalogTransport.id){
    this.selectedAccountPricing.catalogTransportType=this.selectedCatalogTransport;
    //this.selectedAccountPricing.transport=this.selectedCatalogTransport.transport;
    if(this.selectedAccountPricing !=null && this.selectedAccountPricing.id >0){
      this.addAccountPricing();
      }
      else {
        this.existTransport();
      }
  }
}
else{
  console.log("not existe transport");
console.log(this.selectedAccountPricing);

        this.accountPricingAdded.emit(this.selectedAccountPricing);

}

  }

  addAccountPricing(){
    this.accountPricingService.set(this.selectedAccountPricing).subscribe(
      data =>{
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément Enregistré Avec Succès'});
        this.accountPricingAdded.emit(data);

      this.displayDialog = false;
        this.isFormSubmitted = false;
      },
        error => {
         this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});


          this.spinner.hide();
        },

        () => this.spinner.hide()
      );
  }

  existTransport() {
    this.accountPricingService.sizeSearch(`transport.id:${this.selectedAccountPricing.transport.id},account.id:${this.selectedAccountPricing.account.id},catalogTransportType.id:${this.selectedAccountPricing.catalogTransportType.id}`).subscribe(
      data => {
console.log(data);

        if (data > 0) {
          this.messageService.add({severity:'error', summary: 'Edition', detail: 'Elément Existe Déja'});
        } else {
          this.addAccountPricing();
        }
        this.spinner.hide();

      },
      error => {
       this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});


        this.spinner.hide();
      },

      () => this.spinner.hide()
    );
  }

  onSelectVehicleCateory(event: any) {
    this.selectedCatalogTransport.vehicleCategory = event.value;
    this.searchCatalogTransport();
  }
  onSelectTurnType(event: any) {
    this.selectedCatalogTransport.turnType = event.value;
    this.searchCatalogTransport();

  }

  onVilleSourceSearch(event: any) {
    this.villeService
      .find('code~' + event.query)
      .subscribe(data => (this.villeList = data));
  }
  onAccountSearch(event: any) {
    this.accountService
      .find('name~' + event.query)
      .subscribe(data => (this.accountList = data));
  }

  onSelectVilleSource(event: any) {
    this.selectedCatalogTransport.villeSource = event;
    this.searchCatalogTransport();


  }
  onSelectVilleDestination(event: any) {
    this.selectedCatalogTransport.villeDestination = event;
    this.searchCatalogTransport();


  }
  onSelectAccount(event: any) {
    this.selectedAccountPricing.account = event;


  }

  searchCatalogTransport(){
 let isEmpty : number =0;

 if( this.selectedCatalogTransport.vehicleCategory ==null && this.selectedCatalogTransport.vehicleCategory== undefined){
    isEmpty--;
 }
 if( this.selectedCatalogTransport.turnType ==null && this.selectedCatalogTransport.turnType== undefined){
  isEmpty--;
}
if( this.selectedCatalogTransport.villeSource ==null && this.selectedCatalogTransport.villeSource== undefined){
  isEmpty--;
}
if( this.selectedCatalogTransport.villeDestination ==null && this.selectedCatalogTransport.villeDestination== undefined){
  isEmpty--;
}
console.log("empty + " + isEmpty);

if(isEmpty==0){
  console.log("search");
  this.spinner.show();

//   this.catalogTransportTypeService.find(`transport.id:${this.selectedAccountPricing.transport.id},turnType.id:${this.selectedCatalogTransport.turnType.id},vehicleCategory.id:${this.selectedCatalogTransport.vehicleCategory.id},villeSource.id:${this.selectedCatalogTransport.villeSource.id},villeDestination.id:${this.selectedCatalogTransport.villeDestination.id}`).subscribe(
//       data => {
//         console.log(data);
//         console.log(this.idExisteCatalog);

//         if(data[0] != null || data[0] != undefined ){
//  console.log("data");
//  console.log(data);
//  this.selectedCatalogTransport=data[0];
//  this.initForm();
//  this.messageService.add({severity:'info', summary: 'existe', detail: 'existe'});
//  this.idExisteCatalog=false;
//         }
//         else {
//           this.idExisteCatalog=true;
//           this.selectedCatalogTransport.amountHt=0;
//           this.messageService.add({severity:'info', summary: "Trajet n'existe pas", detail: ""});

//           this.initForm();
//         }
//         console.log(this.idExisteCatalog);

//       },
//       error => {
//        // this.toastr.error(error.error.message, 'Erreur');
//        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});


//         this.spinner.hide();
//       },

//       () => this.spinner.hide()
//     );
}

  }


  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

}
