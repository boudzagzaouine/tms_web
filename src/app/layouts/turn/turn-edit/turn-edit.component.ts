import { DriverService } from './../../../shared/services/api/driver.service';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { TransportServcie } from './../../../shared/services/api/transport.service';
import { Transport } from './../../../shared/models/transport';
import { VehicleCategory } from './../../../shared/models/vehicle-category';
import { VehicleCategoryService } from './../../../shared/services/api/vehicle-category.service';


import { DeliveryService } from './../../../shared/services/api/Delivery.service';
import { Delivery } from './../../../shared/models/delivery';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-turn-edit',
  templateUrl: './turn-edit.component.html',
  styleUrls: ['./turn-edit.component.css'],


})
export class TurnEditComponent implements OnInit {

  activeIndex: number = 0;
  items: MenuItem[];
  deliveries: Delivery[] = [];
  delivriesLoading: Array<any> = [];
  vehicleCatList: VehicleCategory[] = [];
  transportList: Array<any> = [];
  vehicleList: Array<any> = [];
  driverList: Array<any> = [];
  constructor(private deliveryService: DeliveryService,
    private vehicleCategoryService: VehicleCategoryService,
    private transportService: TransportServcie,
         private vehicleService:VehicleService,
         private driverService : DriverService) { }


  ngOnInit() {
    this.items = [{
      label: '.........',
    },
    {
      label: '...........',
    },
    {
      label: '.........',
    },
    {
      label: '..............',
    }
    ];

    this.loaddata();

    this.vehicleCategoryService.findAll().subscribe(
      data => {

        this.vehicleCatList = data;
      }
    );

    this.transportService.findAll().subscribe(
      data => {

        this.transportList = data;
      }
    );

    this.vehicleService.findAll().subscribe(
      data => {

        this.vehicleList = data;
      }
    );
    this.driverService.findAll().subscribe(
      data => {

        this.driverList = data;
      }
    );
  }

  loaddata() {

    this.deliveryService.find('orderStatus.code~' + 'En attente').subscribe(
      data => {
        this.deliveries = data;
        console.log(data);

      }

    );

  }

  TotalQnt(d: Delivery) {
    let sum: number = 0;
    d.lines.forEach(function (value) {
      sum += value.orderedQuantity;
    });
    console.log("total quantite");

    console.log(sum);

    return sum;
  }

  TotalTtc(d: Delivery) {
    let sum: number = 0;
    d.lines.forEach(function (value) {
      sum += value.totalPriceTTC;
    });
    console.log(sum);

    return sum;
  }

  private previous() {
    this.activeIndex--;

  }

  private next() {
    this.activeIndex++;

    if (this.activeIndex == 1) {
      this.loaddata();

    }

  }

}
