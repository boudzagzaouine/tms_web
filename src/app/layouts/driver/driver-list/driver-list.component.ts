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
  selectedDrivers: Array<Vehicle> = [];
  drivercodeList: Array<Driver> = [];

  loading: boolean;
  searchQuery = '';
  driverList: Array<Driver> = [];
  badgesTypeList: Array<BadgeType> = [];

  className: string;
  cols: any[];
  editMode: number;
  driverExportList: Array<Driver> = [];
  titleList = 'Liste des chauffeurs';


  constructor(private driverService: DriverService,
    private spinner: NgxSpinnerService,
    private badgeTypeService: BadgeTypeService,
    private globalService: GlobalService,
    private badgetypedriverService: BadgeTypeDriverService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.className = Driver.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'cin', header: 'Cin', type: 'string' },
      { field: 'birthDate', header: 'Date Naissance', type: 'date' },

      { field: 'carte', header: "Carte d'abonnement", type: 'string' },
      { field: 'name', header: 'Nom', type: 'string' },
      { field: 'tele1', header: 'Téléphone', type: 'string' },
      { field: 'fax', header: 'Fax', type: 'string' },
      { field: 'email', header: 'Email', type: 'string' },
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

  onExportExcel(event) {

    this.driverService.find(this.searchQuery).subscribe(
      data => {
        this.driverExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.driverExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.driverExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );


  }
  onExportPdf(event) {
    this.driverService.find(this.searchQuery).subscribe(
      data => {
        this.driverExportList = data;
        this.globalService.generatePdf(event, this.driverExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

  }
  ondriverCodeSearch(event: any) {
    this.driverService.find('code~' + event.query).subscribe(
      data => this.drivercodeList = data.map(f => f.code)
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


    this.spinner.show();

    this.driverService.sizeSearch(search).subscribe(
      data => {

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


    this.spinner.show();

    this.badgetypedriverService.sizeSearch(search).subscribe(
      data => {

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

    this.loadData(searchQuery);

    // driverbadgeService.find('badgeType.code:' + ${this.badgeTypeSearch.code} ).
    // subscribe(
    // mergeMap
    //)

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
