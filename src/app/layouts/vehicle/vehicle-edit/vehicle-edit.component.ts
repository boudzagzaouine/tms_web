import { InsuranceService } from './../../../shared/services/api/insurance.service';
import { Insurance } from './../../../shared/models/insurance';

import { BadgeType } from './../../../shared/models/badge-Type';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { BadgeTypeService } from '../../../shared/services/api/badge-type.service';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { Vehicle } from './../../../shared/models/vehicle';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {

  selectedVehicle: Vehicle = new Vehicle();
  selectedVehicleCategory: VehicleCategory;
  selectedBadgeType: BadgeType;
  vehicleForm: FormGroup;
  editMode = false;
  badgeTypeList: BadgeType[] = [];
  vehicleCategoryList: VehicleCategory[] = [];
  insuranceList: Insurance[] = [];
  isFormSubmitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vehicleService: VehicleService,
    private vehicleCategoryService: VehicleCategoryService,
    private badgeTypeService: BadgeTypeService,
    private insuranceService: InsuranceService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.initForm();
    let id = this.activatedRoute.snapshot.params['id'];
    this.spinner.show();
    if (id) {
      this.activatedRoute.params.subscribe(params => {
        id = params['id'];
        this.vehicleService.findById(id).subscribe(data => {
          this.selectedVehicle = data;
          this.initForm();
          console.log(data);
        });
      }
      );

    } else {
      this.initForm();
    }


    this.vehicleCategoryService.findAll().subscribe(
      data => {
        this.vehicleCategoryList = data;
      }
    );

    this.badgeTypeService.findAll().subscribe(
      data => {
        this.badgeTypeList = data;
      }
    );

     this.insuranceService.findAvailable().subscribe(
      data => {
        this.insuranceList = data;
        if (this.selectedVehicle.insurance != null){
          this.insuranceList.push(this.selectedVehicle.insurance);
        }
      });
  }

  initForm() {
    console.log(this.selectedVehicle);
    const d = new Date(this.selectedVehicle.technicalVisit);
    this.vehicleForm = new FormGroup({
      'code': new FormControl(this.selectedVehicle.code, Validators.required),
      'registrationNumber': new FormControl(this.selectedVehicle.registrationNumber, Validators.required),
      'technicalVisit': new FormControl(d),
      'vehicleCategory': new FormControl(this.selectedVehicle.vehicleCategory),
      'badgeType': new FormControl(this.selectedVehicle.badgeType),
      'insurance': new FormControl(this.selectedVehicle.insurance),
    });
    this.spinner.hide();
  }

  onSubmit(close = false) {

    this.isFormSubmitted = true;
    if (this.vehicleForm.invalid) { this.spinner.hide(); return; }
    this.spinner.show();
    this.selectedVehicle.code = this.vehicleForm.value['code'];
    this.selectedVehicle.registrationNumber = this.vehicleForm.value['registrationNumber'];
    this.selectedVehicle.technicalVisit = this.vehicleForm.value['technicalVisit'];

    this.vehicleService.set(this.selectedVehicle, close);
    this.isFormSubmitted = false;

    this.spinner.hide();
    this.selectedVehicle = new Vehicle();
    this.vehicleForm.reset();
  }

  onSelectBadgeType(event: any) {
    console.log(event);
    this.selectedBadgeType = event.value;
    this.selectedVehicle.badgeType = event.value;
    console.log(this.selectedVehicle.badgeType);
  }

  onSelectVehicleCategory(event: any) {
    console.log(event);
    this.selectedVehicleCategory = event.value;
    this.selectedVehicle.vehicleCategory = event.value;
    console.log(this.selectedVehicle.vehicleCategory);
  }

  onSelectInsurance(event: any) {
    console.log(event);
    this.selectedVehicle.insurance = event.value;
    console.log(this.selectedVehicle.insurance);
  }

  onSearchInsurance(event) {
    const s = this.insuranceService.findAvailable().subscribe(
      data => {
        this.insuranceList = data;
      },
      error => {
        console.log(error);

      },
      () => s.unsubscribe()
    );
  }


}
