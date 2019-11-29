import { NgxSpinnerService } from 'ngx-spinner';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { VehicleCategoryService } from './../../../../shared/services/api/vehicle-category.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import {  ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-vehicle-categorie-edit',
  templateUrl: './vehicle-categorie-edit.component.html',
  styleUrls: ['./vehicle-categorie-edit.component.css']
})
export class VehicleCategorieEditComponent implements OnInit {

  @Input() selectedVehicleCategory = new VehicleCategory();
  @Input() editMode: boolean;
  closeResult: String;
  vehicleCategoryForm: FormGroup;

  isFormSubmitted = false;

  modal: NgbModalRef;

  constructor(
    private vehicleCategoryService: VehicleCategoryService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService) { }

  ngOnInit() {

    this.initForm();

  }

  initForm() {
    this.vehicleCategoryForm = new FormGroup({
      'Fcode': new FormControl(this.selectedVehicleCategory.code, Validators.required),
      'Fconsumption': new FormControl(this.selectedVehicleCategory.consumption),
      'Fweight': new FormControl((this.selectedVehicleCategory.weight), Validators.required),
      'Fwidth': new FormControl((this.selectedVehicleCategory.width), Validators.required),
      'Fdepth': new FormControl(this.selectedVehicleCategory.depth, Validators.required),
      'Ftonnage': new FormControl(this.selectedVehicleCategory.tonnage, Validators.required),
      'FemptyWeight': new FormControl(this.selectedVehicleCategory.emptyWeight, Validators.required),
      'FtotalWeight': new FormControl(this.selectedVehicleCategory.totalWeight)
    });
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.vehicleCategoryForm.invalid) {return; }

    this.spinner.show();

    this.selectedVehicleCategory.code = this.vehicleCategoryForm.value['Fcode'];
    this.selectedVehicleCategory.consumption = this.vehicleCategoryForm.value['Fconsumption'];
    this.selectedVehicleCategory.weight = +this.vehicleCategoryForm.value['Fweight'];
    this.selectedVehicleCategory.width = this.vehicleCategoryForm.value['Fwidth'] ;
    this.selectedVehicleCategory.depth = this.vehicleCategoryForm.value['Fdepth'] ;
    this.selectedVehicleCategory.tonnage = +this.vehicleCategoryForm.value['Ftonnage'];
    this.selectedVehicleCategory.emptyWeight = this.vehicleCategoryForm.value['FemptyWeight'] ;
    this.selectedVehicleCategory.totalWeight = this.vehicleCategoryForm.value['FtotalWeight'] ;

    console.log(this.selectedVehicleCategory);
    const s = this.vehicleCategoryService.set(this.selectedVehicleCategory).subscribe(
      data => {
        this.vehicleCategoryService.emitChanges();
        this.toastr.success('Item was saved successfully', 'Save');
        if (this.modal) { this.modal.close(); }
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.toastr.error(
          'Elément n\'est enregistré',
          'Erreur'
        );
        console.log(error);
        this.spinner.hide();
      },

      () => this.spinner.hide()
    );


  }




  open(content) {
    if (!this.editMode) {
      this.selectedVehicleCategory = new VehicleCategory();
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
}
