import { GlobalService } from './../../../shared/services/api/global.service';
import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { MaintenanceState } from './../../../shared/models/maintenance-state';
import { MaintenanceStateService } from './../../../shared/services/api/maintenance-states.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-maintenance-status',
  templateUrl: './maintenance-status.component.html',
  styleUrls: ['./maintenance-status.component.css'],
  providers: [ConfirmationService]

})
export class MaintenanceStatusComponent implements OnInit {


  page = 0;
  size = 5;
  collectionSize: number;
  searchQuery = '';
  codeSearch: string;
  descriptionSearch: string;
  codeList: Array<MaintenanceState> = [];
  cols: any[];
  maintenanceStatusList: Array<MaintenanceState> = [];
  selectedMaintenanceStatus: Array<MaintenanceState> = [];
  showDialog: boolean;
  editMode: number;
  className: string;
  maintenanceStatusExportList: Array<MaintenanceState> = [];
  titleList = 'Liste des états de maintenance';
  subscriptions= new Subscription();

  constructor(private maintenanceStatusService: MaintenanceStateService,
    private spinner: NgxSpinnerService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = MaintenanceState.name;
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'description', header: 'Description', type: 'string' },

    ];

    this.loadData();

  }

  loadData(search: string = '') {
    this.spinner.show();
    this.subscriptions.add(this.maintenanceStatusService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    ));
    this.subscriptions.add(this.maintenanceStatusService.findPagination(this.page, this.size, search).subscribe(
      data => {
        this.maintenanceStatusList = data;

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

  onExportExcel(event) {

    this.subscriptions.add(this.maintenanceStatusService.find(this.searchQuery).subscribe(
      data => {
        this.maintenanceStatusExportList = data;
        if (event != null) {
          this.globalService.generateExcel(event, this.maintenanceStatusExportList, this.className, this.titleList);
        } else {
          this.globalService.generateExcel(this.cols, this.maintenanceStatusExportList, this.className, this.titleList);

        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));


  }
  onExportPdf(event) {
    this.subscriptions.add(this.maintenanceStatusService.find(this.searchQuery).subscribe(
      data => {
        this.maintenanceStatusExportList = data;
        this.globalService.generatePdf(event, this.maintenanceStatusExportList, this.className, this.titleList);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

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
  /// end search
  reset() {
    this.codeSearch = null;
    this.page = 0;
    this.searchQuery = '';
    this.descriptionSearch = '';
    this.loadData(this.searchQuery);
  }

  onCodeSearch(event: any) {
    this.subscriptions.add(this.maintenanceStatusService.find('code~' + event.query).subscribe(
      data => this.codeList = data.map(f => f.code)
    ));
  }

  onObjectEdited(event) {

    this.editMode = event.operationMode;
    this.selectedMaintenanceStatus = event.object;
    if (this.editMode === 3) {
      this.onDeleteAll();
    } else {
      this.showDialog = true;
    }

  }

  onDeleteAll() {

    if (this.selectedMaintenanceStatus.length >= 1) {
      this.confirmationService.confirm({
        message: 'Voulez vous vraiment Supprimer ?',
        accept: () => {
          const ids = this.selectedMaintenanceStatus.map(x => x.id);
          this.subscriptions.add( this.maintenanceStatusService.deleteAllByIds(ids).subscribe(
            data => {
              this.toastr.success('Elément Supprimer avec Succés', 'Suppression');
              this.loadData();
            },
            error => {
              this.toastr.error(error.error.message, 'Erreur');
            },
            () => this.spinner.hide()
          ));
        }
      });
    } else if (this.selectedMaintenanceStatus.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
