import { Vehicle } from './../../../shared/models/vehicle';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {

  selectedVehicle: Vehicle;
  vehicleForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
    private vehicleService: VehicleService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id']
    if (id) {
      this.activatedRoute.params.subscribe(params => {
        id = params['id'];
        this.vehicleService.findById(id).subscribe(data => {
          this.selectedVehicle = data;

          console.log(data);

        });

      }
      );

    }

  }

  initForm() {
    this.vehicleForm = new FormGroup({
      'code': new FormControl(null),
    });
  }

}
