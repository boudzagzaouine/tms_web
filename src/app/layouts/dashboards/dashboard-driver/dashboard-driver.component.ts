import { Component, OnInit } from '@angular/core';
import { DieselDeclaration } from './../../../shared/models/diesel-declaration';
import { DieselDeclarationService } from './../../../shared/services/api/dieselDeclaration.service';
import { Dashboard } from './../../../shared/models/dashboard';
import { Driver } from './../../../shared/models/driver';
import { DriverService } from './../../../shared/services';
import { DashboardService } from './../../../shared/services/api/dashboard.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-dashboard-driver',
  templateUrl: './dashboard-driver.component.html',
  styleUrls: ['./dashboard-driver.component.css']
})
export class DashboardDriverComponent implements OnInit {

  codeSearch: Driver;
  driverList: Array<Driver> = [];
  dateSearch: Date;
  averageConsumption: number = 0;
  mileageTraveled: number = 0;
  correctiveMaintenanceCosts: number = 0;
  preventiveMaintenanceCosts: number = 0;
  totalNumberOfProblems: number = 0;
  seniorityList: any[];
  senioritySearch: string;

  barChartGasoilData: any;
  statisticGasoilList: Array<Dashboard> = [];
  dieselDeclarationList: Array<any[]> = [];

  gasoilCosts: number = 0;

  constructor(private driverService: DriverService,
    private dashboardService: DashboardService,
    private dieselDeclarationService :DieselDeclarationService,

  ) { }

  ngOnInit(): void {

    this.seniorityList = [{ field: '1', header: "Moins d'un an" },
    { field: '2', header: "entre 1 et 3 ans" },
    { field: '3', header: "entre 3 et 5 ans" },
    { field: '4', header: "entre 5 et 10 ans" },
    { field: '5', header: "plus de 10 ans" }]

    this.dashboardService.getPercentGasoilByDriver()
    .subscribe(
      data => {
        this.dieselDeclarationList = data;
        console.log("data");
        
        console.log(this.dieselDeclarationList);
        //this.dieselDeclarationList = _.groupBy(this.dieselDeclarationList, d => d.driver.name);
       // console.log(this.dieselDeclarationList);
        

      });


  }

  onSearchClicked() {

    let driverId;
    let dateDebut = new Date(), dateFin = new Date();

    if (this.codeSearch != null && this.codeSearch.code !== '') {
      driverId = this.codeSearch.id;
    }
    if (this.dateSearch != null) {
      dateDebut = this.dateSearch[0];
      dateFin = this.dateSearch[1];
    }


    this.dashboardService.getAverageConsumptionDriver(driverId, dateDebut.toLocaleDateString(), dateFin.toLocaleDateString())
      .subscribe(
        data => {
          this.averageConsumption = data ? data : 0;

        });

    this.dashboardService.getCorrectivemaintenancecostsbyDriver(driverId, dateDebut.toLocaleDateString(), dateFin.toLocaleDateString())
      .subscribe(
        data => {
          this.correctiveMaintenanceCosts = data ? data : 0;
        });

    this.dashboardService.getPreventivemaintenancecostsbyDriver(driverId, dateDebut.toLocaleDateString(), dateFin.toLocaleDateString())
      .subscribe(
        data => {
          this.preventiveMaintenanceCosts = data ? data : 0;
        });

    this.dashboardService.getTraveledmileagebyDriver(driverId, dateDebut.toLocaleDateString(), dateFin.toLocaleDateString())
      .subscribe(
        data => {
          this.mileageTraveled = data ? data : 0;
        });

    this.dashboardService.getTotalnumberofproblemsbyDriver(driverId, dateDebut.toLocaleDateString(), dateFin.toLocaleDateString())
      .subscribe(
        data => {
          this.totalNumberOfProblems = data ? data : 0;
        });


    this.dashboardService.getBarChartGasoilByDriver(driverId, dateDebut.toLocaleDateString(), dateFin.toLocaleDateString())
      .subscribe(
        data => {
          this.statisticGasoilList = data;
          this.gasoilCosts = this.statisticGasoilList.map(item => item.value).reduce((prev, next) => prev + next);

          this.onBarChartGasoil();
        });
  }

  reset() {
    this.codeSearch = null;
    this.dateSearch = null;
    this.averageConsumption = 0;
    this.mileageTraveled = 0;
    this.correctiveMaintenanceCosts = 0;
    this.preventiveMaintenanceCosts = 0;
    this.totalNumberOfProblems = 0;

  }


  onDriverCodeSearch(event: any) {
    this.driverService.find('name~' + event.query).subscribe(
      data => this.driverList = data
    )
  }


  onBarChartGasoil() {
    this.barChartGasoilData = {
      labels: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
      datasets: [{
        type: 'bar',
        label: 'Gasoil',
        backgroundColor: '#66BB6A',
        data: this.statisticGasoilList.map(m => m.value),
        borderColor: 'white',
        borderWidth: 2
      },]
    };

  }

}
