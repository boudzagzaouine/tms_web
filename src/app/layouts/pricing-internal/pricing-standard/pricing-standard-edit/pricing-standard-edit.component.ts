import { TurnType } from './../../../../shared/models/turn-Type';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { Vat } from './../../../../shared/models/vat';
import { Ville } from './../../../../shared/models/ville';
import { VilleService } from './../../../../shared/services/api/ville.service';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../shared/services/api/authentication.service';
import { CatalogTransportTypeServcie } from './../../../../shared/services/api/Catalog-Transport-Type.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatalogTransportType } from './../../../../shared/models/CatalogTransportType';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pricing-standard-edit',
  templateUrl: './pricing-standard-edit.component.html',
  styleUrls: ['./pricing-standard-edit.component.scss']
})
export class PricingStandardEditComponent implements OnInit {

  @Input() selectedCatalogTransportType = new CatalogTransportType();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  vehicleCategorieList: VehicleCategory[] = [];

  turnType:number;
  catalogTransportTypeForm: FormGroup;
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
  constructor(private catalogTransportTypeService: CatalogTransportTypeServcie,
    private authentificationService:AuthenticationService,
    private villeService: VilleService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {


    if (this.editMode === 1) {
      this.selectedCatalogTransportType = new CatalogTransportType();
      this.title = 'Ajouter un type de badge';
    }

    this.displayDialog = true;
    this.initForm();



  }

  onSelectVehicleCateory(event: any) {
    this.selectedCatalogTransportType.vehicleCategory = event.value;
    this.catVehicle= this.selectedCatalogTransportType.vehicleCategory.id;
  }
  onSelectTurnType(event: any) {
    this.selectedCatalogTransportType.turnType = event.value;
    this.turnType=  this.selectedCatalogTransportType.turnType.id;

   // this.catVehicle=event.value.code;
  }
  initForm() {
    this.catalogTransportTypeForm = new FormGroup({
      'fAmountHt': new FormControl(this.selectedCatalogTransportType.amountHt, Validators.required),
      'fAmountTtc': new FormControl(this.selectedCatalogTransportType.amountTtc, Validators.required),
      'fAmountTva': new FormControl(this.selectedCatalogTransportType.amountTva, Validators.required),
      'fVehicleCategory': new FormControl(this.selectedCatalogTransportType.vehicleCategory, Validators.required),
    // 'fTransport': new FormControl(this.selectCatalogTransportType.transport, Validators.required),
      'fVilleSource': new FormControl(this.selectedCatalogTransportType.villeSource, Validators.required),
      'fVilleDestination': new FormControl(this.selectedCatalogTransportType.villeDestination, Validators.required),
      'fVat': new FormControl(this.selectedCatalogTransportType.vat,

         Validators.required),
         'fTurnType': new FormControl(this.selectedCatalogTransportType.turnType, Validators.required),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.catalogTransportTypeForm.invalid) { return; }
    this.spinner.show();
    //this.selectedCatalogTransportType.code = this.catalogTransportTypeForm.value['code'];
    //this.selectedCatalogTransportType.description = this.catalogTransportTypeForm.value['description'];
 this.selectedCatalogTransportType.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");

 console.log(this.selectedCatalogTransportType.owner);

    this.subscriptions.add( this.catalogTransportTypeService.set(this.selectedCatalogTransportType).subscribe(
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
    this.selectedCatalogTransportType.villeSource = event;
    this.villeSource= this.selectedCatalogTransportType.villeSource.id;

  }
  onSelectVilleDestination(event: any) {
    this.selectedCatalogTransportType.villeDestination = event;
    this.villeDestination = this.selectedCatalogTransportType.villeDestination.id;

  }






  onPriceChange(n: Number) {
    let PriceHt = +this.catalogTransportTypeForm.value['fAmountHt'];
    let PriceTTC = +this.catalogTransportTypeForm.value['fAmountTtc'];
    let vat = this.catalogTransportTypeForm.value['fVat'];
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
    this.catalogTransportTypeForm.patchValue({
      'fAmountTtc': priceTTC.toFixed(2),
      'fAmountTva': amountTva.toFixed(2),
    });

    }if (n === 2) {

    PriceHt = PriceTTC / (1 + vat / 100);
    const amountTva = (PriceHt / 100) * vat;
      this.catalogTransportTypeForm.patchValue({
        'fAmountHt': PriceHt.toFixed(2),
        'fAmountTva':  amountTva.toFixed(2),
      });
    }

  }


}
