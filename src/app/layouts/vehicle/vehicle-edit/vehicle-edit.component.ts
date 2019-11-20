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

  selectedVehicle: Vehicle =  new Vehicle();
  selectedVehicleCategory: VehicleCategory;
  selectedBadgeType: BadgeType;
  vehicleForm: FormGroup;
  editMode = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private vehicleService: VehicleService,
    private vehicleCategoryService: VehicleCategoryService,
    private badgeTypeService: BadgeTypeService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
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

  }

  initForm() {
    this.vehicleForm = new FormGroup({
      'code': new FormControl(this.selectedVehicle.code),
      'registrationNumber': new FormControl(this.selectedVehicle.registrationNumber),
      'technicalVisit': new FormControl(this.selectedVehicle.technicalVisit),
      'vehicleCategory': new FormControl(this.selectedVehicle.vehiculeCategorie),
      'badgeType': new FormControl(this.selectedVehicle.badgeType)
    });
    this.spinner.hide();
  }

}
