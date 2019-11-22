
import { BadgeType } from './../../../shared/models/badge-Type';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { BadgeTypeService } from '../../../shared/services/api/badge-type.service';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';
import { Vehicle } from './../../../shared/models/vehicle';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(
    private activatedRoute: ActivatedRoute,
    private vehicleService: VehicleService,
    private vehicleCategoryService: VehicleCategoryService,
    private badgeTypeService: BadgeTypeService,
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
  }

  initForm() {
    console.log(this.selectedVehicle);
    const d = new Date(this.selectedVehicle.technicalVisit);
    this.vehicleForm = new FormGroup({
      'code': new FormControl(this.selectedVehicle.code),
      'registrationNumber': new FormControl(this.selectedVehicle.registrationNumber),
      'technicalVisit': new FormControl(d),
      'vehicleCategory': new FormControl(this.selectedVehicle.vehicleCategory),
      'badgeType': new FormControl(this.selectedVehicle.badgeType)
    });
    this.spinner.hide();
  }

  onSubmit(close = false) {
    this.selectedVehicle.code = this.vehicleForm.value['code'];
    this.selectedVehicle.registrationNumber = this.vehicleForm.value['registrationNumber'];
    this.selectedVehicle.technicalVisit = this.vehicleForm.value['technicalVisit'];

    this.vehicleService.set(this.selectedVehicle, close);
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



}
