import { TransportServcie } from './../../../../shared/services/api/transport.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VehicleCategoryService } from './../../../../shared/services/api/vehicle-category.service';
import { TransportCategoryVehicleService } from './../../../../shared/services/api/transport-category-vehicle.service';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransportCategoryVehicle } from './../../../../shared/models/transport-category-vehicle';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-transport-category-vehicle-edit',
  templateUrl: './transport-category-vehicle-edit.component.html',
  styleUrls: ['./transport-category-vehicle-edit.component.css']
})
export class TransportCategoryVehicleEditComponent implements OnInit {

  @Input() selectTransportCatVehicle = new TransportCategoryVehicle();
  @Input() editMode: boolean;
  @Output() transportCatVehicleAdd = new EventEmitter<TransportCategoryVehicle>();

  closeResult: String;
  transportCatVehicleForm: FormGroup;
  vehicleCategorieList: VehicleCategory[] = [];
  transportList: Transport[] = [];

  modal: NgbModalRef;
  isFormSubmitted = false;

  constructor(
    private transportCatVehicleService: TransportCategoryVehicleService,
    private vehicleCategoryService: VehicleCategoryService,
    private transportService : TransportServcie,
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

    console.log(this.selectTransportCatVehicle);
    const s = this.transportCatVehicleService.set(this.selectTransportCatVehicle).subscribe(
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



    this.selectTransportCatVehicle = new TransportCategoryVehicle();
    if (this.modal) { this.modal.close(); }
    this.isFormSubmitted = false;
  }

  onSelectVehicleCateory(event: any) {
    console.log(event);
    this.selectTransportCatVehicle.vehicleCategory = event.value;

  }
  onSelectTransport(event: any) {
    console.log(event);
    this.selectTransportCatVehicle.transport = event.value;

  }


  open(content) {
    if (!this.editMode) {
      this.selectTransportCatVehicle = new TransportCategoryVehicle();
    }
    this.initForm();
    this.modal = this.modalService.open(content, { backdrop: 'static', centered: true, size: 'sm' });
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


}
