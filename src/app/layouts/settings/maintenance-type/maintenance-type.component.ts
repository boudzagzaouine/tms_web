import { GlobalService } from './../../../shared/services/api/global.service';
import { MaintenanceType } from './../../../shared/models/maintenance-type';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaintenanceTypeService } from './../../../shared/services/api/maintenance-type.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-maintenance-type',
  templateUrl: './maintenance-type.component.html',
  styleUrls: ['./maintenance-type.component.css'],
  providers: [ConfirmationService]

})
export class MaintenanceTypeComponent implements OnInit {

  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch: string;
  codeList: Array<MaintenanceType> = [];
  cols: any[];
  maintenanceTypeList: Array<MaintenanceType> = [];
  selectedMaintenanceTypes: Array<MaintenanceType> = [];
  showDialog: boolean;
  editMode: number;
  className: string;

  maintenanceTypeExportList: {

    'Code': string,
    'Description': string,
  }[] = [];

  constructor(private maintenanceTypeService: MaintenanceTypeService,
    private spinner: NgxSpinnerService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = MaintenanceType.name;
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'description', header: 'Description' },

    ];

    this.loadData();

  }

  loadData(search: string = '') {
    this.spinner.show();
    this.maintenanceTypeService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.maintenanceTypeService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.maintenanceTypeList = data;

        this.spinner.hide();
      },
      error => {
        this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  onExportExcelGlobal(event) {

    this.maintenanceTypeService.find(this.searchQuery).subscribe(
      data => {
        this.maintenanceTypeExportList = data.map(
          m => ({
            'Code': m.code,
            'Description': m.description,
          }));
        this.globalService.exportExcelGlobal(this.maintenanceTypeExportList, this.className);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );


  }

  onExportPdfGlobal(event) {
    this.maintenanceTypeService.find(this.searchQuery).subscribe(
      data => {
        this.maintenanceTypeExportList = data;
        this.globalService.exportPdf(event,this.maintenanceTypeExportList,this.className);
        this.spinner.hide();
      },
      error => {
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
      buffer.append(`code~${this.codeSearch}`);
    }
    if (this.descriptionSearch != null && this.descriptionSearch !== '') {
      buffer.append(`description~${this.descriptionSearch}`);
    }
    this.page = 0;
    this.searchQuery = buffer.getValue();
    this.loadData(this.searchQuery);

  }

  reset() {
    this.codeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.descriptionSearch = '';
    this.loadData(this.searchQuery);
  }
  onCodeSearch(event: any) {
    this.maintenanceTypeService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    );
  }
  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedMaintenanceTypes = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedMaintenanceTypes.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedMaintenanceTypes.map(x => x.id);
          this.maintenanceTypeService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedMaintenanceTypes.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }



}
