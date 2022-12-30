import { CatalogPricing } from './../../../../shared/models/catalog-pricing';
import { CatalogPricingService } from './../../../../shared/services/api/agent.service copy';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VilleService } from './../../../../shared/services/api/ville.service';
import { VatService } from './../../../../shared/services/api/vat.service';
import { TransportServcie } from './../../../../shared/services/api/transport.service';
import { TurnTypeService } from './../../../../shared/services/api/turn-type.service';
import { VehicleCategoryService } from './../../../../shared/services/api/vehicle-category.service';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { Vat } from './../../../../shared/models/vat';
import { Ville } from './../../../../shared/models/ville';
import { TurnType } from './../../../../shared/models/turn-Type';
import { Transport } from './../../../../shared/models/transport';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-catalog-pricing-edit',
  templateUrl: './catalog-pricing-edit.component.html',
  styleUrls: ['./catalog-pricing-edit.component.css']
})
export class CatalogPricingEditComponent implements OnInit {

  @Input() selectCatalogPricing = new CatalogPricing();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  catalogPricingForm: FormGroup;
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
    private catalogPricingService: CatalogPricingService,
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
      this.selectCatalogPricing = new CatalogPricing();
      this.title = 'Ajouter  Tarif';

    }
console.log(this.selectCatalogPricing);

    this.displayDialog = true;
    this.initForm();

  }

  initForm() {
    this.catalogPricingForm = new FormGroup({
      'fVehicleCategory': new FormControl(this.selectCatalogPricing.vehicleCategory, Validators.required),
      'fVehicleTray': new FormControl(this.selectCatalogPricing.vehicleTray, Validators.required),
      'fLoadingType': new FormControl(this.selectCatalogPricing.loadingType, Validators.required),
      'fTurnType': new FormControl(this.selectCatalogPricing.turnType, Validators.required),

      'fPaysSource': new FormControl(this.selectCatalogPricing.paysSource, Validators.required),
      'fVilleSource': new FormControl(this.selectCatalogPricing.villeSource, Validators.required),
      'fPaysDestination': new FormControl(this.selectCatalogPricing.paysDestination, Validators.required),
      'fVilleDestination': new FormControl(this.selectCatalogPricing.villeDestination, Validators.required),

      'fPurchaseAmountHt': new FormControl(this.selectCatalogPricing.purchaseAmountHt, Validators.required),
      'fPurrchaseAmountTtc': new FormControl(this.selectCatalogPricing.purchaseAmountTtc, Validators.required),
      'fPurchaseAmountTva': new FormControl(this.selectCatalogPricing.purchaseAmountTva, Validators.required),
      'fVat': new FormControl(
         this.editMode!=1 ?this.selectCatalogPricing.purchaseVat.value:this.selectCatalogPricing.purchaseVat,
         Validators.required),


         'fSaleAmountHt': new FormControl(this.selectCatalogPricing.saleAmountHt, Validators.required),
         'fSaleAmountTtc': new FormControl(this.selectCatalogPricing.saleAmountTtc, Validators.required),
         'fSaleAmountTva': new FormControl(this.selectCatalogPricing.saleAmountTva, Validators.required),
         'fSaleVat': new FormControl(

          this.editMode!=1 ?this.selectCatalogPricing.saleVat.value:this.selectCatalogPricing.saleVat,

          Validators.required),
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.catalogPricingForm.invalid) { return; }

    this.spinner.show();

    if (this.editMode === 1) {


       this.existTransport();
    } else if (this.editMode === 2) {


           this.insertcatalogTransport();
    }


    this.selectCatalogPricing = new CatalogPricing();


  }

  existTransport() {
    this.catalogPricingService.sizeSearch(`transport.id:${this.transport},turnType.id:${this.turnType},vehicleCategory.id:${this.catVehicle},villeSource.id:${this.villeSource},villeDestination.id:${this.villeDestination}`).subscribe(
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

    this.selectCatalogPricing.purchaseAmountHt = this.catalogPricingForm.value['fAmountHt'];
    this.selectCatalogPricing.purchaseAmountTtc = this.catalogPricingForm.value['fAmountTtc'];
    this.selectCatalogPricing.purchaseAmountTva = this.catalogPricingForm.value['fAmountTva'];

    this.selectCatalogPricing.saleAmountHt = this.catalogPricingForm.value['fGroupingAmountHt'];
    this.selectCatalogPricing.saleAmountTtc = this.catalogPricingForm.value['fGroupingAmountTtc'];
    this.selectCatalogPricing.saleAmountTva = this.catalogPricingForm.value['fGroupingAmountTva'];

    this.selectCatalogPricing.turnType = this.catalogPricingForm.value['fTurnType'];

     this.selectCatalogPricing.vehicleCategory = this.catalogPricingForm.value['fVehicleCategory'];
     this.selectCatalogPricing.transport = this.defaultTransport;
     this.selectCatalogPricing.villeDestination = this.catalogPricingForm.value['fVilleDestination'];
     this.selectCatalogPricing.villeSource = this.catalogPricingForm.value['fVilleSource'];
   // this.selectCatalogPricing.vat =  this.vatList.filter(f=> f.value== this.catalogPricingForm.value['fVat'])[0];
    this.selectCatalogPricing.owner=this.authentificationService.getDefaultOwner();
    console.log(this.selectCatalogPricing);

    this.catalogPricingService.set(this.selectCatalogPricing).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément Enregistré Avec Succès'});
 console.log(this.selectCatalogPricing);

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
    this.selectCatalogPricing.vehicleCategory = event.value;
    this.catVehicle= this.selectCatalogPricing.vehicleCategory.id;
  }
  onSelectTurnType(event: any) {
    this.selectCatalogPricing.turnType = event.value;
    this.turnType=  this.selectCatalogPricing.turnType.id;

   // this.catVehicle=event.value.code;
  }
  onSelectTransport(event: any) {
    this.selectCatalogPricing.transport = event;
    this.transport=this.selectCatalogPricing.transport.id;
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
    this.selectCatalogPricing.vat=event.value;

    this.onPriceChange(1);
  }

  onSelectGroupingVat(event) {
  this.selectCatalogPricing.groupingVat=event.value;
    this.vat= event.value;
    this.onPriceChange(1);
  }
  onSelectVilleSource(event: any) {
    this.selectCatalogPricing.villeSource = event;
    this.villeSource= this.selectCatalogPricing.villeSource.id;

  }
  onSelectVilleDestination(event: any) {
    this.selectCatalogPricing.villeDestination = event;
    this.villeDestination = this.selectCatalogPricing.villeDestination.id;
  }






  onPriceChange(n: Number) {
    let PriceHt = +this.catalogPricingForm.value['fAmountHt'];
    let PriceTTC = +this.catalogPricingForm.value['fAmountTtc'];
    let vat = this.catalogPricingForm.value['fVat'];
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
    this.catalogPricingForm.patchValue({
      'fAmountTtc': priceTTC.toFixed(2),
      'fAmountTva': amountTva.toFixed(2),
    });

    }if (n === 2) {

    PriceHt = PriceTTC / (1 + vat / 100);
    const amountTva = (PriceHt / 100) * vat;
      this.catalogPricingForm.patchValue({
        'fAmountHt': PriceHt.toFixed(2),
        'fAmountTva':  amountTva.toFixed(2),
      });
    }

  }


  onGroupingPriceChange(n: Number) {
    let PriceHt = +this.catalogPricingForm.value['fGroupingAmountHt'];
    let PriceTTC = +this.catalogPricingForm.value['fGroupingAmountTtc'];
    let vat = this.catalogPricingForm.value['fGroupingVat'];
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
    this.catalogPricingForm.patchValue({
      'fGroupingAmountTtc': priceTTC.toFixed(2),
      'fGroupingAmountTva': amountTva.toFixed(2),
    });

    }if (n === 2) {

    PriceHt = PriceTTC / (1 + vat / 100);
    const amountTva = (PriceHt / 100) * vat;
      this.catalogPricingForm.patchValue({
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
