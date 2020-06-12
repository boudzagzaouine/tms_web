import { VehicleService } from './../../../shared/services/api/vehicle.service';
import { GlobalService } from './../../../shared/services/api/global.service';
import { Vehicle } from './../../../shared/models/vehicle';
import { Router } from '@angular/router';
import { BadgeTypeService } from './../../../shared/services/api/badge-type.service';
import { BadgeTypeDriverService } from './../../../shared/services/api/badge-type-driver.service';
import { BadgeType } from './../../../shared/models/badge-Type';
import { ToastrService } from 'ngx-toastr';
import { Badge } from './../../../shared/models/badge';
import { Driver } from './../../../shared/models/driver';
import { BadgeService } from './../../../shared/services/api/badge.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { NgxSpinnerService } from 'ngx-spinner';
import { DriverService } from './../../../shared/services/api/driver.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css'],
  providers: [ConfirmationService]
})
export class DriverListComponent implements OnInit {

  page = 0;
  size = 8;
  collectionSize: number;
  cinSearch: string;
  codeSearch: string;
  contratSearch: string;
  badgeTypeSearch: BadgeType;
  selectedDrivers: Array<Vehicle>=[];
  loading: boolean;
  searchQuery = '';
  driverList: Array<Driver> = [];
  badgesTypeList: Array<BadgeType> = [];

  className: string;
  cols: any[];
  editMode: number;
  driverExportList: {
    'Code': string,
    'Cin': string,
    'Date Naissance': string,
    'Carte abonnement': string,
    'Nom': string,
    'Téléphone': string,
    'Fax': string,
    'Email': string,

  }[] = [];


  constructor(private driverService: DriverService,
    private spinner: NgxSpinnerService,
    private badgeTypeService: BadgeTypeService,
    private globalService:GlobalService,
    private badgetypedriverService:BadgeTypeDriverService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private router:Router) { }

  ngOnInit() {
    this.className = Driver.name;
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'cin', header: 'Cin' },
      { field: 'birthDate', header: 'Date Naissance' },

      { field: 'carte', header: "Carte d'abonnement" },
      { field: 'name', header: 'Nom' },
      { field: 'tele1', header: 'Téléphone' },
      { field: 'fax', header: 'Fax' },
      { field: 'email', header: 'Email' },
    ];

    this.loadData();
    this.loadBadge();
    // this.loading = true;
  }


  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedDrivers = event.object;

    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.router.navigate(['/core/drivers/edit', this.selectedDrivers[0].id]);
    }

  }

  onExportExcelGlobal() {
    console.log("methode insurance");

    this.driverService.find(this.searchQuery).subscribe(
      data => {
        this.driverExportList = data.map(
          m => ({

              'Code': m.code,
              'Cin': m.cin,
              'Date Naissance': m.birthDate,
              'Carte abonnement': m.carte,
              'Nom': m.name,
              'Téléphone': m.tele1,
              'Fax': m.fax,
              'Email': m.email,

            }));
        this.globalService.exportExcelGlobal(this.driverExportList, this.className);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );


  }
  onExportPdfGlobal(event) {
    this.driverService.find(this.searchQuery).subscribe(
      data => {
        this.driverExportList = data;
        this.globalService.exportPdf(event,this.driverExportList,this.className);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

  }

  loadBadge() {

    this.badgeTypeService.findAll().subscribe(

      data => {

        this.badgesTypeList = data;
      }
    );

  }

  loadDataLazy(event) {
    //  this.loading = true;

    // this.page = this.drivers.slice(event.first, (event.first + event.rows));
    // this.loading = false;
    this.page = event.first / this.size;

    this.loadData(this.searchQuery);

  }

  loadData(search: string = '') {

    console.log('loading data');

    this.spinner.show();

    this.driverService.sizeSearch(search).subscribe(
      data => {
        console.log('data size : ' + data);

        this.collectionSize = data;
      }
    );

    this.driverService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.driverList = data;
        this.spinner.hide();
      },
      error => { this.spinner.hide(); },
      () => this.spinner.hide()

    );
  }

  loadDataOfBD(search: string = '') {

    console.log('loading data');

    this.spinner.show();

    this.badgetypedriverService.sizeSearch(search).subscribe(
      data => {
        console.log('data size : ' + data);

        this.collectionSize = data;
      }
    );

    this.badgetypedriverService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.driverList = data.map(b => b.driver);
        this.spinner.hide();
      },
      error => { this.spinner.hide(); },
      () => this.spinner.hide()
    );
  }

  onSearchClicked() {

    const buffer = new EmsBuffer();
    if (this.cinSearch != null && this.cinSearch !== '') {
      buffer.append(`cin~${this.cinSearch}`);
    }

    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`code~${this.codeSearch}`);
    }
    if (this.badgeTypeSearch != null && this.badgeTypeSearch.code !== '') {
      buffer.append(`badgeTypeDrivers.badgeType.code~${this.badgeTypeSearch.code}`);
    }

    this.page = 0;
    const searchQuery = buffer.getValue();
    console.log('search ' + searchQuery);

    this.loadData(searchQuery);

  }

  onSeachDriverBadge() {
    const buffer = new EmsBuffer();
    if (this.cinSearch != null && this.cinSearch !== '') {
      buffer.append(`driver.cin~${this.cinSearch}`);
    }

    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`driver.code~${this.codeSearch}`);
    }
    if (this.badgeTypeSearch != null && this.badgeTypeSearch.code !== '') {
      buffer.append(`badgeType.code~${this.badgeTypeSearch.code}`);
    }


    this.page = 0;
    const searchQuery = buffer.getValue();
    console.log('search ' + searchQuery);

    this.loadDataOfBD(searchQuery);



  }

  reset() {
    this.codeSearch = null;
    this.cinSearch = null;
    this.badgeTypeSearch = null;
    this.page = 0;

    this.searchQuery = '';
    this.loadData();
  }


  onDeleteAll() {

    if (this.selectedDrivers.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedDrivers.map(x => x.id);
          this.driverService.deleteAllByIds(ids).subscribe(
            data => {
              this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          );
        }
      });
    } else if (this.selectedDrivers.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }
  }


  onDeleteDriver(id: number) {
    console.log('delete id : ' + id);

    this.confirmationService.confirm({
      message: 'Voulez vous vraiment Suprimer?',
      accept: () => {

        this.driverService.delete(id).subscribe(

          data => {
            this.toastr.success('Elément est Supprimé Avec Succès', 'Suppression');
            this.loadData();
          },
          error => {
            this.toastr.error(error.error.message);
          }
        );

      }
    });


  }



}
