import { VehicleTray } from './../../../../shared/models/vehicle-tray';
import { VehicleTrayService } from './../../../../shared/services/api/vehicle-tray.service';
import { VehicleCategoryTray } from './../../../../shared/models/vehicle-category-tray';
import { NgxSpinnerService } from 'ngx-spinner';
import { VehicleCategory } from './../../../../shared/models/vehicle-category';
import { VehicleCategoryService } from './../../../../shared/services/api/vehicle-category.service';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './../../../../shared/services';
import { MessageService } from 'primeng/api';


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
  subscriptions= new Subscription();
  vehicleTrayList:VehicleTray[]=[];

  constructor(
    private vehicleCategoryService: VehicleCategoryService,
    private vehicleTrayService:VehicleTrayService,
    private authentificationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private toastr: ToastrService,
  ) { }
  ngOnInit() {

    this.vehicleTrayService.findAll().subscribe(
      data=> {
        this.vehicleTrayList=data;
      }
    )

    if (this.editMode === 1) {
      this.selectedVehicleCategory = new VehicleCategory();
      this.title = 'Ajouter une catégorie de véhicule';

    }
    else {
      console.log(this.selectedVehicleCategory.vehicleCategoryTrays);

      this.selectedVehicleCategory.vehicleTrays=this.selectedVehicleCategory.vehicleCategoryTrays.map(f=>f.vehicleTray)

    }
    this.displayDialog = true;
    this.initForm();

  }

  initForm() {

    this.vehicleCategoryForm = new FormGroup({
      'fCode': new FormControl(this.selectedVehicleCategory.code, Validators.required),
      'fDescription': new FormControl(this.selectedVehicleCategory.description),
      'fLength': new FormControl((this.selectedVehicleCategory.length), Validators.required),
      'fWidth': new FormControl((this.selectedVehicleCategory.width), Validators.required),
      'fheight': new FormControl((this.selectedVehicleCategory.height), Validators.required),
      'fTonnage': new FormControl(this.selectedVehicleCategory.tonnage, Validators.required),
      'fTotalWeight': new FormControl(this.selectedVehicleCategory.totalWeight),
      'fPriceKm': new FormControl(this.selectedVehicleCategory.priceKm),
      'fVehicleTrays': new FormControl(this.selectedVehicleCategory.vehicleTrays),

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
    this.selectedVehicleCategory.priceKm = this.vehicleCategoryForm.value['fPriceKm'];

    this.selectedVehicleCategory.vehicleTrays = this.vehicleCategoryForm.value["fVehicleTrays"];
    this.selectedVehicleCategory.vehicleCategoryTrays=[];
    this.selectedVehicleCategory.vehicleTrays.forEach(element => {
   let vehicleCategoryTray= new VehicleCategoryTray();
   vehicleCategoryTray.vehicleTray=element;
     this.selectedVehicleCategory.vehicleCategoryTrays.push(vehicleCategoryTray);
    });

    this.selectedVehicleCategory.owner=this.authentificationService.getDefaultOwner();

    this.subscriptions.add(this.vehicleCategoryService.set(this.selectedVehicleCategory).subscribe(
      data => {
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré Avec Succès'});

        //this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();

      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

        //this.toastr.error(error.error.message);
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

}
