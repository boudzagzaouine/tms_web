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
  displayDialog: boolean;
  isFormSubmitted = false;
  title = 'Modifier un Trajet';
  constructor(
    private catalogTransportTypeService: CatalogTransportTypeServcie,
    private vehicleCategoryService: VehicleCategoryService,
    private transportService: TransportServcie,
    private vatService: VatService,
    private zoneService: ZoneServcie,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
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
      'fAmountTtc': new FormControl(this.selectCatalogTransportType.amountTtc),
      'fAmountTva': new FormControl(this.selectCatalogTransportType.amountTva, Validators.required),
      'fVehicleCategory': new FormControl(this.selectCatalogTransportType.vehicleCategory, Validators.required),
      'fTransport': new FormControl(this.selectCatalogTransportType.transport, Validators.required),
      'fZoneSource': new FormControl(this.selectCatalogTransportType.zoneSource, Validators.required),
      'fZoneDestination': new FormControl(this.selectCatalogTransportType.zoneDestination, Validators.required),
      'fVat': new FormControl(this.selectCatalogTransportType.vat, Validators.required)


    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.transportCatVehicleForm.invalid) { return; }

    this.spinner.show();

    this.selectCatalogTransportType.amountHt = this.transportCatVehicleForm.value['fAmountHt'];
    this.selectCatalogTransportType.amountTtc = this.transportCatVehicleForm.value['fAmountTtc'];
    this.selectCatalogTransportType.amountTva = this.transportCatVehicleForm.value['fAmountTva'];

    this.catalogTransportTypeService.set(this.selectCatalogTransportType).subscribe(
      data => {
        this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    );


    this.selectCatalogTransportType = new CatalogTransportType();


  }

  onSelectVehicleCateory(event: any) {
    this.selectCatalogTransportType.vehicleCategory = event.value;

  }
  onSelectTransport(event: any) {
    this.selectCatalogTransportType.transport = event;
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

  onSelectVat(event: any) {
    this.selectCatalogTransportType.vat = event.value;

  }
  onSelectZoneSource(event: any) {
    this.selectCatalogTransportType.zoneSource = event;
  }
  onSelectZoneDestination(event: any) {
    this.selectCatalogTransportType.zoneDestination = event;

  }



  onPriceHtChange() {
    const priceHt = +this.transportCatVehicleForm.value['fAmountHt'];
    let vat = 0;
    if (this.selectCatalogTransportType.vat != null) {
      vat = this.selectCatalogTransportType.vat.value;
    }
    const amountTva = (priceHt / 100) * vat;
    const priceTTC = priceHt + amountTva;


    this.selectCatalogTransportType.amountTtc = priceTTC;
    this.selectCatalogTransportType.amountTva = amountTva;

    this.transportCatVehicleForm.patchValue({
      'fAmountTtc': this.selectCatalogTransportType.amountTtc.toFixed(2),
      'fAmountTva': this.selectCatalogTransportType.amountTva.toFixed(2),
    });
  }



  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

}
