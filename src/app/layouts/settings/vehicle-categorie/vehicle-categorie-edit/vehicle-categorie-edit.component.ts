import { NgxSpinnerService } from 'ngx-spinner';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { VehicleCategoryService } from './../../../../shared/services/api/vehicle-category.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-vehicle-categorie-edit',
  templateUrl: './vehicle-categorie-edit.component.html',
  styleUrls: ['./vehicle-categorie-edit.component.css']
})
export class VehicleCategorieEditComponent implements OnInit {

  @Input() selectedVehicleCategory = new VehicleCategory();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();
  vehicleCategoryForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier une catégorie de véhicule';
  constructor(
    private vehicleCategoryService: VehicleCategoryService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }
  ngOnInit() {

    if (this.editMode === 1) {
      this.selectedVehicleCategory = new VehicleCategory();
      this.title = 'Ajouter une catégorie de véhicule';

    }
    this.displayDialog = true;
    this.initForm();

  }

  initForm() {

    this.vehicleCategoryForm = new FormGroup({
      'fCode': new FormControl(this.selectedVehicleCategory.code, Validators.required),
      'fDescription': new FormControl(this.selectedVehicleCategory.description, Validators.required),
      'fLength': new FormControl((this.selectedVehicleCategory.length), Validators.required),
      'fWidth': new FormControl((this.selectedVehicleCategory.width), Validators.required),
      'fheight': new FormControl((this.selectedVehicleCategory.height), Validators.required),
      'fDepth': new FormControl(this.selectedVehicleCategory.depth, Validators.required),
      'fTonnage': new FormControl(this.selectedVehicleCategory.tonnage, Validators.required),
      'fEmptyWeight': new FormControl(this.selectedVehicleCategory.emptyWeight, Validators.required),
      'fTotalWeight': new FormControl(this.selectedVehicleCategory.totalWeight),
    });

  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.vehicleCategoryForm.invalid) { return; }

    this.spinner.show();

    this.selectedVehicleCategory.code = this.vehicleCategoryForm.value['fCode'];
    this.selectedVehicleCategory.description = this.vehicleCategoryForm.value['fDescription'];
    this.selectedVehicleCategory.length = +this.vehicleCategoryForm.value['fLength'];
    this.selectedVehicleCategory.width = this.vehicleCategoryForm.value['fWidth'];
    this.selectedVehicleCategory.height = this.vehicleCategoryForm.value['fheight'];
    this.selectedVehicleCategory.depth = this.vehicleCategoryForm.value['fDepth'];
    this.selectedVehicleCategory.tonnage = +this.vehicleCategoryForm.value['fTonnage'];
    this.selectedVehicleCategory.emptyWeight = this.vehicleCategoryForm.value['fEmptyWeight'];
    this.selectedVehicleCategory.totalWeight = this.vehicleCategoryForm.value['fTotalWeight'];

    console.log(this.selectedVehicleCategory);

      this.vehicleCategoryService.set(this.selectedVehicleCategory).subscribe(
      data => {

        this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');
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


  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

}
