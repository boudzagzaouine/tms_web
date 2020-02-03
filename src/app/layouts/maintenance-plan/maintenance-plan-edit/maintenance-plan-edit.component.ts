import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { RoundPipe } from 'ngx-pipes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MaintenanceState } from './../../../shared/models/maintenance-state';
import { MaintenanceStateService } from './../../../shared/services/api/maintenance-states.service';
import { MaintenancePlanService } from './../../../shared/services/api/maintenance-plan.service';
import { MaintenancePlan } from './../../../shared/models/maintenance-plan';
import { MaintenanceTypeService } from './../../../shared/services/api/maintenance-type.service';
import { MaintenanceType } from './../../../shared/models/maintenance-type';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { MaintenanceLine } from './../../../shared/models/maintenance-line';

import { Vehicle } from './../../../shared/models/Vehicle';


@Component({
  selector: 'app-maintenance-plan-edit',
  templateUrl: './maintenance-plan-edit.component.html',
  styleUrls: ['./maintenance-plan-edit.component.css'],
  providers: [RoundPipe]
})
export class MaintenancePlanEditComponent implements OnInit {

  page = 0;
  size = 8;
  collectionSize: number;
  maintenanceForm: FormGroup;
  vehicleList: Array<Vehicle> = [];
  maintenanceTypeList: Array<MaintenanceType> = [];
  maintenanceStatusList: Array<MaintenanceState> = [];
  maintenanceLineList: MaintenanceLine[] = [];
  fr: any;
  selectedMaintenance: MaintenancePlan = new MaintenancePlan();
  idMaintenance: number;
  submitted = false;
  editMode = false;

  constructor(private vehicleService: VehicleService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private maintenanceStatusService: MaintenanceStateService,
    private maintenanceTypeService: MaintenanceTypeService,
    private maintenancePlanService: MaintenancePlanService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roundPipe: RoundPipe) { }

  ngOnInit() {
    this.loadVechile();
    this.loadMaintenanceType();
    this.loadMaintenanceStatus();
    this.fr = {
      firstDayOfWeek: 1,
      dayNames: ['Dimanche', 'Lundi', 'Mardi ', 'Mercredi', 'Mercredi ', 'Vendredi ', 'Samedi '],
      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jui', 'Aoû', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Aujourd\'hui',
      clear: 'Vider'
    };

    this.initForm();



    if (this.activatedRoute.snapshot.params['id'] >= 1) {
      this.idMaintenance = this.activatedRoute.snapshot.params['id'];
      this.maintenancePlanService.findById(this.idMaintenance).subscribe(

        data => {

          console.log(data);

          this.selectedMaintenance = data;
          this.editMode = true;
          this.initForm();
        }
      );

    }

  }

  loadVechile() {

    this.vehicleService.findAll().subscribe(

      data => {

        this.vehicleList = data;
        console.log('Vehicles ');
        console.log(this.vehicleList);
      }
    );

  }

  loadMaintenanceType() {

    this.maintenanceTypeService.findAll().subscribe(
      data => {
        this.maintenanceTypeList = data;
      }
    );
  }
  loadMaintenanceStatus() {

    this.maintenanceStatusService.findAll().subscribe(
      data => {
        this.maintenanceStatusList = data;
      }
    );
  }

  initForm() {
    const d = new Date(this.selectedMaintenance.startDate);
    const dd = new Date(this.selectedMaintenance.endDate);
    this.maintenanceForm = this.formBuilder.group(
      {
        'Fcode': new FormControl({ value: this.selectedMaintenance.code, disabled: this.editMode }, Validators.required),
        'Fvehicule': new FormControl({ value: this.selectedMaintenance.vehicle, disabled: this.editMode }, Validators.required),
        'FmaintenanceType': new FormControl(this.selectedMaintenance.maintenanceType, Validators.required),
        'FdateDebut': new FormControl(d),
        'FdateFin': new FormControl(dd),
        'mileage': new FormControl(this.selectedMaintenance.mileage),
        'price': new FormControl({
          value: this.selectedMaintenance.totalPrice ?
            this.roundPipe.transform(this.selectedMaintenance.totalPrice, 2) : 0, disabled: true
        }),
        'FstatusMaintenance': new FormControl(this.selectedMaintenance.maintenanceState),
        'Fdescription': new FormControl(this.selectedMaintenance.description),
        
      }
    );
  }

  OnSubmitForm(close = false) {
    this.submitted = true;

    if (this.maintenanceForm.invalid) {
      return;
    }

    if (!this.selectedMaintenance.maintenanceLineList.length) {
      this.toastr.warning('Veuillez ajouter des lignes de maintenance', 'Avertissement')
      return;
    }
    const formValue = this.maintenanceForm.value;
    if (!this.editMode) {
      this.selectedMaintenance.code = formValue['Fcode'];

    }
    this.selectedMaintenance.startDate = formValue['FdateDebut'];
    this.selectedMaintenance.endDate = formValue['FdateFin'];
    this.selectedMaintenance.description = formValue['Fdescription'];
    this.selectedMaintenance.mileage = +formValue['mileage'];
    this.maintenancePlanService.set(this.selectedMaintenance).subscribe(
      data => {
        this.toastr.success('Elément est Enregistré Avec Succès', 'Edition');
        if (close) {
          this.router.navigate(['/core/maintenances/list']);
        }

      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
      }
    );
  }

  onSelectVehicle(event) {

    this.selectedMaintenance.vehicle = event.value;
  }
  onSelectMaintenanceType(event) {

    this.selectedMaintenance.maintenanceType = event.value;
  }
  onSelectMaintenanceStatus(event) {
    this.selectedMaintenance.maintenanceState = event.value;
  }

  onLineEdited(line: MaintenanceLine) {


    this.selectedMaintenance.maintenanceLineList = this.selectedMaintenance.maintenanceLineList
      .filter(l => l.product.id !== line.product.id);
    this.selectedMaintenance.maintenanceLineList.push(line);
    this.updateTotalPrice();
  }
  onDeleteMaintenanceLine(id: number) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
 this.selectedMaintenance.maintenanceLineList = this.selectedMaintenance.maintenanceLineList
    .filter(l => l.product.id !== id);
      this.updateTotalPrice();
      }
    });







      }


  updateTotalPrice() {
    this.selectedMaintenance.totalPrice = 0;

    if (this.selectedMaintenance.maintenanceLineList.length) {
      this.selectedMaintenance.totalPrice =
        this.selectedMaintenance.maintenanceLineList
          .map(l => l.totalPriceTTC)
          .reduce((acc = 0, curr) => acc + curr, 0);
    }

    console.log(this.selectedMaintenance.totalPrice);

    this.maintenanceForm.patchValue({
      'price': this.selectedMaintenance.totalPrice
    });
  }
}
