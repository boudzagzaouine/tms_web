import { Vehicle } from './../../../shared/models/vehicle';
import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { PatrimonyService } from './../../../shared/services/api/patrimony-service';
import { Patrimony } from './../../../shared/models/patrimony';
import { Router } from '@angular/router';
import { GlobalService } from './../../../shared/services/api/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { Subscription } from 'rxjs';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

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
  codeSearch: Patrimony;
  matSearch: string;
  dateSearch: Date;

  selectedVehicles: Array<Vehicle> = [];
  vehicleList: Array<Vehicle> = [];
  vehicleCodeList: Array<Vehicle> = [];

  patrimonyCodeList: Array<Patrimony> = [];

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
    private patrimonyService:PatrimonyService,
    private globalService: GlobalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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
    this.subscriptions.add(this.vehicleService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.vehicleList = data;

        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');

        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));
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

  onSearchClicked() {


    const buffer = new EmsBuffer();



    if (this.codeSearch != null && this.codeSearch.code !== '') {

        buffer.append(`vehicle.registrationNumber: ${this.codeSearch.registrationNumber}`);

    }
    if (this.dateSearch != null && this.dateSearch !== undefined) {
      let dateD,dateF;
      dateD=this.dateSearch[0];
      dateF=this.dateSearch[1];
      if(dateD!=null){
      buffer.append(`interventionDate>${dateD.toISOString()}`);
      }
     else if(dateF!=null){
        buffer.append(`interventionDate< ${dateD.toISOString()}`);
        }
    }





    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

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

  onPatrimonyCodeSearch(event: any){
    this.subscriptions.add(this.patrimonyService.find('code~' + event.query).subscribe(
      data => this.patrimonyCodeList = data
    ));
  }

  onSelectPatrimony(event:any){


  }
  reset() {
    this.codeSearch = null;
    this.matSearch = null;
    this.dateSearch=null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

}
