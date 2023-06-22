import { Component, OnInit } from '@angular/core';
import { VehicleCategoryService } from './../../../shared/services';
import { Vehicle, VehicleCategory } from './../../../shared/models';
import { Patrimony } from './../../../shared/models/patrimony';
import { PatrimonyService } from './../../../shared/services/api/patrimony-service';
import { TmsdashboardService } from './../../../shared/services/api/tms-dashboard.service';
import { DatePipe } from '@angular/common';
import { Trajet } from './../../../shared/models/trajet';
import { TrajetService } from './../../../shared/services/api/trajet.service';
import { BrandVehicleType } from './../../../shared/models/brand-vehicle-type';
import { BrandVehicleTypeService } from './../../../shared/services/api/brand-vehicle-type.service';
@Component({
  selector: 'app-tms-dashboard-vehicle',
  templateUrl: './tms-dashboard-vehicle.component.html',
  styleUrls: ['./tms-dashboard-vehicle.component.css']
})
export class TmsDashboardVehicleComponent implements OnInit {
  codeSearch: Vehicle;
  vehicleCategoryList: Array<VehicleCategory> = [];
  vehicleBrandTypeList: Array<BrandVehicleType> = [];
  seniorityList: any[];
   senioritySearch: any;
  categorySearch: VehicleCategory;
  marqueSearch : BrandVehicleType;
  vehicleRegistrationNumberList: Array<Patrimony> = [];
  dateDepartSearch: Date;
  codeSearch2: Trajet;
  trajetList: Array<Trajet> = [];
  hourstrajet: number = 0;
  minutestrajet: number = 0;
  hourstrajetattent: number = 0;
  minutestrajetattent: number = 0;
  hourstrajetoperation: number = 0;
  minutestrajetoperation: number = 0;
  dateFinSearch: Date; trajetTraveled: number = 0;
  kilometerTraveled: number = 0;
  constructor(public datepipe: DatePipe,
    private tmsDashboardService: TmsdashboardService,
    private trajetService: TrajetService,
    private patrimonyService: PatrimonyService,
    private vehicleCategoryService: VehicleCategoryService,
    private brandVehicleTypeService:BrandVehicleTypeService) { }

  ngOnInit(): void {

    this.vehicleCategoryService.findAll().subscribe(
      data => {
        this.vehicleCategoryList = data;
      }
    )
    this.brandVehicleTypeService.findAll().subscribe(
      data => {
        this.vehicleBrandTypeList = data;
      }
    )

    this.seniorityList = [{ mode: '2', header: "Moins d'un an", slice1: '0', slice2: '1' },
        { mode: '2', header: "entre 1 et 3 ans", slice1: '0', slice2: '1' },
        { mode: '2', header: "entre 3 et 5 ans", slice1: '0', slice2: '1' },
        { mode: '2', header: "entre 5 et 10 ans", slice1: '0', slice2: '1' },
        { mode: '1', header: "plus de 10 ans", slice1: '0', slice2: '10' }]

  }

  onVehicleCodeSearch(event: any) {
    this.patrimonyService.find('registrationnumber~' + event.query).subscribe(
      data => this.vehicleRegistrationNumberList = data.filter(f => f.patrimony_type == 'vehicule')
      )
     
  }

  onSearchClicked() {
    this.searchWithVehicleDate();

  }
  onCodeSearch(event: any) {
    this.trajetService.find('code~' + event.query).subscribe(
      data => this.trajetList = data
    )
  }

  searchWithVehicleDate() {
    var vehicleId
    var categoryId;
    let trajetId;
    let marqueId;
    var oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    var dateDebut = oneYearAgo;
    var dateFin = new Date();
    if (this.codeSearch != null && this.codeSearch.code !== '') {

      vehicleId = this.codeSearch.id;
      console.log('========>'+vehicleId);
    //  registration = this.codeSearch.registrationNumber;
    }
    if (this.categorySearch != null && this.categorySearch.code !== '') {
      categoryId = this.categorySearch.id;
      console.log('-------->'+categoryId);
    }
    if (this.marqueSearch != null && this.marqueSearch.code !== '') {
      marqueId = this.marqueSearch.id;
      console.log('fggfgfgfg-->'+marqueId);
    }
    if (this.codeSearch2 != null && this.codeSearch2.code != '') {
      trajetId = this.codeSearch2.id;
      console.log(trajetId);
    }

    if (this.dateDepartSearch != null && this.dateFinSearch != null) {
      dateDebut = this.dateDepartSearch;
      dateFin = this.dateFinSearch;
      console.log('tttttttttttttttt'+dateDebut,dateFin);
    }

    this.tmsDashboardService.getNumberTrajetsVehicle(vehicleId, trajetId,categoryId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'), this.datepipe.transform(dateFin, 'yyyy/MM/dd'))
      .subscribe(
        data => {
          this.trajetTraveled = data ? data : 0;
          console.log(data);
        });

    this.tmsDashboardService.getmileagevehicle(vehicleId,trajetId, categoryId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'), this.datepipe.transform(dateFin, 'yyyy/MM/dd'))
      .subscribe(
        data => {
          this.kilometerTraveled = data ? data : 0;
          console.log('mile'+data);

        });
        this.tmsDashboardService.gettrajetaveragedurationvehicle(vehicleId, trajetId,categoryId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'),
      this.datepipe.transform(dateFin, 'yyyy/MM/dd')).subscribe(
        data => {

          this.hourstrajet = Math.floor(data / 60);
          this.minutestrajet = Math.floor(data % 60);
          console.log('dure'+data);
        })
        this.tmsDashboardService.gettrajetaveragedurationattentvehicle(vehicleId, trajetId,categoryId,marqueId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'),
        this.datepipe.transform(dateFin, 'yyyy/MM/dd')).subscribe(
          data => {
  
          
            this.hourstrajetattent = Math.floor(data / 60);
            this.minutestrajetattent = Math.floor(data % 60);
            console.log('atent'+data);
          });
          this.tmsDashboardService.gettrajetaveragedurationoperationvehicle(vehicleId, trajetId,categoryId,marqueId, this.datepipe.transform(dateDebut, 'yyyy/MM/dd'),
          this.datepipe.transform(dateFin, 'yyyy/MM/dd')).subscribe(
            data => {
    
              this.hourstrajetoperation = Math.floor(data / 60);
              this.minutestrajetoperation = Math.floor(data % 60);
              console.log('ope'+data);
            });


  }
  reset() {
    this.codeSearch = null;
    this.codeSearch2 = null;
    this.dateDepartSearch = null;
    this.dateFinSearch = null;
    this.categorySearch = null;
    this.trajetTraveled = 0;

  }
}
