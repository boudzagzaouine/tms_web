import { emit } from 'process';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { VilleService } from './../../../../../shared/services/api/ville.service';
import { VatService } from './../../../../../shared/services/api/vat.service';
import { TransportServcie } from './../../../../../shared/services/api/transport.service';
import { TurnTypeService } from './../../../../../shared/services/api/turn-type.service';
import { VehicleCategoryService } from './../../../../../shared/services/api/vehicle-category.service';
import { AuthenticationService } from './../../../../../shared/services/api/authentication.service';
import { CatalogTransportTypeServcie } from './../../../../../shared/services/api/Catalog-Transport-Type.service';
import { Vat } from './../../../../../shared/models/vat';
import { Ville } from './../../../../../shared/models/ville';
import { TurnType } from './../../../../../shared/models/turn-Type';
import { Transport } from './../../../../../shared/models/transport';
import { VehicleCategory } from './../../../../../shared/models/vehicle-category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatalogTransportType } from './../../../../../shared/models/CatalogTransportType';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-catalogue-transport-edit',
  templateUrl: './catalogue-transport-edit.component.html',
  styleUrls: ['./catalogue-transport-edit.component.scss']
})
export class CatalogueTransportEditComponent implements OnInit {

  @Input() selectCatalogTransportType = new CatalogTransportType();
  @Input() editMode: boolean;
  @Output() showDialog = new EventEmitter<boolean>();
  @Output() catalogTransportTypeAdded = new EventEmitter <CatalogTransportType>();

  transportCatVehicleForm: FormGroup;
  vehicleCategorieList: VehicleCategory[] = [];
  transportList: Transport[] = [];
  turnTypeList :TurnType[]=[];
  villeList: Ville[] = [];
  vatList: Vat[] = [];
  vat = new Vat();
  displayDialog: boolean;
  isFormSubmitted = false;
  title = 'Modifier  Tarif';
  turnType:number;
  transport : number;
  catVehicle : number;
  villeSource : number;
  villeDestination : number ;
  constructor(
    private catalogTransportTypeService: CatalogTransportTypeServcie,
    private authentificationService:AuthenticationService,
    private vehicleCategoryService: VehicleCategoryService,
    private turnTypeService:TurnTypeService,
    private transportService: TransportServcie,
    private vatService: VatService,
    private villeService: VilleService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,

    private messageService: MessageService,

    ) { }

  ngOnInit() {
    console.log("hello");
console.log(this.editMode);

this.initForm();


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
    this.vatService.findAll().subscribe(
      data => {
        this.vatList = data;
        console.log("List Vat");

        console.log(this.vatList);

      }
    );
    if (this.editMode === false) {
    //  this.selectCatalogTransportType = new CatalogTransportType();
      this.title = 'Ajouter  Tarif';
    }

console.log(this.selectCatalogTransportType);

    this.displayDialog = true;
    this.initForm();

  }

  initForm() {
    this.transportCatVehicleForm = new FormGroup({

      'fAmountHt': new FormControl(this.selectCatalogTransportType.amountHt, Validators.required),
      'fAmountTtc': new FormControl(this.selectCatalogTransportType.amountTtc, Validators.required),
      'fAmountTva': new FormControl(this.selectCatalogTransportType.amountTva, Validators.required),
      'fVehicleCategory': new FormControl(this.selectCatalogTransportType.vehicleCategory, Validators.required),
    // 'fTransport': new FormControl(this.selectCatalogTransportType.transport, Validators.required),
      'fVilleSource': new FormControl(this.selectCatalogTransportType.villeSource, Validators.required),
      'fVilleDestination': new FormControl(this.selectCatalogTransportType.villeDestination, Validators.required),
      'fVat': new FormControl(

         this.editMode!=false ?this.selectCatalogTransportType.vat.value:this.selectCatalogTransportType.vat,

         Validators.required),
         'fTurnType': new FormControl(this.selectCatalogTransportType.turnType, Validators.required),


    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.transportCatVehicleForm.invalid) { return; }

    this.spinner.show();


console.log(this.selectCatalogTransportType.transport );

if(this.selectCatalogTransportType.transport !=null && this.selectCatalogTransportType.transport.id >0){
  this.transport=this.selectCatalogTransportType.transport.id;
  console.log(this.editMode);
console.log(this.selectCatalogTransportType);

  if(this.selectCatalogTransportType !=null && this.selectCatalogTransportType.id >0){
    console.log("insert");
    this.insertcatalogTransport();

  }
  else{
    console.log("existe");
    this.existTransport();


  }

}
else{
  this.insertcatalogTransport();
}

    this.spinner.hide();
  }

  existTransport() {
    this.catalogTransportTypeService.sizeSearch(`transport.id:${this.transport},turnType.id:${this.turnType},vehicleCategory.id:${this.catVehicle},villeSource.id:${this.villeSource},villeDestination.id:${this.villeDestination}`).subscribe(
      data => {
console.log(data);

        if (data > 0) {
          this.messageService.add({severity:'error', summary: 'Edition', detail: 'Elément Existe Déja'});

          //this.toastr.error('Elément Existe Déja', 'Edition');
        } else {
          this.insertcatalogTransport();
        }
        this.spinner.hide();

      },
      error => {
       // this.toastr.error(error.error.message, 'Erreur');
       this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});


        this.spinner.hide();
      },

      () => this.spinner.hide()
    );
  }
  insertcatalogTransport(){

    this.selectCatalogTransportType.amountHt = this.transportCatVehicleForm.value['fAmountHt'];
    this.selectCatalogTransportType.amountTtc = this.transportCatVehicleForm.value['fAmountTtc'];
    this.selectCatalogTransportType.amountTva = this.transportCatVehicleForm.value['fAmountTva'];
    this.selectCatalogTransportType.turnType = this.transportCatVehicleForm.value['fTurnType'];
    this.selectCatalogTransportType.interneOrExterne = false;

     this.selectCatalogTransportType.vehicleCategory = this.transportCatVehicleForm.value['fVehicleCategory'];
    // this.selectCatalogTransportType.transport = this.transportCatVehicleForm.value['fTransport'];
     this.selectCatalogTransportType.villeDestination = this.transportCatVehicleForm.value['fVilleDestination'];
     this.selectCatalogTransportType.villeSource = this.transportCatVehicleForm.value['fVilleSource'];
    this.selectCatalogTransportType.vat =  this.vatList.filter(f=> f.value== this.transportCatVehicleForm.value['fVat'])[0];;
    this.selectCatalogTransportType.owner=this.authentificationService.getDefaultOwner();
    console.log(this.selectCatalogTransportType);

    if(this.selectCatalogTransportType.transport !=null && this.selectCatalogTransportType.transport.id >0){
      console.log("existe transport");

      this.catalogTransportTypeService.set(this.selectCatalogTransportType).subscribe(
        data => {
          this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément Enregistré Avec Succès'});
   console.log(this.selectCatalogTransportType);
   this.catalogTransportTypeAdded.emit(data);

          //this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
          this.displayDialog = false;
          this.isFormSubmitted = false;
          this.spinner.hide();
        },
        error => {
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

         // this.toastr.error(error.error.message);
          this.spinner.hide();
        },

        () => this.spinner.hide()
      );
    }else{
      console.log("not existe transport");
console.log(this.selectCatalogTransportType);

            this.catalogTransportTypeAdded.emit(this.selectCatalogTransportType);

    }
    this.displayDialog = false;
         this.isFormSubmitted = false;


  }

  onSelectVehicleCateory(event: any) {
    this.selectCatalogTransportType.vehicleCategory = event.value;
    this.catVehicle= this.selectCatalogTransportType.vehicleCategory.id;
  }
  onSelectTurnType(event: any) {
    this.selectCatalogTransportType.turnType = event.value;
    this.turnType=  this.selectCatalogTransportType.turnType.id;

   // this.catVehicle=event.value.code;
  }
  onSelectTransport(event: any) {
    this.selectCatalogTransportType.transport = event;
    this.transport=this.selectCatalogTransportType.transport.id;
  }
  onTransportSearch(event: any) {
    this.transportService
      .find('code~' + event.query)
      .subscribe(data => (this.transportList = data));
  }
  onVilleSourceSearch(event: any) {
    this.villeService
      .find('code~' + event.query)
      .subscribe(data => (this.villeList = data));
  }

  onSelectVat(event) {

    this.vat= this.vatList.filter(f=> f.value== event.value)[0];
    this.onPriceChange(1);
  }
  onSelectVilleSource(event: any) {
    this.selectCatalogTransportType.villeSource = event;
    this.villeSource= this.selectCatalogTransportType.villeSource.id;

  }
  onSelectVilleDestination(event: any) {
    this.selectCatalogTransportType.villeDestination = event;
    this.villeDestination = this.selectCatalogTransportType.villeDestination.id;

  }






  onPriceChange(n: Number) {
    let PriceHt = +this.transportCatVehicleForm.value['fAmountHt'];
    let PriceTTC = +this.transportCatVehicleForm.value['fAmountTtc'];
    let vat = this.transportCatVehicleForm.value['fVat'];
    console.log(vat);


    if (PriceHt === undefined || PriceHt == null) {
      PriceHt = 0;
    } if (PriceTTC === undefined || PriceTTC == null) {
      PriceTTC = 0;
    } if (vat === undefined || vat == null) {
      vat = 0;
    }

    if (n === 1) {
      const amountTva = (PriceHt / 100) * vat;
    const priceTTC = PriceHt + amountTva;
    this.transportCatVehicleForm.patchValue({
      'fAmountTtc': priceTTC.toFixed(2),
      'fAmountTva': amountTva.toFixed(2),
    });

    }if (n === 2) {

    PriceHt = PriceTTC / (1 + vat / 100);
    const amountTva = (PriceHt / 100) * vat;
      this.transportCatVehicleForm.patchValue({
        'fAmountHt': PriceHt.toFixed(2),
        'fAmountTva':  amountTva.toFixed(2),
      });
    }

  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }


}
