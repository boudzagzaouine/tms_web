import { Component, OnInit } from '@angular/core';
import { Driver } from './../../../shared/models/driver';
import { TmsDashboardService } from './../../../shared/services/api/tms-dashboard.service';
import { DriverService } from './../../../shared/services/api/driver.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tms-dashboard-driver',
  templateUrl: './tms-dashboard-driver.component.html',
  styleUrls: ['./tms-dashboard-driver.component.css']
})
export class TmsDashboardDriverComponent implements OnInit {
  codeSearch: Driver;
  driverList: Array<Driver> = [];
  dateSearch: Date;
  mileageTraveled: number = 0;
  trajetsTraveled: number = 0
  constructor(public datepipe: DatePipe,
    private tmsDashboardService: TmsDashboardService,
    private driverservice: DriverService) { }

  ngOnInit(): void {
  }

  onDriverCodeSearch(event: any) {
    this.driverservice.find('name~' + event.query).subscribe(
      data => this.driverList = data
    )
  }
  onSearchClicked() {

    let driverId;
    let dateDebut = new Date(), dateFin = new Date();

    if (this.codeSearch != null && this.codeSearch.name !== '') {
      driverId = this.codeSearch.id;
    }
    if (this.dateSearch != null) {
      dateDebut = this.dateSearch[0];
      dateFin = this.dateSearch[1];
    }


    this.tmsDashboardService.getNumberTrajetsDriver(driverId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'), this.datepipe.transform(dateFin, 'yyyy/MM/dd'))
      .subscribe(
        data => {
          this.trajetsTraveled = data ? data : 0;

        });

        this.tmsDashboardService.getmileagedriver(driverId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'), this.datepipe.transform(dateFin, 'yyyy/MM/dd'))
        .subscribe(
          data => {
            this.mileageTraveled = data ? data : 0;
  
          });


  }


  reset() {
    this.codeSearch = null;
    this.dateSearch = null;
    this.mileageTraveled = 0;

  }


}
