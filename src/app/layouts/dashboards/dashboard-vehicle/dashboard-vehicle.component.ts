import { Component, OnInit } from '@angular/core';
import { Patrimony } from './../../../shared/models/patrimony';
import { Vehicle, VehicleCategory } from './../../../shared/models';
import { PatrimonyService } from './../../../shared/services/api/patrimony-service';
import { VehicleCategoryService } from './../../../shared/services';
import { DashboardService } from './../../../shared/services/api/dashboard.service';
import { Subscription } from 'rxjs';
import { Dashboard } from './../../../shared/models/dashboard';
@Component({
    selector: 'app-dashboard-vehicle',
    templateUrl: './dashboard-vehicle.component.html',
    styleUrls: ['./dashboard-vehicle.component.css']
})
export class DashboardVehicleComponent implements OnInit {

    codeSearch: Vehicle;
    vehicleCodeList: Array<Patrimony> = [];
    vehicleCategoryList: Array<VehicleCategory> = [];
    categorySearch: VehicleCategory;
    dateSearch: Date;

    averageConsumption: number = 0;
    mileageTraveled: number = 0;
    correctiveMaintenanceCosts: number = 0;
    preventiveMaintenanceCosts: number = 0;
    totalNumberOfProblems: number = 0; 
    percentageCorrective: number = 0;
    percentagePreventive: number = 0;
    gasoilCosts: number = 0;
    averageAge: number = 0;

    seniorityList: any[];
    senioritySearch: any;
   
    subscription: Subscription;

    lineBarMaintenanceData: any;
    basicOptions: any;
    barChartGasoilData: any;
    DoughnutMaintenanceData: any;
    chartOptions: any;
 
    statisticMaintenanceCorectiveList: Array<Dashboard> = [];
    statisticMaintenancePreventiveList: Array<Dashboard> = [];
    statisticGasoilList: Array<Dashboard> = [];

    constructor(private patrimonyService: PatrimonyService,
        private vehicleCategoryService: VehicleCategoryService,
        private dashboardService: DashboardService,

    ) { }

    ngOnInit(): void {

        this.vehicleCategoryService.findAll().subscribe(
            data => {
                this.vehicleCategoryList = data;
            }
        )

        this.seniorityList = [{ mode: '2', header: "Moins d'un an", slice1: '0', slice2: '1' },
        { mode: '2', header: "entre 1 et 3 ans", slice1: '0', slice2: '1' },
        { mode: '2', header: "entre 3 et 5 ans", slice1: '0', slice2: '1' },
        { mode: '2', header: "entre 5 et 10 ans", slice1: '0', slice2: '1' },
        { mode: '1', header: "plus de 10 ans", slice1: '0', slice2: '10' }]



        this.dashboardService.getaverageAgeByVehicle()
        .subscribe(
            data => {
                this.averageAge = data;
               console.log(this.averageAge);
               
            });

    }



    
    onSearchClicked() {

        if (this.senioritySearch != null && this.senioritySearch != undefined) {
            this.searchWithSeniority()
        }
        else if (this.dateSearch != null && this.dateSearch != undefined) {
            this.searchWithVehicleDate();
        }

        


    }

    reset() {
        this.codeSearch = null;
        this.categorySearch = null;
        this.dateSearch = null;
        this.averageConsumption = 0;
        this.mileageTraveled = 0;
        this.correctiveMaintenanceCosts = 0;
        this.preventiveMaintenanceCosts = 0;
        this.totalNumberOfProblems = 0;
        this.senioritySearch = null;
    }

   

    onVehicleCodeSearch(event: any) {
        this.patrimonyService.find('code~' + event.query).subscribe(
            data => this.vehicleCodeList = data.filter(f => f.patrimony_type == 'vehicule')
            )
    }

    onSelectVehicle(event: Vehicle) {
        this.categorySearch = event.vehicleCategory;
    }


    searchWithVehicleDate() {
        var vehicleId = 0
        var categoryId = 0;
        var registration;
        let dateDebut = new Date(), dateFin = new Date();
        if (this.codeSearch != null && this.codeSearch.code !== '') {

            vehicleId = this.codeSearch.id;
            registration = this.codeSearch.registrationNumber;
        }
        if (this.categorySearch != null && this.categorySearch.code !== '') {
            categoryId = this.categorySearch.id;
        }

        if (this.dateSearch != null) {
            dateDebut = this.dateSearch[0];
            dateFin = this.dateSearch[1];
        }
        console.log(dateFin);
        

        this.dashboardService.getAverageConsumption(vehicleId, categoryId, dateDebut.toLocaleDateString(), dateFin.toLocaleDateString())
            .subscribe(
                data => {
                    this.averageConsumption = data? data: 0;
                });

        this.dashboardService.getCorrectivemaintenancecostsbyvehicle(vehicleId, categoryId, dateDebut.toLocaleDateString(), dateFin.toLocaleDateString())
            .subscribe(
                data => {
                    this.correctiveMaintenanceCosts = data? data: 0;
                    this.onDoughnutMaintenance();
                });

        this.dashboardService.getPreventivemaintenancecostsbyvehicle(vehicleId, categoryId, dateDebut.toLocaleDateString(), dateFin.toLocaleDateString())
            .subscribe(
                data => {
                    this.preventiveMaintenanceCosts = data ? data: 0;
                    this.onDoughnutMaintenance();
                });

        this.dashboardService.getTraveledmileagebyvechile(vehicleId, categoryId, dateDebut.toLocaleDateString(), dateFin.toLocaleDateString())
            .subscribe(
                data => {
                    this.mileageTraveled = data? data: 0;
                });

        this.dashboardService.getTotalnumberofproblemsbyvehicle(vehicleId, categoryId, dateDebut.toLocaleDateString(), dateFin.toLocaleDateString())
            .subscribe(
                data => {
                    this.totalNumberOfProblems = data? data: 0;
                });

        this.dashboardService.getLineChartMaintenanceCorrectiveByVehicle(vehicleId, categoryId, dateDebut.toLocaleDateString(), dateFin.toLocaleDateString())
            .subscribe(
                data => {
                    this.statisticMaintenanceCorectiveList = data;
                    this.onLineBarChartMaintenance();
                });

        this.dashboardService.getLineChartMaintenancePreventiveByVehicle(vehicleId, categoryId, dateDebut.toLocaleDateString(), dateFin.toLocaleDateString())
            .subscribe(
                data => {
                    this.statisticMaintenancePreventiveList = data;
                    this.onLineBarChartMaintenance();
                });

        this.dashboardService.getBarChartGasoilByVehicle(registration, categoryId, dateDebut.toLocaleDateString(), dateFin.toLocaleDateString())
            .subscribe(
                data => {
                    this.statisticGasoilList = data;
                    this.gasoilCosts=this.statisticGasoilList.map(item => item.value).reduce((prev, next) => prev + next);
                    this.onBarChartGasoil();
                });

    }


    searchWithSeniority() {
        let mode, slice1, slice2, categoryid;
        mode = this.senioritySearch.mode;
        slice1 = this.senioritySearch.slice1;
        slice2 = this.senioritySearch.slice2;
        categoryid = 0;
        if (this.categorySearch != null && this.categorySearch != undefined) {
            categoryid = this.categorySearch.id;
        }
        this.dashboardService.getAverageConsumptionseniorityvehicle(categoryid, slice1, slice2, mode)
            .subscribe(
                data => {
                    this.averageConsumption = data ;

                });
        this.dashboardService.getCorrectivemaintenancecostsbyseniorityvehicle(categoryid, slice1, slice2, mode)
            .subscribe(
                data => {
                    this.correctiveMaintenanceCosts = data;

                });
        this.dashboardService.getPreventivemaintenancecostsbyseniorityvehicle(categoryid, slice1, slice2, mode)
            .subscribe(
                data => {
                    this.preventiveMaintenanceCosts = data;

                });
        this.dashboardService.getTraveledmileagebyseniorityvehicle(categoryid, slice1, slice2, mode)
            .subscribe(
                data => {
                    this.mileageTraveled = data;
                });
        this.dashboardService.getTotalnumberofproblemsbyseniorityvehicle(categoryid, slice1, slice2, mode)
            .subscribe(
                data => {
                    this.totalNumberOfProblems = data;
                });

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
    onLineBarChartMaintenance() {
        this.lineBarMaintenanceData = {
            labels: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
            datasets: [
                {
                    label: 'Maintenance Corrective',
                    data: this.statisticMaintenanceCorectiveList.map(m => m.value),
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: 0.4,
                },
                {
                    label: 'Maintenance Préventive',
                    data: this.statisticMaintenancePreventiveList.map(m => m.value),
                    fill: false,
                    borderColor: '#FFA726',
                    tension: 0.4,
                }
            ]
        };
        this.applyLightTheme();
        this.chartOptions = this.getLightTheme();

    }

    onDoughnutMaintenance() {
        let totalCosts = (this.preventiveMaintenanceCosts + this.correctiveMaintenanceCosts);
        this.percentageCorrective = (100 * (this.correctiveMaintenanceCosts) / totalCosts);
        this.percentagePreventive = (100 * (this.preventiveMaintenanceCosts) / totalCosts);
        this.DoughnutMaintenanceData = {
            labels: ['Maintenance Corrective', 'Maintenance Preventive'],
            datasets: [
                {
                    data: [this.percentageCorrective, this.percentagePreventive],
                    backgroundColor: [
                        "#42A5F5",
                        "#66BB6A",

                    ],
                    hoverBackgroundColor: [
                        "#64B5F6",
                        "#81C784",

                    ]
                }
            ]
        };
    }
    getLightTheme() {
        return {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        }
    }
    applyLightTheme() {
        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
    }


}
