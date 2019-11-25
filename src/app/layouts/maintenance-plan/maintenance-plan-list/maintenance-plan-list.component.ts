import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { MaintenancePlan } from './../../../shared/models/maintenance-plan';
import { MaintenancePlanService } from './../../../shared/services/api/maintenance-plan.service';
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaintenanceTypeService } from './../../../shared/services/api/maintenance-type.service';
import { MaintenanceStateService } from './../../../shared/services/api/maintenance-states.service';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { MaintenanceState } from './../../../shared/models/maintenance-state';
import { MaintenanceType } from './../../../shared/models/maintenance-type';
import { Component, OnInit } from '@angular/core';
import { Vehicle } from './../../../shared/models/Vehicle';

@Component({
  selector: 'app-maintenance-plan-list',
  templateUrl: './maintenance-plan-list.component.html',
  styleUrls: ['./maintenance-plan-list.component.css'],
  providers: [ConfirmationService]
})
export class MaintenancePlanListComponent implements OnInit {

  page = 0;
  size = 8;
  collectionSize: number;
  vehicleSearch: Vehicle;
  typeMaintenanceSearch: MaintenanceType;
  statusMaintenanceSearch: MaintenanceState;
  codeSearch: String;

  maintenancePlans: Array<MaintenancePlan> = [];


  vehicleList: Array<Vehicle> = [];
  maintenanceTypeList: Array<MaintenanceType> = [];
  maintenanceStatusList: Array<MaintenanceState> = [];

  constructor(private vehicleService: VehicleService,
    private maintenanceStatusService: MaintenanceStateService,
    private maintenanceTypeService: MaintenanceTypeService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private maintenancePlanService: MaintenancePlanService) { }

  ngOnInit() {

    this.loadVechile();
    this.loadMaintenanceStatus();
    this.loadMaintenanceType();

    this.maintenancePlanService.maintenancePlanListChanged.subscribe(

      data => {

        this.maintenancePlans = data;
      }
    );

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

  loadDataLazy(event) {
    //  this.loading = true;

    // this.page = this.drivers.slice(event.first, (event.first + event.rows));
    // this.loading = false;

    console.log('evnt' + event.first);

    this.page = event.first / this.size;
    console.log('lazy load data');

    this.loadData();

  }





  loadData(search: string = '') {

    console.log('loading data');

    this.spinner.show();

    this.maintenancePlanService.sizeSearch(search).subscribe(
      data => {
        console.log('data size : ' + data);

        this.collectionSize = data;
      }
    );



    this.maintenancePlanService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.maintenancePlans = data;
        console.log('data' + this.maintenancePlans);
        console.log('size de maintenance ' + data.length);

        this.spinner.hide();
      },
      error => { this.spinner.hide(); },
      () => this.spinner.hide()
    );
  }

  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.vehicleSearch != null && this.vehicleSearch.code != null && this.vehicleSearch.code !== '') {
      buffer.append(`vehicle.code~${this.vehicleSearch.code}`);
    }

    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }
    if (this.typeMaintenanceSearch != null && this.typeMaintenanceSearch.code != null && this.typeMaintenanceSearch.code !== '') {
      buffer.append(`maintenanceType.code~${this.typeMaintenanceSearch.code}`);
    }
    if (this.statusMaintenanceSearch != null && this.statusMaintenanceSearch.code != null && this.statusMaintenanceSearch.code !== '') {
      buffer.append(`maintenanceState.code~${this.statusMaintenanceSearch.code}`);
    }



    this.page = 0;
    const searchQuery = buffer.getValue();
    console.log('search ' + searchQuery);

    this.loadData(searchQuery);

  }


  onDeleteMaintenance(id: number) {
    console.log('delete id : ' + id);

    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {
        this.maintenancePlanService.delete(id);
      }
    });


  }

}
