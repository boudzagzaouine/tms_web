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
    private maintenanceStatusService: MaintenanceStateService,
    private maintenanceTypeService: MaintenanceTypeService,
    private maintenancePlanService: MaintenancePlanService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roundPipe: RoundPipe) { }

  ngOnInit() {
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

    this.loadVechile();
    this.loadMaintenanceType();
    this.loadMaintenanceStatus();

    if (this.activatedRoute.snapshot.params['id'] >= 1) {
      this.idMaintenance = this.activatedRoute.snapshot.params['id'];
      this.maintenancePlanService.findById(this.idMaintenance).subscribe(

        data => {

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
        this.toastr.success('Saved successfully');
        if (close) {
          this.router.navigate(['/core/maintenances/list']);
        }
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

    console.log('line added');
    console.log(line);


    if (line.id > 0) {
      this.selectedMaintenance.maintenanceLineList = this.selectedMaintenance.maintenanceLineList.filter(l => l.id !== line.id);
    }
    this.selectedMaintenance.maintenanceLineList.push(line);

    this.selectedMaintenance.totalPrice =
      this.selectedMaintenance.maintenanceLineList.map(l => l.totalPriceTTC).reduce((acc, curr) => acc + curr);

    this.maintenanceForm.patchValue({
      'price': this.selectedMaintenance.totalPrice
    });

  }


  onDeleteMaintenanceLine(id: number) {
    console.log(id);

    this.selectedMaintenance.maintenanceLineList = this.selectedMaintenance.maintenanceLineList.filter(l => l.id !== id);
  }
}
