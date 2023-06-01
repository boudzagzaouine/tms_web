import { Component, OnInit } from '@angular/core';
import { Driver } from './../../../shared/models/driver';
import { TmsdashboardService } from './../../../shared/services/api/tms-dashboard.service';
import { DriverService } from './../../../shared/services/api/driver.service';
import { DatePipe } from '@angular/common';
import { OrderTransportType } from './../../../shared/models/order-transport-type';
import { OrderTransportTypeService } from './../../../shared/services/api/order-transport-type.service';
import { Trajet } from './../../../shared/models/trajet';
import { TrajetService } from './../../../shared/services/api/trajet.service';
@Component({
  selector: 'app-tms-dashboard-driver',
  templateUrl: './tms-dashboard-driver.component.html',
  styleUrls: ['./tms-dashboard-driver.component.css']
})
export class TmsDashboardDriverComponent implements OnInit {
  codeSearch: Driver;
  codeSearch2: Trajet;
  driverList: Array<Driver> = [];
  orderTypeList: Array<string> = [];
  dateDepartSearch: Date;
  dateFinSearch: Date;
  typeSearch: string
  mileageTraveled: number = 0;
  hourstrajet: number = 0;
  minutestrajet: number = 0;
  hourstrajetattent: number = 0;
  minutestrajetattent: number = 0;
  hourstrajetoperation: number = 0;
  minutestrajetoperation: number = 0;
  trajetsTraveled: number = 0;
  codeList: Array<Trajet> = [];
  data: any;
  options: any;
  constructor(private datepipe: DatePipe,
    private trajetService: TrajetService,
    private ordertypeservice: OrderTransportTypeService,
    private tmsDashboardService: TmsdashboardService,
    private driverservice: DriverService) { }

  ngOnInit(): void {
    this.orderTypeList = ['Enlevement', 'Livraison']

  }

  onDriverCodeSearch(event: any) {
    this.driverservice.find('name~' + event.query).subscribe(
      data => this.driverList = data
    )
  }

  onCodeSearch(event: any) {
    this.trajetService.find('code~' + event.query).subscribe(
      data => this.codeList = data
    )
  }
  onSearchClicked() {


    let driverId: number;
    let operationtype: number;
    let trajetId: number;
    let dateDebut= new Date(), dateFin= new Date();

    if (this.codeSearch != null && this.codeSearch.name != '') {
      driverId = this.codeSearch.id;
    }
    if (this.typeSearch != null && this.typeSearch != '') {
      if (this.typeSearch === "Enlevement") operationtype = 1;
      if (this.typeSearch === "Livraison") operationtype = 2;
    }

    if (this.codeSearch2 != null && this.codeSearch2.code != '') {
      trajetId = this.codeSearch2.id;
      console.log(trajetId);
    }

    if (this.dateDepartSearch != null && this.dateFinSearch != null) {
      dateDebut = this.dateDepartSearch;
      dateFin = this.dateFinSearch;
    }

    this.tmsDashboardService.getNumberTrajetsDriver(driverId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'),
      this.datepipe.transform(dateFin, 'yyyy/MM/dd')).subscribe(
        data => {
          this.trajetsTraveled = data ? data : 0;

        });

    this.tmsDashboardService.getmileagedriver(driverId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'),
      this.datepipe.transform(dateFin, 'yyyy/MM/dd')).subscribe(
        data => {
          this.mileageTraveled = data ? data : 0;

        });

    this.tmsDashboardService.gettrajetaverageduration(driverId, trajetId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'),
      this.datepipe.transform(dateFin, 'yyyy/MM/dd')).subscribe(
        data => {

          this.hourstrajet = Math.floor(data / 60);
          this.minutestrajet = Math.floor(data % 60);

        });
    this.tmsDashboardService.gettrajetaveragedurationattent(driverId, trajetId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'),
      this.datepipe.transform(dateFin, 'yyyy/MM/dd')).subscribe(
        data => {

          this.hourstrajetattent = Math.floor(data / 60);
          this.minutestrajetattent = Math.floor(data % 60);

        }
      )
    this.tmsDashboardService.gettrajetaveragedurationoperation(driverId, operationtype, trajetId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'),
      this.datepipe.transform(dateFin, 'yyyy/MM/dd')).subscribe(
        data => {

          this.hourstrajetoperation = Math.floor(data / 60);
          this.minutestrajetoperation = Math.floor(data % 60);

        }
      )

  }

  reset() {
    this.codeSearch = null;
    this.dateDepartSearch = null;
    this.dateFinSearch = null;
    this.mileageTraveled = 0;

  }

}
