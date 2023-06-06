import { Component, OnInit } from '@angular/core';
import { VehicleCategoryService } from './../../../shared/services';
import { Vehicle, VehicleCategory } from './../../../shared/models';
import { Patrimony } from './../../../shared/models/patrimony';
import { PatrimonyService } from './../../../shared/services/api/patrimony-service';
import { TmsdashboardService } from './../../../shared/services/api/tms-dashboard.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-tms-dashboard-vehicle',
  templateUrl: './tms-dashboard-vehicle.component.html',
  styleUrls: ['./tms-dashboard-vehicle.component.css']
})
export class TmsDashboardVehicleComponent implements OnInit {
  codeSearch: Vehicle;
  vehicleCategoryList: Array<VehicleCategory> = [];
  categorySearch: VehicleCategory;
  vehicleCodeList: Array<Patrimony> = [];
  dateDepartSearch: Date;
  dateFinSearch: Date; trajetTraveled: number = 0;
  kilometerTraveled: number = 0;
  constructor(public datepipe: DatePipe,
    private tmsDashboardService: TmsdashboardService,
    private patrimonyService: PatrimonyService,
    private vehicleCategoryService: VehicleCategoryService) { }

  ngOnInit(): void {

    this.vehicleCategoryService.findAll().subscribe(
      data => {
        this.vehicleCategoryList = data;
      }
    )

  }

  onVehicleCodeSearch(event: any) {
    this.patrimonyService.find('code~' + event.query).subscribe(
      data => this.vehicleCodeList = data.filter(f => f.patrimony_type == 'vehicule')
      )
     
  }

  onSearchClicked() {
    this.searchWithVehicleDate();

  }

  searchWithVehicleDate() {
    var vehicleId = 0
    var categoryId = 0;
    var registration;
    let dateDebut = new Date(), dateFin = new Date();
    if (this.codeSearch != null && this.codeSearch.code !== '') {

      vehicleId = this.codeSearch.id;
      console.log('-------->'+vehicleId);
    //  registration = this.codeSearch.registrationNumber;
    }
    if (this.categorySearch != null && this.categorySearch.code !== '') {
      categoryId = this.categorySearch.id;
      console.log('-------->'+categoryId);
    }

    if (this.dateDepartSearch != null && this.dateFinSearch != null) {
      dateDebut = this.dateDepartSearch;
      dateFin = this.dateFinSearch;
    }

    this.tmsDashboardService.getNumberTrajetsVehicle(vehicleId, categoryId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'), this.datepipe.transform(dateFin, 'yyyy/MM/dd'))
      .subscribe(
        data => {
          this.trajetTraveled = data ? data : 0;
          console.log(data);
        });

    this.tmsDashboardService.getmileagevehicle(vehicleId, categoryId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'), this.datepipe.transform(dateFin, 'yyyy/MM/dd'))
      .subscribe(
        data => {
          this.kilometerTraveled = data ? data : 0;
          console.log(data);

        });


  }
  reset() {
    this.codeSearch = null;
    this.dateDepartSearch = null;
    this.dateFinSearch = null;
    this.categorySearch = null;
    this.trajetTraveled = 0;
  }
}
