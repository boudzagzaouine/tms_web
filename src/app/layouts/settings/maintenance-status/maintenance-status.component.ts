import { EmsBuffer } from './../../../shared/utils/ems-buffer';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { MaintenanceState } from './../../../shared/models/maintenance-state';
import { MaintenanceStateService } from './../../../shared/services/api/maintenance-states.service';
import { Component, OnInit } from '@angular/core';

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
  cols: any[];
  maintenanceStatusList: Array<MaintenanceState> = [];
  selectedMaintenanceStatus: Array<MaintenanceState> = [];
  showDialog: boolean;
  editMode: number;
  className: String;

  constructor(private maintenanceStatusService: MaintenanceStateService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.className = MaintenanceState.name;
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'description', header: 'Description' },

    ];

    this.loadData();

  }

  loadData(search: string = '') {
    this.spinner.show();
    this.maintenanceStatusService.sizeSearch(search).subscribe(
      data => {
        this.collectionSize = data;
      }
    );
    this.maintenanceStatusService.findPagination(this.page, this.size, search).subscribe(
      data => {
        console.log(data);
        this.maintenanceStatusList = data;

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
      buffer.append(`code~${this.codeSearch}`);
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
    this.loadData(this.searchQuery);
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
        message: 'Voulez vous vraiment Suprimer?',
        accept: () => {
          const ids = this.selectedMaintenanceStatus.map(x => x.id);
          this.maintenanceStatusService.deleteAllByIds(ids).subscribe(
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
    } else if (this.selectedMaintenanceStatus.length < 1) {
      this.toastr.warning('aucun ligne sélectionnée');
    }


  }

  onShowDialog(event) {
    this.showDialog = event;
    this.loadData();
  }

}
