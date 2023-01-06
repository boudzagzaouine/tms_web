import { CatalogTransportPricingService } from './../../../../shared/services/api/catalog-transport-pricing.service';
import { CatalogTransportPricing } from './../../../../shared/models/CatalogTransportPricing';
import { TurnType } from './../../../../shared/models/turn-Type';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { Vat } from './../../../../shared/models/vat';
import { Ville } from './../../../../shared/models/ville';
import { VilleService } from './../../../../shared/services/api/ville.service';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pricing-standard-edit',
  templateUrl: './pricing-standard-edit.component.html',
  styleUrls: ['./pricing-standard-edit.component.scss']
})
export class PricingStandardEditComponent implements OnInit {

  @Input() selectedCatalogTransportPricing = new CatalogTransportPricing();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  vehicleCategorieList: VehicleCategory[] = [];

  turnType:number;
  catalogTransportPricingForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier ';
  subscriptions= new Subscription();
  villeList:Array<Ville>=[];
  vatList:Array<Vat>=[];
  vat = new Vat();
  catVehicle : number;
  turnTypeList :TurnType[]=[];

  villeSource : number;
  villeDestination : number ;
  constructor(private catalogTransportPricingService: CatalogTransportPricingService,
    private authentificationService:AuthenticationService,
    private villeService: VilleService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedCatalogTransportPricing = new CatalogTransportPricing();
      this.title = 'Ajouter un type de badge';
    }

    this.displayDialog = true;
    this.initForm();



  }

  onSelectVehicleCateory(event: any) {
    this.selectedCatalogTransportPricing.vehicleCategory = event.value;
    this.catVehicle= this.selectedCatalogTransportPricing.vehicleCategory.id;
  }
  onSelectTurnType(event: any) {
    this.selectedCatalogTransportPricing.turnType = event.value;
    this.turnType=  this.selectedCatalogTransportPricing.turnType.id;

   // this.catVehicle=event.value.code;
  }
  initForm() {
    this.catalogTransportPricingForm = new FormGroup({
      'fAmountHt': new FormControl(this.selectedCatalogTransportPricing.purchaseAmountHt, Validators.required),
      'fAmountTtc': new FormControl(this.selectedCatalogTransportPricing.purchaseAmountTtc, Validators.required),
      'fAmountTva': new FormControl(this.selectedCatalogTransportPricing.purchaseAmountTva, Validators.required),
      'fVehicleCategory': new FormControl(this.selectedCatalogTransportPricing.vehicleCategory, Validators.required),
    // 'fTransport': new FormControl(this.selectCatalogTransportPricing.transport, Validators.required),
      'fVilleSource': new FormControl(this.selectedCatalogTransportPricing.villeSource, Validators.required),
      'fVilleDestination': new FormControl(this.selectedCatalogTransportPricing.villeDestination, Validators.required),
      'fVat': new FormControl(this.selectedCatalogTransportPricing.purchaseVat,

         Validators.required),
         'fTurnType': new FormControl(this.selectedCatalogTransportPricing.turnType, Validators.required),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.catalogTransportPricingForm.invalid) { return; }
    this.spinner.show();
    //this.selectedCatalogTransportPricing.code = this.catalogTransportPricingForm.value['code'];
    //this.selectedCatalogTransportPricing.description = this.catalogTransportPricingForm.value['description'];
 //this.selectedCatalogTransportPricing.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

// console.log(this.selectedCatalogTransportPricing.owner);

    this.subscriptions.add( this.catalogTransportPricingService.set(this.selectedCatalogTransportPricing).subscribe(
      data => {
        //this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});

        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       // this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }
  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
    this.selectedCatalogTransportPricing.villeSource = event;
    this.villeSource= this.selectedCatalogTransportPricing.villeSource.id;

  }
  onSelectVilleDestination(event: any) {
    this.selectedCatalogTransportPricing.villeDestination = event;
    this.villeDestination = this.selectedCatalogTransportPricing.villeDestination.id;

  }






  onPriceChange(n: Number) {
    let PriceHt = +this.catalogTransportPricingForm.value['fAmountHt'];
    let PriceTTC = +this.catalogTransportPricingForm.value['fAmountTtc'];
    let vat = this.catalogTransportPricingForm.value['fVat'];
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
    this.catalogTransportPricingForm.patchValue({
      'fAmountTtc': priceTTC.toFixed(2),
      'fAmountTva': amountTva.toFixed(2),
    });

    }if (n === 2) {

    PriceHt = PriceTTC / (1 + vat / 100);
    const amountTva = (PriceHt / 100) * vat;
      this.catalogTransportPricingForm.patchValue({
        'fAmountHt': PriceHt.toFixed(2),
        'fAmountTva':  amountTva.toFixed(2),
      });
    }

  }


}
