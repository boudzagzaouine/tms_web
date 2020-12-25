import { Transport } from './../../../../shared/models/transport';
import { RoundPipe } from 'ngx-pipes';
import { VatService } from './../../../../shared/services/api/vat.service';
import { Vat } from './../../../../shared/models/vat';
import { Zone } from './../../../../shared/models/Zone';
import { ZoneServcie } from './../../../../shared/services/api/zone.service';
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
  zoneList: Zone[] = [];
  vatList: Vat[] = [];
  vat = new Vat();
  displayDialog: boolean;
  isFormSubmitted = false;
  title = 'Modifier un Trajet';
  transport : string;
  catVehicle : string;
  zoneSource : string;
  zoneDestination : string ;
  constructor(
    private catalogTransportTypeService: CatalogTransportTypeServcie,
    private authentificationService:AuthenticationService,
    private vehicleCategoryService: VehicleCategoryService,
    private transportService: TransportServcie,
    private vatService: VatService,
    private zoneService: ZoneServcie,
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

    this.transportService.findAll().subscribe(
      data => {
        this.transportList = data;
      }
    );
    this.zoneService.findAll().subscribe(
      data => {
        this.zoneList = data;
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
      'fZoneSource': new FormControl(this.selectCatalogTransportType.zoneSource, Validators.required),
      'fZoneDestination': new FormControl(this.selectCatalogTransportType.zoneDestination, Validators.required),
      'fVat': new FormControl(
      
         this.editMode!=1 ?this.selectCatalogTransportType.vat.value:this.selectCatalogTransportType.vat,
       
         Validators.required)


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
    this.catalogTransportTypeService.sizeSearch(`transport.code~${this.transport},vehicleCategory.code~${this.catVehicle},zoneSource.code~${this.zoneSource},zoneDestination.code~${this.zoneDestination}`).subscribe(
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
    this.selectCatalogTransportType.vehicleCategory = this.transportCatVehicleForm.value['fVehicleCategory'];
    this.selectCatalogTransportType.transport = this.transportCatVehicleForm.value['fTransport'];
    this.selectCatalogTransportType.zoneDestination = this.transportCatVehicleForm.value['fZoneDestination'];
    this.selectCatalogTransportType.zoneSource = this.transportCatVehicleForm.value['fZoneSource'];
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
    this.catVehicle=event.value.code;
  }
  onSelectTransport(event: any) {
    this.selectCatalogTransportType.transport = event;
    this.transport=event.code;
  }
  onTransportSearch(event: any) {
    this.transportService
      .find('code~' + event.query)
      .subscribe(data => (this.transportList = data));
  }
  onZoneSourceSearch(event: any) {
    this.zoneService
      .find('code~' + event.query)
      .subscribe(data => (this.zoneList = data));
  }

  onSelectVat(event) {
  
    this.vat= this.vatList.filter(f=> f.value== event.value)[0];
    this.onPriceChange(1);
  }
  onSelectZoneSource(event: any) {
    this.selectCatalogTransportType.zoneSource = event;
    this.zoneSource=event.code;

  }
  onSelectZoneDestination(event: any) {
    this.selectCatalogTransportType.zoneDestination = event;
    this.zoneDestination = event.code;

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
