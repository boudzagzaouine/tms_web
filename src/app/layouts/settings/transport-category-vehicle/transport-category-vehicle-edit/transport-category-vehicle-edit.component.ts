import { TransportServcie } from './../../../../shared/services/api/transport.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VehicleCategoryService } from './../../../../shared/services/api/vehicle-category.service';
import { TransportCategoryVehicleService } from './../../../../shared/services/api/transport-category-vehicle.service';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransportCategoryVehicle } from './../../../../shared/models/transport-category-vehicle';
import { Transport } from './../../../../shared/models/transport';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-transport-category-vehicle-edit',
  templateUrl: './transport-category-vehicle-edit.component.html',
  styleUrls: ['./transport-category-vehicle-edit.component.css']
})
export class TransportCategoryVehicleEditComponent implements OnInit {

  @Input() selectTransportCatVehicle = new TransportCategoryVehicle();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  transportCatVehicleForm: FormGroup;
  vehicleCategorieList: VehicleCategory[] = [];
  transportList: Transport[] = [];
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier une catégorie de véhicule';

  constructor(
    private transportCatVehicleService: TransportCategoryVehicleService,
    private vehicleCategoryService: VehicleCategoryService,
    private transportService: TransportServcie,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

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

    if (this.editMode === 1) {
      this.selectTransportCatVehicle = new TransportCategoryVehicle();
      this.title = 'Ajouter une catégorie de véhicule';

    }

    this.displayDialog = true;
    this.initForm();

  }

  initForm() {
    this.transportCatVehicleForm = new FormGroup({
      'fVehicleCategory': new FormControl(this.selectTransportCatVehicle.vehicleCategory, Validators.required),
      'fTransport': new FormControl(this.selectTransportCatVehicle.transport, Validators.required),
      'fQuantity': new FormControl(this.selectTransportCatVehicle.quantity, Validators.required)
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.transportCatVehicleForm.invalid) { return; }

    this.spinner.show();

    this.selectTransportCatVehicle.quantity = this.transportCatVehicleForm.value['fQuantity'];
    const s = this.transportCatVehicleService.set(this.selectTransportCatVehicle).subscribe(
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



    this.selectTransportCatVehicle = new TransportCategoryVehicle();
  }

  onSelectVehicleCateory(event: any) {
    this.selectTransportCatVehicle.vehicleCategory = event.value;

  }
  onSelectTransport(event: any) {
    this.selectTransportCatVehicle.transport = event.value;

  }


  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }



}
