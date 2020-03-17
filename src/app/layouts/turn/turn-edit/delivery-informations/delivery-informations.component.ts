import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormsModule,
  Validators
} from "@angular/forms";
import { Turn } from "./../../../../shared/models/turn";
import { VehicleCategory } from "./../../../../shared/models/vehicle-category";
import { DriverService } from "./../../../../shared/services/api/driver.service";
import { VehicleService } from "./../../../../shared/services/api/vehicle.service";
import { TransportServcie } from "./../../../../shared/services/api/transport.service";
import { VehicleCategoryService } from "./../../../../shared/services/api/vehicle-category.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-delivery-informations",
  templateUrl: "./delivery-informations.component.html",
  styleUrls: ["./delivery-informations.component.css"]
})
export class DeliveryInformationsComponent implements OnInit {
  vehicleCatList: VehicleCategory[] = [];
  transportList: Array<any> = [];
  vehicleList: Array<any> = [];
  driverList: Array<any> = [];
  @Output() turnAdded = new EventEmitter<Turn>();
  turnForm: FormGroup;

  constructor(
    private vehicleCategoryService: VehicleCategoryService,
    private transportService: TransportServcie,
    private vehicleService: VehicleService,
    private driverService: DriverService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.vehicleCategoryService.findAll().subscribe(data => {
      this.vehicleCatList = data;
    });

    this.transportService.findAll().subscribe(data => {
      this.transportList = data;
    });

    this.vehicleService.findAll().subscribe(data => {
      this.vehicleList = data;
    });
    this.driverService.findAll().subscribe(data => {
      this.driverList = data;
    });
  }

  initForm() {
    this.turnForm = this.formBuilder.group({
      fDateLivraison: ["", Validators.required],
      fVehicule: ["", Validators.required],
      fTransport: ["", Validators.required],
      fDrivers: ["", Validators.required]
    });
  }
}
