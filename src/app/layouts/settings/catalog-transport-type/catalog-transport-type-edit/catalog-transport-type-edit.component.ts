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
import { CatalogTransportType } from './../../../../shared/models/CatalogTransportType';
import { CatalogTransportTypeServcie } from './../../../../shared/services/api/Catalog-Transport-Type.service';
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
export class CatalogTransportTypeEditComponent implements OnInit {


  @Input() selectCatalogTransportType = new CatalogTransportType();
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
  title = 'Modifier un Trajet';
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
    if (this.editMode === 1) {
      this.selectCatalogTransportType = new CatalogTransportType();
      this.title = 'Ajouter un Trajet';

    }

    this.displayDialog = true;
    this.initForm();

  }

  initForm() {
    this.transportCatVehicleForm = new FormGroup({

      'fAmountHt': new FormControl(this.selectCatalogTransportType.amountHt, Validators.required),
      'fAmountTtc': new FormControl(this.selectCatalogTransportType.amountTtc, Validators.required),
      'fAmountTva': new FormControl(this.selectCatalogTransportType.amountTva, Validators.required),
      'fVehicleCategory': new FormControl(this.selectCatalogTransportType.vehicleCategory, Validators.required),
      'fTransport': new FormControl(this.selectCatalogTransportType.transport, Validators.required),
      'fVilleSource': new FormControl(this.selectCatalogTransportType.villeSource, Validators.required),
      'fVilleDestination': new FormControl(this.selectCatalogTransportType.villeDestination, Validators.required),
      'fVat': new FormControl(

         this.editMode!=1 ?this.selectCatalogTransportType.vat.value:this.selectCatalogTransportType.vat,

         Validators.required),
         'fTurnType': new FormControl(this.selectCatalogTransportType.turnType, Validators.required),


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


    this.selectCatalogTransportType = new CatalogTransportType();


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

     this.selectCatalogTransportType.vehicleCategory = this.transportCatVehicleForm.value['fVehicleCategory'];
     this.selectCatalogTransportType.transport = this.transportCatVehicleForm.value['fTransport'];
     this.selectCatalogTransportType.villeDestination = this.transportCatVehicleForm.value['fVilleDestination'];
     this.selectCatalogTransportType.villeSource = this.transportCatVehicleForm.value['fVilleSource'];
    this.selectCatalogTransportType.vat =  this.vatList.filter(f=> f.value== this.transportCatVehicleForm.value['fVat'])[0];;
    this.selectCatalogTransportType.owner=this.authentificationService.getDefaultOwner();
    console.log(this.selectCatalogTransportType);

    this.catalogTransportTypeService.set(this.selectCatalogTransportType).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément Enregistré Avec Succès'});
 console.log(this.selectCatalogTransportType);

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
