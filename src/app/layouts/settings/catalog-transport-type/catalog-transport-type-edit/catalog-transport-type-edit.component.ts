import { RoundPipe } from 'ngx-pipes';
import { VatServcie } from './../../../../shared/services/api/vat.service';
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
  @Input() editMode: boolean;
  @Input() insertOrUpdate: String;
  @Output() transportCatVehicleAdd = new EventEmitter<CatalogTransportType>();

  closeResult: String;
  transportCatVehicleForm: FormGroup;
  vehicleCategorieList: VehicleCategory[] = [];
  transportList: Transport[] = [];
  zoneList: Zone[] = [];
  vatList: Vat[] = [];

  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(
    private catalogTransportTypeService: CatalogTransportTypeServcie,
    private vehicleCategoryService: VehicleCategoryService,
    private transportService: TransportServcie,
    private vatService: VatServcie,
    private zoneService: ZoneServcie,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private roundPipe: RoundPipe) { }

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
    this.initForm();

  }

  initForm() {
    this.transportCatVehicleForm = new FormGroup({

      'fAmountHt': new FormControl(this.selectCatalogTransportType.amountHt, Validators.required),
      'fAmountTtc': new FormControl(this.selectCatalogTransportType.amountTtc),
      'fAmountTva': new FormControl( this.selectCatalogTransportType.amountTva, Validators.required),
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



    console.log(this.selectCatalogTransportType);
     this.catalogTransportTypeService.set(this.selectCatalogTransportType).subscribe(
      data => {
        this.transportCatVehicleAdd.emit(data);
        this.toastr.success('Elément Enregistré Avec Succès', 'Edition');
        if (this.modal) { this.modal.close(); }
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

    if (this.modal) { this.modal.close(); }
    this.isFormSubmitted = false;

  }

  onSelectVehicleCateory(event: any) {
    console.log(event);
    this.selectCatalogTransportType.vehicleCategory = event.value;

  }
  onSelectTransport(event: any) {
    console.log(event);
    this.selectCatalogTransportType.transport = event.value;

  }

  onSelectVat(event: any) {
    console.log(event);
    this.selectCatalogTransportType.vat = event.value;

  }
  onSelectZoneSource(event: any) {
    console.log(event);
    this.selectCatalogTransportType.zoneSource = event.value;

  }
  onSelectZoneDestination(event: any) {
    console.log(event);
    this.selectCatalogTransportType.zoneDestination = event.value;

  }


  open(content) {
    if (!this.editMode) {
      this.selectCatalogTransportType = new CatalogTransportType();
    }
    this.initForm();
    this.modal = this.modalService.open(content, { backdrop: 'static', centered: true, size: 'lg' });
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
      'fAmountTva': this.selectCatalogTransportType.amountTva.toFixed(2) ,
    });
  }




}
