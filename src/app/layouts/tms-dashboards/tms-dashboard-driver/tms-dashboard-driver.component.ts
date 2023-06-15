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
  trajetList: Array<Trajet> = [];
  driverList: Array<Driver> = [];
  dateDepartSearch: Date;
  dateFinSearch: Date;
  typeoperation: string
  mileageTraveled: number = 0;
  hourstrajet: number = 0;
  minutestrajet: number = 0;
  hourstrajetattent: number = 0;
  minutestrajetattent: number = 0;
  hourstrajetoperation: number = 0;
  minutestrajetoperation: number = 0;
  trajetsTraveled: number = 0;
  data: any;
  options: any;
  constructor(private datepipe: DatePipe,
    private trajetService: TrajetService,
    private ordertypeservice: OrderTransportTypeService,
    private tmsDashboardService: TmsdashboardService,
    private driverservice: DriverService) { }

  ngOnInit(): void {

  }

  onDriverCodeSearch(event: any) {
    this.driverservice.find('name~' + event.query).subscribe(
      data => this.driverList = data
    )
  }

  onCodeSearch(event: any) {
    this.trajetService.find('code~' + event.query).subscribe(
      data => this.trajetList = data
    )
  }
  onSearchClicked() {


    let driverId;
    let trajetId;
    var oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    var dateDebut = oneYearAgo;
    var dateFin = new Date();

    if (this.codeSearch != null && this.codeSearch.name != '') {
      driverId = this.codeSearch.id;
    }

    if (this.codeSearch2 != null && this.codeSearch2.code != '') {
      trajetId = this.codeSearch2.id;
      console.log(trajetId);
    }

    if (this.dateDepartSearch != null && this.dateFinSearch != null) {
      dateDebut = this.dateDepartSearch;
      dateFin = this.dateFinSearch;
      console.log(dateDebut);
      console.log(dateFin);
    }

    this.tmsDashboardService.getNumberTrajetsDriver(driverId,trajetId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'),
      this.datepipe.transform(dateFin, 'yyyy/MM/dd')).subscribe(
        data => {
          this.trajetsTraveled = data ? data : 0;
      
        });

    this.tmsDashboardService.getmileagedriver(driverId,trajetId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'),
      this.datepipe.transform(dateFin, 'yyyy/MM/dd')).subscribe(
        data => {
          console.log('----------->'+driverId,trajetId,dateDebut,dateFin);
          this.mileageTraveled = data ? data : 0;
          console.log('----------->'+data);

        });

    this.tmsDashboardService.gettrajetaveragedurationdriver(driverId, trajetId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'),
      this.datepipe.transform(dateFin, 'yyyy/MM/dd')).subscribe(
        data => {

          this.hourstrajet = Math.floor(data / 60);
          this.minutestrajet = Math.floor(data % 60);

        });
    this.tmsDashboardService.gettrajetaveragedurationattentdriver(driverId, trajetId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'),
      this.datepipe.transform(dateFin, 'yyyy/MM/dd')).subscribe(
        data => {

          this.hourstrajetattent = Math.floor(data / 60);
          this.minutestrajetattent = Math.floor(data % 60);

        }
      )
    this.tmsDashboardService.gettrajetaveragedurationoperationdriver(driverId, trajetId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'),
      this.datepipe.transform(dateFin, 'yyyy/MM/dd')).subscribe(
        data => {

          this.hourstrajetoperation = Math.floor(data / 60);
          this.minutestrajetoperation = Math.floor(data % 60);
          console.log('fffffffffff'+data);
        }
      )

  }
 /*  onChartDriver() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const monthNames: string[] = [];
    let currentDate = new Date(this.dateDepartSearch);
    while (currentDate <= this.dateFinSearch) {
      const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
      monthNames.push(monthName);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    this.data = {
      labels: monthNames,
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: documentStyle.getPropertyValue('--blue-500'),
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              backgroundColor: documentStyle.getPropertyValue('--pink-500'),
              borderColor: documentStyle.getPropertyValue('--pink-500'),
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  };
  this.options = {

    legend: {
      labels: {
        usePointStyle: true
      }
    }

  };

} */


  reset() {
    this.codeSearch = null;
    this.codeSearch2 = null;
    this.dateDepartSearch = null;
    this.dateFinSearch = null;
    this.mileageTraveled = 0;
    this.typeoperation=null;
  }

}
