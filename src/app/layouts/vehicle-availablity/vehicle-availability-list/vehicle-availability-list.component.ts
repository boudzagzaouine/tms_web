import { TransportPlanService } from './../../../shared/services/api/transport-plan.service';
import { TransportPlan } from './../../../shared/models/transport-plan';
import { Observable } from 'rxjs/Observable';
import { Vehicle } from './../../../shared/models/vehicle';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { Router } from '@angular/router';
import { GlobalService } from './../../../shared/services/api/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Subscription, Subject } from 'rxjs';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-vehicle-availability-list',
  templateUrl: './vehicle-availability-list.component.html',
  styleUrls: ['./vehicle-availability-list.component.css']
})
export class VehicleAvailabilityListComponent implements OnInit {

  page = 0;
  size = 10;
  collectionSize: number;
  searchQuery = '';
  searchQueryTrajet = '';
  vehicleSearch: Vehicle;
  matSearch: string;
  dateSearch: Date;

  selectedVehicles: Array<Vehicle> = [];
  vehicleList: Array<Vehicle> = [];
  vehicleCodeList: Array<Vehicle> = [];


  className: string;
  titleList = 'Liste des Disponibilités';
  cols: any[];
  editMode: number;
  showDialog: boolean;
  vehicleExportList: Array<Vehicle> = [];
  subscriptions= new Subscription ();
  items: MenuItem[];

  home: MenuItem;




  constructor(  private vehicleService: VehicleService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private transportPlanService:TransportPlanService,
    private router: Router) { }


  ngOnInit(): void {




    this.items = [
      {label: 'disponibilité'},
      {label: 'Lister',routerLink:'/core/vehicle-availablity/list'},

  ];

    this.home = {icon: 'pi pi-home'};

    this.className = Vehicle.name;
    this.cols = [
      { field: 'registrationNumber', header: 'Immatriculation', type: 'string' },
      { field: 'vehicleCategory', child: 'code', header: 'Catégorie véhicule', type: 'object' },
      { field: 'state', child: 'state', header: 'Status', type: 'string' },



    ];
    this.searchQuery='';
    this.loadData();
  }




  loadData(search: string = '') {
    this.spinner.show();
    this.subscriptions.add(this.vehicleService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }

    ));
    console.log(this.searchQuery);

    this.subscriptions.add(this.vehicleService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.vehicleList = data;

        this.vehicleList.forEach((vehicle) => {
          this.searchVehicleInTranportPlan(vehicle).subscribe((data) => {


             // vehicle.disponible = data;

          });
        });





        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }

  searchVehicleInTranportPlan(vehicle: Vehicle): Observable<string> {
    let state: string = "Disponible";
    var subject = new Subject<string>();

    this.onSearchTrajetClicked(vehicle);
    console.log(this.searchQueryTrajet);

    this.transportPlanService
      .sizeSearch(this.searchQueryTrajet
      )
      .subscribe((data) => {
console.log(data);


        if (data>0) {
          state = "En Trajet";
          console.log("trajet");

          subject.next(state);
        } else if(data==0) {
          state = "Disponible";
          console.log("Disponible");

          subject.next(state);
        }
      });
    return subject.asObservable();
  }
  // loadDataLazy(event) {
  //   this.size = event.rows;
  //   this.page = event.first / this.size;
  //   this.loadData(this.searchQuery);
  // }


  onExportExcel(event) {

    this.subscriptions.add(this.vehicleService.find(this.searchQuery).subscribe(
      data => {
        this.vehicleExportList = data;

        if (event != null) {
          this.globalService.generateExcel(event, this.vehicleExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.vehicleExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));


  }


  onExportPdf(event) {
    this.subscriptions.add(this.vehicleService.find(this.searchQuery).subscribe(
      data => {
        this.vehicleExportList = data;
        this.globalService.generatePdf(event, this.vehicleExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }

  onSearchVehicleClicked() {


    const buffer = new EmsBuffer();



    if (this.vehicleSearch != null && this.vehicleSearch.code !== '') {

        buffer.append(`registrationNumber: ${this.vehicleSearch.registrationNumber}`);

    }

    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }

  onSearchTrajetClicked(vehicle:Vehicle) {


    const buffer = new EmsBuffer();

    if (this.vehicleSearch != null && this.vehicleSearch.registrationNumber !== '') {

      buffer.append(`vehicle.registrationNumber: ${this.vehicleSearch.registrationNumber}`);

  }else{
    buffer.append(`vehicle.registrationNumber: ${vehicle.registrationNumber}`);

  }

    if (this.dateSearch != null && this.dateSearch !== undefined) {
      let dateD,dateF;
      dateD=this.dateSearch[0];
      dateF=this.dateSearch[1];
      if(dateD!=null){
      buffer.append(`dateDepart>${dateD.toISOString()}`);
      }
     else if(dateF!=null){
        buffer.append(`dateDepart< ${dateD.toISOString()}`);
        }
    }
    buffer.append(  `turnStatus.id! +3`);
    this.searchQueryTrajet = buffer.getValue();

  }


  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedVehicles = event.object;

    if (this.editMode === 3) {
      //this.onDeleteAll();
    } else {
      this.showDialog = true;
      this.router.navigate(['/core/vehicles/edit', this.selectedVehicles[0].id]);
    }

  }

  // onVehicleCodeSearch(event: any) {
  //   this.subscriptions.add(this.vehicleService.find('code~' + event.query).subscribe(
  //     data => this.vehicleCodeList = data.filter(f=> f.vehicle_type=='vehicule')
  //   ));
  // }

  onVehicleCodeSearch(event: any){
    console.log(event);

    this.subscriptions.add(this.vehicleService.find('registrationNumber~' + event.query).subscribe(
      data => this.vehicleCodeList = data
    ));
  }

  onSelectPatrimony(event:any){


  }
  reset() {
    this.vehicleSearch = null;
    this.matSearch = null;
    this.dateSearch=null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

}
