import { DriverService } from './../../shared/services/api/driver.service';
import { CommissionTypeService } from './../../shared/services/api/commisionType.service';
import { CommissionType } from './../../shared/models/commissionType';
import { Driver } from './../../shared/models/driver';
import { EmsBuffer } from './../../shared/utils/ems-buffer';
import { CommissionDriverService } from './../../shared/services/api/commision-driver.service';
import { CommissionDriver } from './../../shared/models/commission-driver';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commission-driver',
  templateUrl: './commission-driver.component.html',
  styleUrls: ['./commission-driver.component.css']
})
export class CommissionDriverComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  commissionTypeSearch: CommissionType;
  driverSearch: Driver;
  descriptionSearch = '';
  codeList: Array<CommissionDriver> = [];
  cols: any[];
  commisionDriverList: Array<CommissionDriver> = [];
  DriverList: Array<Driver> = [];
  selectedCommissionDriverTypes: Array<CommissionDriver> = [];
  commisionTypeList: Array<CommissionType> = [];
  showDialog: boolean;
  editMode: number;
  className: String;

  constructor(private commissionDriverService: CommissionDriverService,
    private commissionTypeService: CommissionTypeService,
    private driverService: DriverService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = CommissionDriver.name;
    this.cols = [
      { field: 'driver', header: 'Chauffeur' },
      { field: 'commissionType', header: 'Type de commission' },
      { field: 'datee', header: 'Date' },


    ];
    this.commissionTypeService.findAll().subscribe(
      data => {
        this.commisionTypeList = data;
      }
    );
    this.driverService.findAll().subscribe(
      data => {
        this.DriverList = data;
      }
    );
    this.loadData();

  }

  loadData(search: string = '') {
    this.spinner.show();
    this.commissionDriverService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.commissionDriverService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.commisionDriverList = data;

        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
  loadDataLazy(event) {
    this.size = event.rows;
    this.page = event.first / this.size;
    this.loadData(this.searchQuery);
  }

  onSearchClicked() {
    const buffer = new EmsBuffer();
    if (this.codeSearch != null && this.codeSearch !== '') {
      buffer.append(`commissionType.code~${this.codeSearch}`);
    }
    if (this.driverSearch != null && this.driverSearch.code !== '') {
      buffer.append(`driver.code~${this.driverSearch.code}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }
  onCodeSearch(event: any) {
    this.commissionDriverService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    );
  }
  reset() {
    this.codeSearch = null;
    this.commissionTypeSearch = null;
    this.driverSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.loadData(this.searchQuery);
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedCommissionDriverTypes = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedCommissionDriverTypes.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedCommissionDriverTypes.map(x => x.id);
          this.commissionDriverService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedCommissionDriverTypes.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }



}
