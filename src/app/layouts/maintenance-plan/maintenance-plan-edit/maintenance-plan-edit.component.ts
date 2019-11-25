import { ActivatedRoute } from '@angular/router';
import { MaintenanceState } from './../../../shared/models/maintenance-state';
import { MaintenanceStateService } from './../../../shared/services/api/maintenance-states.service';
import { MaintenancePlanService } from './../../../shared/services/api/maintenance-plan.service';
import { MaintenancePlan } from './../../../shared/models/maintenance-plan';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MaintenanceTypeService } from './../../../shared/services/api/maintenance-type.service';
import { MaintenanceType } from './../../../shared/models/maintenance-type';
import { VehicleService } from './../../../shared/services/api/vehicle.service';

import { Component, OnInit } from '@angular/core';
import { Vehicle } from './../../../shared/models/Vehicle';


@Component({
  selector: 'app-maintenance-plan-edit',
  templateUrl: './maintenance-plan-edit.component.html',
  styleUrls: ['./maintenance-plan-edit.component.css']
})
export class MaintenancePlanEditComponent implements OnInit {


  maintenanceForm: FormGroup;
  vehicleList: Array<Vehicle> = [];
  maintenanceTypeList: Array<MaintenanceType> = [];
  maintenanceStatusList: Array<MaintenanceState> = [];

  selectedMaintenance: MaintenancePlan = new MaintenancePlan();
 idMaintenance : number;
  constructor(private vehicleService: VehicleService,
    private maintenanceStatusService : MaintenanceStateService,
    private maintenanceTypeService: MaintenanceTypeService,
    private maintenancePlanService: MaintenancePlanService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();

    if (this.route.snapshot.params['id'] >= 1) {
      this.idMaintenance = this.route.snapshot.params['id'];
      this.maintenancePlanService.findById(this.idMaintenance).subscribe(

        data => {

          this.selectedMaintenance = data;
          console.log('Maintenance :');
          console.log(this.selectedMaintenance);
          this.initForm();
          console.log('id' + this.idMaintenance);


        }
      );


    }

    this.loadVechile();
    this.loadMaintenanceType();
    this.loadMaintenanceStatus();
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
        console.log('Maintenance Types ');
        console.log(this.maintenanceTypeList);


      }
    );
  }
  loadMaintenanceStatus() {

    this.maintenanceStatusService.findAll().subscribe(
      data => {

        this.maintenanceStatusList = data;
        console.log('Maintenance Status ');
        console.log(this.maintenanceStatusList);


      }
    );
  }

  initForm() {
    const d = new Date(this.selectedMaintenance.begin);
    const dd = new Date(this.selectedMaintenance.end);
    this.maintenanceForm = this.formBuilder.group(
      {

        'Fcode': new FormControl(this.selectedMaintenance.code),
        'Fvehicule': new FormControl(this.selectedMaintenance.vehicle),
        'FmaintenanceType': new FormControl(this.selectedMaintenance.maintenanceType),
        'FdateDebut': new FormControl(d),
        'FdateFin': new FormControl(dd),
        'FstatusMaintenance': new FormControl(this.selectedMaintenance.maintenanceState),
        'Fdescription': new FormControl(this.selectedMaintenance.description),

      }
    );
  }

  OnSubmitForm() {

    const formValue = this.maintenanceForm.value;



    this.selectedMaintenance.code = formValue['Fcode'];
    //this.selectedMaintenance.vehicle = formValue['Fvehicule'];
    //this.selectedMaintenance.maintenanceType = formValue['FmaintenanceType'];
    this.selectedMaintenance.begin = formValue['FdateDebut'];
    this.selectedMaintenance.end = formValue['FdateFin'];
   // this.selectedMaintenance.maintenanceState = formValue['FstatusMaintenance'];
    this.selectedMaintenance.description = formValue['Fdescription'];
    this.maintenancePlanService.set(this.selectedMaintenance);

    console.log('this maintenance Plan');
    console.log(this.selectedMaintenance);


  }

  onSelectVehicle(event) {

    this.selectedMaintenance.vehicle = event.value;
    console.log('select vehile');
    console.log(event.value);
  }
  onSelectMaintenanceType(event) {

    this.selectedMaintenance.maintenanceType = event.value;
    console.log('select maintenance Type');
    console.log(event.value);
  }
  onSelectMaintenanceStatus(event) {

    this.selectedMaintenance.maintenanceState = event.value;
    console.log('select maintenance State ');
    console.log(event.value);
  }


}
