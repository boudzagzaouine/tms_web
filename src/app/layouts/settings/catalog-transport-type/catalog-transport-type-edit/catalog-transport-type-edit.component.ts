import { CatalogTransportPricing } from './../../../../shared/models/CatalogTransportPricing';
import { CatalogTransportPricingService } from './../../../../shared/services/api/catalog-transport-pricing.service';
import { TurnTypeService } from './../../../../shared/services/api/turn-type.service';
import { TurnType } from './../../../../shared/models/turn-Type';
import { Ville } from './../../../../shared/models/ville';
import { VilleService } from './../../../../shared/services/api/ville.service';
import { Transport } from './../../../../shared/models/transport';
import { RoundPipe } from 'ngx-pipes';
import { VatService } from './../../../../shared/services/api/vat.service';
import { Vat } from './../../../../shared/models/vat';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TransportServcie } from './../../../../shared/services/api/transport.service';
import { VehicleCategoryService } from './../../../../shared/services/api/vehicle-category.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from './../../../../shared/services';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-catalog-transport-type-edit',
  templateUrl: './catalog-transport-type-edit.component.html',
  styleUrls: ['./catalog-transport-type-edit.component.css'],
  providers: [RoundPipe]
})
export class CatalogTransportPricingEditComponent implements OnInit {


  @Input() selectCatalogTransportPricing = new CatalogTransportPricing();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

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
  defaultTransport :Transport = new Transport();
  constructor(
    private catalogTransportPricingService: CatalogTransportPricingService,
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
this.transportService.find('interneOrExterne:true').subscribe(
  data =>{
    this.defaultTransport=data[0];
    console.log(data[0]);

    this.transport=this.defaultTransport.id;
  }
);

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
    if (this.editMode === 1) {
      this.selectCatalogTransportPricing = new CatalogTransportPricing();
      this.title = 'Ajouter  Tarif';

    }
console.log(this.selectCatalogTransportPricing);

    this.displayDialog = true;
    this.initForm();

  }

  initForm() {
    this.transportCatVehicleForm = new FormGroup({
 'fVehicleCategory': new FormControl(this.selectCatalogTransportPricing.vehicleCategory, Validators.required),
      //'fTransport': new FormControl(this.selectCatalogTransportPricing.transport, Validators.required),
      'fVilleSource': new FormControl(this.selectCatalogTransportPricing.villeSource, Validators.required),
      'fVilleDestination': new FormControl(this.selectCatalogTransportPricing.villeDestination, Validators.required),

         'fTurnType': new FormControl(this.selectCatalogTransportPricing.turnType, Validators.required),

      'fAmountHt': new FormControl(this.selectCatalogTransportPricing.purchaseAmountHt, Validators.required),
      'fAmountTtc': new FormControl(this.selectCatalogTransportPricing.purchaseAmountTtc, Validators.required),
      'fAmountTva': new FormControl(this.selectCatalogTransportPricing.purchaseAmountTva, Validators.required),
'fVat': new FormControl(

         this.editMode!=1 ?this.selectCatalogTransportPricing.purchaseVat.value:this.selectCatalogTransportPricing.purchaseAmountHt,

         Validators.required),


         'fGroupingAmountHt': new FormControl(this.selectCatalogTransportPricing.purchaseAmountHt, Validators.required),
         'fGroupingAmountTtc': new FormControl(this.selectCatalogTransportPricing.purchaseAmountTtc, Validators.required),
         'fGroupingAmountTva': new FormControl(this.selectCatalogTransportPricing.purchaseAmountTva, Validators.required),
         'fGroupingVat': new FormControl(

          this.editMode!=1 ?this.selectCatalogTransportPricing.purchaseVat.value:this.selectCatalogTransportPricing.purchaseAmountHt,

          Validators.required),
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.transportCatVehicleForm.invalid) { return; }

    this.spinner.show();

    if (this.editMode === 1) {


       this.existTransport();
    } else if (this.editMode === 2) {


           this.insertcatalogTransport();
    }


    this.selectCatalogTransportPricing = new CatalogTransportPricing();


  }

  existTransport() {
    this.catalogTransportPricingService.sizeSearch(`transport.id:${this.transport},turnType.id:${this.turnType},vehicleCategory.id:${this.catVehicle},villeSource.id:${this.villeSource},villeDestination.id:${this.villeDestination}`).subscribe(
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

    this.selectCatalogTransportPricing.purchaseAmountHt = this.transportCatVehicleForm.value['fAmountHt'];
    this.selectCatalogTransportPricing.purchaseAmountTtc = this.transportCatVehicleForm.value['fAmountTtc'];
    this.selectCatalogTransportPricing.purchaseAmountTva = this.transportCatVehicleForm.value['fAmountTva'];


    this.selectCatalogTransportPricing.turnType = this.transportCatVehicleForm.value['fTurnType'];

     this.selectCatalogTransportPricing.vehicleCategory = this.transportCatVehicleForm.value['fVehicleCategory'];
     this.selectCatalogTransportPricing.transport = this.defaultTransport;
     this.selectCatalogTransportPricing.villeDestination = this.transportCatVehicleForm.value['fVilleDestination'];
     this.selectCatalogTransportPricing.villeSource = this.transportCatVehicleForm.value['fVilleSource'];
   // this.selectCatalogTransportPricing.vat =  this.vatList.filter(f=> f.value== this.transportCatVehicleForm.value['fVat'])[0];
    //this.selectCatalogTransportPricing.owner=this.authentificationService.getDefaultOwner();
    console.log(this.selectCatalogTransportPricing);

    this.catalogTransportPricingService.set(this.selectCatalogTransportPricing).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément Enregistré Avec Succès'});
 console.log(this.selectCatalogTransportPricing);

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
  }

  onSelectVehicleCateory(event: any) {
    this.selectCatalogTransportPricing.vehicleCategory = event.value;
    this.catVehicle= this.selectCatalogTransportPricing.vehicleCategory.id;
  }
  onSelectTurnType(event: any) {
    this.selectCatalogTransportPricing.turnType = event.value;
    this.turnType=  this.selectCatalogTransportPricing.turnType.id;

   // this.catVehicle=event.value.code;
  }
  onSelectTransport(event: any) {
    this.selectCatalogTransportPricing.transport = event;
    this.transport=this.selectCatalogTransportPricing.transport.id;
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

    this.vat= event.value;
    this.selectCatalogTransportPricing.purchaseVat=event.value;

    this.onPriceChange(1);
  }

  onSelectGroupingVat(event) {
  this.selectCatalogTransportPricing.purchaseVat=event.value;
    this.vat= event.value;
    this.onPriceChange(1);
  }
  onSelectVilleSource(event: any) {
    this.selectCatalogTransportPricing.villeSource = event;
    this.villeSource= this.selectCatalogTransportPricing.villeSource.id;

  }
  onSelectVilleDestination(event: any) {
    this.selectCatalogTransportPricing.villeDestination = event;
    this.villeDestination = this.selectCatalogTransportPricing.villeDestination.id;
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


  onGroupingPriceChange(n: Number) {
    let PriceHt = +this.transportCatVehicleForm.value['fGroupingAmountHt'];
    let PriceTTC = +this.transportCatVehicleForm.value['fGroupingAmountTtc'];
    let vat = this.transportCatVehicleForm.value['fGroupingVat'];
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
      'fGroupingAmountTtc': priceTTC.toFixed(2),
      'fGroupingAmountTva': amountTva.toFixed(2),
    });

    }if (n === 2) {

    PriceHt = PriceTTC / (1 + vat / 100);
    const amountTva = (PriceHt / 100) * vat;
      this.transportCatVehicleForm.patchValue({
        'fGroupingAmountHt': PriceHt.toFixed(2),
        'fGroupingAmountTva':  amountTva.toFixed(2),
      });
    }

  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

}
